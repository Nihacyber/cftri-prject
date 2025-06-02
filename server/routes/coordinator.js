import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
// import { generateExcelReport } from "../utils/excelGenerator.js";
import {
  generateTechTransferReport,
  generateExcelReport,
} from "../utils/excelGenerator.js";
import ActionLog from "../models/ActionLog.js";

import Coordinator from "../models/Coordinator.js";
import bcrypt from "bcrypt";
import TechTransferFlow from "../models/TechTransferFlow.js";

const router = express.Router();

// UPDATED: Allow access for both coordinators and admin users.
const coordinatorOnly = (req, res, next) => {
  if (
    req.user.role !== "coordinator" &&
    req.user.role !== "admin" &&
    req.user.role !== "dean"
  ) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// GET users assigned to the logged-in coordinator (or all users if admin)
router.get("/users", auth, coordinatorOnly, async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find();
    } else if (req.user.role === "dean") {
      if (req.query.coordinatorId) {
        users = await User.find({
          "onboarding.details.coordinator": req.query.coordinatorId,
        });
      } else {
        users = await User.find();
      }
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET stats for dashboard
router.get("/stats", auth, coordinatorOnly, async (req, res) => {
  try {
    let users, leads;
    if (req.user.role === "admin") {
      users = await User.find();
      leads = await Lead.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
      leads = await Lead.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    // Calculate ECF (monthly and yearly)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const paymentLogs = await ActionLog.find({
      coordinator: req.user.id,
      actionType: "Payment Received",
    });

    const monthlyEMF = paymentLogs
      .filter((log) => {
        const d = new Date(log.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, log) => sum + (log.amount || 0), 0);

    const yearlyEMF = paymentLogs
      .filter((log) => new Date(log.date).getFullYear() === currentYear)
      .reduce((sum, log) => sum + (log.amount || 0), 0);

    const monthlyECF = leads
      .filter(
        (lead) =>
          new Date(lead.createdAt).getMonth() === currentMonth &&
          new Date(lead.createdAt).getFullYear() === currentYear
      )
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    const yearlyECF = leads
      .filter((lead) => new Date(lead.createdAt).getFullYear() === currentYear)
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    // Task status counts
    const taskStats = {
      pending: users.filter((u) => u.taskStatus === "Pending").length,
      inProgress: users.filter((u) => u.taskStatus === "In Progress").length,
      completed: users.filter((u) => u.taskStatus === "Completed").length,
    };

    res.json({
      userCount: users.length,
      monthlyECF,
      yearlyECF,
      taskStats,
      monthlyEMF, // ← NEW
      yearlyEMF,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate Excel report
router.get("/report", auth, coordinatorOnly, async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    const reportData = await generateExcelReport(users);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=coordinator-report.xlsx"
    );

    res.send(reportData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ACTION LOG routes
// routes/coordinator.js (or wherever you define action-log)
router.post("/action-log", auth, coordinatorOnly, async (req, res) => {
  try {
    const {
      actionType,
      category,
      details,
      amount,
      transactionId,
      date,
      userId,
    } = req.body;

    // 1) Save the ActionLog document
    const actionLog = new ActionLog({
      coordinator: req.user.id,
      actionType,
      category,
      details,
      transactionId,
      amount,
      date: date || new Date(),
      userId: userId || null,
    });
    await actionLog.save();

    // 2) If it's a tech‐transfer entry, push into the user's onboarding.techTransferLogs
    if (category === "Technology" && userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          "onboarding.techTransferLogs": {
            actionType,
            date: date || new Date(),
            details,
            transactionId,
            amount,
          },
        },
      });
    }

    // 3) Return the new log
    res.status(201).json(actionLog);
  } catch (err) {
    console.error("Error saving action log:", err);
    res.status(500).json({ message: err.message });
  }
});

// router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
//   try {
//     let query = {};
//     // If the user is an admin and has provided a coordinatorId in the query parameters,
//     // use that for filtering. Otherwise, restrict to the logged-in user's ID.
//     if (req.user.role === "admin" && req.query.coordinatorId) {
//       query.coordinator = req.query.coordinatorId;
//     } else {
//       query.coordinator = req.user.id;
//     }

//     const logs = await ActionLog.find(query).sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// UPDATE task status for a user assigned to the logged-in coordinator

router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "admin" && req.query.coordinatorId) {
      query.coordinator = req.query.coordinatorId;
    } else {
      query.coordinator = req.user.id;
    }

    const logs = await ActionLog.find(query)
      .populate("userId", "name email contact") // Add this line to populate user data
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:userId/status", auth, coordinatorOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId, "onboarding.details.coordinator": req.user.id },
      { taskStatus: status },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not assigned to you" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:userId", auth, coordinatorOnly, async (req, res) => {
  try {
    const { name, email, assignedTask } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.userId,
        "onboarding.details.coordinator": req.user.id, // ensure that the user is assigned to the coordinator
      },
      { name, email, assignedTask },
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or not assigned to you" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ASSIGN task to a user
router.put(
  "/users/:userId/assign-task",
  auth,
  coordinatorOnly,
  async (req, res) => {
    try {
      const { task, startDate, endDate } = req.body;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // zero out the time on both
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        return res
          .status(400)
          .json({ message: "Start date cannot be in the past (by day)" });
      }
      if (end < start) {
        return res
          .status(400)
          .json({ message: "End date must be on or after the start date" });
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
          "onboarding.details.coordinator": req.user.id,
        },
        {
          assignedTask: task,
          taskStartDate: startDate,
          taskEndDate: endDate,
          taskStatus: "Pending",
        },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found or not assigned to you" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/analytics", auth, coordinatorOnly, async (req, res) => {
  try {
    let users, leads;
    if (req.user.role === "admin") {
      users = await User.find();
      leads = await Lead.find();
    } else {
      users = await User.find({
        "onboarding.details.coordinator": req.user.id,
      });
      leads = await Lead.find({
        "onboarding.details.coordinator": req.user.id,
      });
    }

    // Calculate ECF (monthly and yearly)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyECF = leads
      .filter(
        (lead) =>
          new Date(lead.createdAt).getMonth() === currentMonth &&
          new Date(lead.createdAt).getFullYear() === currentYear
      )
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    const yearlyECF = leads
      .filter((lead) => new Date(lead.createdAt).getFullYear() === currentYear)
      .reduce((sum, lead) => sum + (lead.onboarding.details.leadValue || 0), 0);

    // Task status counts
    const taskStats = {
      pending: users.filter((u) => u.taskStatus === "Pending").length,
      inProgress: users.filter((u) => u.taskStatus === "In Progress").length,
      completed: users.filter((u) => u.taskStatus === "Completed").length,
    };

    // Technology details aggregation
    const techDetails = {};
    let totalAmounts = 0;

    users.forEach((user) => {
      const techs = (user.onboarding && user.onboarding.technologies) || [];
      const projectSubject =
        user.onboarding && user.onboarding.details
          ? user.onboarding.details.subject
          : null;
      techs.forEach((tech) => {
        if (tech.item) {
          if (!techDetails[tech.item]) {
            techDetails[tech.item] = {
              count: 0,
              totalAmount: 0,
              projects: new Set(),
            };
          }
          techDetails[tech.item].count += 1;
          techDetails[tech.item].totalAmount += tech.amount || 0;
          totalAmounts += tech.amount || 0;
          if (projectSubject) {
            techDetails[tech.item].projects.add(projectSubject);
          }
        }
      });
    });

    Object.keys(techDetails).forEach((key) => {
      techDetails[key].projects = Array.from(techDetails[key].projects);
    });

    // Total payment received from leads (using leadValue)
    const totalPaymentReceived = leads.reduce(
      (sum, lead) => sum + (lead.onboarding?.details?.leadValue || 0),
      0
    );

    res.json({
      taskStats,
      techDetails,
      totalAmounts,
      totalPaymentReceived,
      monthlyECF,
      yearlyECF,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /coordinator/coordinators
// — list every coordinator (for Dean dashboard)
router.get("/coordinators", auth, coordinatorOnly, async (req, res) => {
  try {
    // only a Dean or Admin should hit this
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const all = await Coordinator.find().select("-password");
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /coordinator/coordinators
// — create a new coordinator (Dean only)
router.post("/coordinators", auth, coordinatorOnly, async (req, res) => {
  try {
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const { name, email, contact, password } = req.body;
    const exists = await Coordinator.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Coordinator already exists" });

    const hash = await bcrypt.hash(password, 10);
    const coord = new Coordinator({ name, email, contact, password: hash });
    await coord.save();
    res.status(201).json({ ...coord.toObject(), password: undefined });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /coordinator/coordinators/:id
// — delete a coordinator (Dean only)
router.delete("/coordinators/:id", auth, coordinatorOnly, async (req, res) => {
  try {
    if (req.user.role === "coordinator")
      return res.status(403).json({ message: "Access denied" });

    const deleted = await Coordinator.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/action-log", auth, coordinatorOnly, async (req, res) => {
  try {
    const {
      actionType,
      category,
      details,
      amount,
      transactionId,
      date,
      userId,
    } = req.body;

    const actionLog = new ActionLog({
      coordinator: req.user.id,
      actionType,
      category,
      details,
      transactionId,
      amount,
      date: date || new Date(),
      userId: userId || null, // Add user reference
    });

    await actionLog.save();

    // If this is a tech transfer action, update the user's tech transfer status
    if (category === "Technology" && userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          techTransferLogs: {
            actionType,
            date: date || new Date(),
            details,
            transactionId,
            amount,
          },
        },
      });
    }

    res.status(201).json(actionLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/action-logs", auth, coordinatorOnly, async (req, res) => {
  const logs = await ActionLog.find(query)
    .populate("userId", "name email") // ← this gives you log.userId.name
    .sort({ createdAt: -1 });
  res.json(logs);
});

export default router;
