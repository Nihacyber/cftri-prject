import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const technologySchema = new mongoose.Schema({
  category: String,
  subcategory: String,
});

const Technology = mongoose.models.Technology || mongoose.model("Technology", technologySchema);

router.get("/", async (req, res) => {
  const techs = await Technology.find();
  res.json(techs);
});

router.post("/", async (req, res) => {
  const { category, subcategory } = req.body;
  if (!category || !subcategory) {
    return res.status(400).json({ error: "Category and subcategory required" });
  }
  const tech = new Technology({ category, subcategory });
  await tech.save();
  res.status(201).json(tech);
});

router.delete("/:id", async (req, res) => {
  await Technology.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;