import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CreateLead from "./CreateLead";
import AdminSettings from "./AdminSettings";
import {
  Users,
  BarChart2,
  Bookmark,
  Settings,
  Plus,
  User,
  DollarSign,
  Clipboard,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  ArrowRight,
  AlertCircle,
  Contact,
  Cpu,
  Loader2,
  RefreshCw,
  Tag,
  MapPin,
  Building,
  ShieldCheck,
  Globe,
  Menu as MenuIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Memoized chart components to prevent unnecessary re-renders
const MemoizedBarChart = React.memo(({ data, options }) => (
  <Bar data={data} options={options} />
));
const MemoizedLineChart = React.memo(({ data, options }) => (
  <Line data={data} options={options} />
));

const sidebarItems = [
  { id: 1, label: "Client Details", icon: Users },
  { id: 2, label: "Technologies", icon: Cpu },
  { id: 3, label: "Leads", icon: Bookmark },
  { id: 4, label: "Settings", icon: Settings },
  { id: 5, label: "Staff Analytics", icon: BarChart2 },
  { id: 7, label: "Staff", icon: Users },
  { id: 8, label: "Processed Clients", icon: Check },
  { id: 9, label: "Flows By TT Staff", icon: Clipboard },
];

const HEADER_HEIGHT = 210; // Adjust if your main header is a different height

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [users, setUsers] = useState([]);
  const [techFlows, setTechFlows] = useState([]);
  const [isLoadingTechFlows, setIsLoadingTechFlows] = useState(false);
  const [userLogs, setUserLogs] = useState({});
  const [loadingUserLogs, setLoadingUserLogs] = useState({});

  const [allFlows, setAllFlows] = useState([]);
  const [loadingAllFlows, setLoadingAllFlows] = useState(false);

  const [deans, setDeans] = useState([]);
  const [allCoordinators, setAllCoordinators] = useState([]);

  const [chartData, setChartData] = useState({
    dailyLogins: null,
    monthlyLogins: null,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [processedUsers, setProcessedUsers] = useState([]);
  const [loadingProcessed, setLoadingProcessed] = useState(false);

  const [assignForm, setAssignForm] = useState({
    show: false,
    userId: "",
    coordinatorId: "",
    task: "",
  });
  const [coordinators, setCoordinators] = useState([]);
  const [leads, setLeads] = useState([]);
  const [showCreateLeadForm, setShowCreateLeadForm] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [expandedLeads, setExpandedLeads] = useState({});
  const [showDeanModal, setShowDeanModal] = useState(false);
  const [userToAssign, setUserToAssign] = useState(null);
  const [selectedDeanId, setSelectedDeanId] = useState("");

  const [coordinatorAnalytics, setCoordinatorAnalytics] = useState(null);
  const [coordinatorAnalyticsLoaded, setCoordinatorAnalyticsLoaded] = useState(
    false
  );
  const [isCoordinatorAnalyticsRefreshing, setIsCoordinatorAnalyticsRefreshing] =
    useState(false);

  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [actionLogs, setActionLogs] = useState([]);
  const [isActionLogsLoading, setIsActionLogsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sidebarHovered, setSidebarHovered] = useState(false);

  const [technologies, setTechnologies] = useState([
    // Example initial data
    { category: "Bakery Products", subcategory: "Bread" },
    { category: "Beverage Products", subcategory: "Juice" },
  ]);
  const [newTech, setNewTech] = useState({
    category: "",
    subcategory: "",
  });

  // Toggle expansion for user details
  const toggleUserExpansion = (userId) => {
    const willExpand = !expandedUsers[userId];
    setExpandedUsers((prev) => ({ ...prev, [userId]: willExpand }));
    if (willExpand) fetchUserLogs(userId);
  };

  // Toggle expansion for lead details
  const toggleLeadExpansion = (leadId) => {
    setExpandedLeads((prev) => ({
      ...prev,
      [leadId]: !prev[leadId],
    }));
  };

  // Fetch users for User Details tab
  useEffect(() => {
    if (activeTab === 1) {
      const fetchUsers = async () => {
        try {
          const res = await axios.get("http://localhost:5000/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUsers();
    }
  }, [activeTab, token]);

  // Define fetchChartData for Analytics (existing)
  const fetchChartData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/chart-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ...chart data logic...
    } catch (err) {
      // ...
    }
  }, [token]);

  const fetchUserLogs = useCallback(
    async (userId) => {
      if (loadingUserLogs[userId] || userLogs[userId]) return;
      setLoadingUserLogs((l) => ({ ...l, [userId]: true }));
      try {
        const { data } = await axios.get(
          `http://localhost:5000/admin/users/${userId}/action-logs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserLogs((prev) => ({ ...prev, [userId]: data }));
      } catch (err) {
        console.error("fetchUserLogs error:", err);
      } finally {
        setLoadingUserLogs((l) => ({ ...l, [userId]: false }));
      }
    },
    [token, loadingUserLogs, userLogs]
  );

  const fetchCoordinatorAnalytics = useCallback(async () => {
    if (!selectedCoordinator) return;
    try {
      setIsCoordinatorAnalyticsRefreshing(true);
      const res = await axios.get(
        `http://localhost:5000/coordinator/analytics?coordinatorId=${selectedCoordinator}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCoordinatorAnalytics(res.data);
      setCoordinatorAnalyticsLoaded(true);
    } catch (err) {
      console.error("Error fetching coordinator analytics:", err);
    } finally {
      setIsCoordinatorAnalyticsRefreshing(false);
    }
  }, [token, selectedCoordinator]);

  const fetchActionLogs = useCallback(async () => {
    if (!selectedCoordinator) return;
    try {
      setIsActionLogsLoading(true);
      const res = await axios.get(
        `http://localhost:5000/coordinator/action-logs?coordinatorId=${selectedCoordinator}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActionLogs(res.data);
    } catch (err) {
      console.error("Error fetching action logs:", err);
    } finally {
      setIsActionLogsLoading(false);
    }
  }, [token, selectedCoordinator]);

  // Automatically fetch coordinator analytics and action logs when tab 5 is active and a coordinator is selected
  useEffect(() => {
    if (activeTab === 5 && selectedCoordinator) {
      fetchCoordinatorAnalytics();
      fetchActionLogs();
    }
  }, [activeTab, selectedCoordinator, fetchCoordinatorAnalytics, fetchActionLogs]);

  useEffect(() => {
    if (activeTab === 6 && selectedCoordinator) {
      const fetchTechFlows = async () => {
        setIsLoadingTechFlows(true);
        try {
          const res = await axios.get(
            "http://localhost:5000/coordinator/tech-transfer-flow",
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { coordinatorId: selectedCoordinator },
            }
          );
          setTechFlows(res.data);
        } catch (err) {
          console.error("Error loading tech flow:", err);
        } finally {
          setIsLoadingTechFlows(false);
        }
      };
      fetchTechFlows();
    }
  }, [activeTab, selectedCoordinator, token]);

  useEffect(() => {
    if (activeTab === 7) {
      axios
        .get("http://localhost:5000/admin/deans", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setDeans(res.data))
        .catch(console.error);

      axios
        .get("http://localhost:5000/admin/coordinators", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAllCoordinators(res.data))
        .catch(console.error);
    }
  }, [activeTab, token]);

  const fetchProcessedUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/users/processed",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProcessedUsers(res.data);
    } catch (err) {
      console.error("Failed to reload processed users:", err);
      toast.error("Could not reload processed users");
    }
  };

  useEffect(() => {
    if (activeTab === 8) {
      setLoadingProcessed(true);
      axios
        .get("http://localhost:5000/admin/deans", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setDeans(res.data))
        .catch((err) => {
          console.error("Could not load deans", err);
          toast.error("Failed to load Deans");
        });

      axios
        .get("http://localhost:5000/admin/users/processed", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProcessedUsers(res.data))
        .catch((err) => {
          console.error("Could not load processed users", err);
          toast.error("Failed to load processed users");
        })
        .finally(() => setLoadingProcessed(false));
    }
  }, [activeTab, token]);

  useEffect(() => {
    if (activeTab === 9) {
      setLoadingAllFlows(true);
      axios
        .get("http://localhost:5000/coordinator/tech-transfer-flow", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAllFlows(res.data))
        .catch((err) =>
          console.error("Error loading all tech-transfer flows:", err)
        )
        .finally(() => setLoadingAllFlows(false));
    }
  }, [activeTab, token]);

  useEffect(() => {
    if (activeTab === 5 || !coordinatorAnalyticsLoaded) {
      fetchCoordinatorAnalytics();
    }
  }, [activeTab, coordinatorAnalyticsLoaded, fetchCoordinatorAnalytics]);

  // Fetch coordinators for assignment functionality
  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/admin/coordinators",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCoordinators(res.data);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
      }
    };
    fetchCoordinators();
  }, [token]);

  // Fetch leads for Leads tab
  useEffect(() => {
    if (activeTab === 3) {
      const fetchLeads = async () => {
        try {
          const res = await axios.get("http://localhost:5000/lead/all");
          setLeads(res.data);
        } catch (err) {
          console.error("Error fetching leads:", err);
        }
      };
      fetchLeads();
    }
  }, [activeTab]);

  // Assignment functions
  const openAssignForm = (userId) => {
    setAssignForm({ show: true, userId, coordinatorId: "", task: "" });
  };

  const handleAssignChange = (e) => {
    const { name, value } = e.target;
    setAssignForm((f) => ({ ...f, [name]: value }));
  };

  const submitAssignForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/admin/users/${assignForm.userId}/assign`,
        { coordinatorId: assignForm.coordinatorId, task: assignForm.task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Coordinator assigned successfully");
      setAssignForm({ show: false, userId: "", coordinatorId: "", task: "" });
      const res = await axios.get("http://localhost:5000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to assign coordinator");
    }
  };

  // Memoized chart options
  const barChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => "$" + value,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => "$" + context.raw?.toLocaleString(),
          },
        },
      },
    }),
    []
  );

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Add this function in AdminDashboard.jsx
  const handleAddTechnology = async (e) => {
    e.preventDefault();
    if (!newTech.category || !newTech.subcategory) return;
    await axios.post("http://localhost:5000/technologies", newTech);
    setNewTech({ category: "", subcategory: "" });
    // Optionally, refetch technologies here if you want instant update
  };

  // Fetch technologies from backend
  const fetchTechnologies = async () => {
    const res = await axios.get("http://localhost:5000/technologies");
    setTechnologies(res.data);
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  // Sidebar + Main Content Layout
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar (static, always visible on the left, starts at the very top) */}
            <aside
    className="group hover:w-64 w-16 transition-all duration-300 overflow-hidden bg-white bg-opacity-90 shadow-lg flex flex-col z-50 ml-4"
    style={{
      borderRight: "1px solid #e5e7eb",
      background: "linear-gradient(135deg, #e3e8ff 0%, rgb(220, 226, 245) 100%)",
    }}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b">
      <div className="transition-all duration-300 group-hover:opacity-100 opacity-0">
        <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight mb-0">
          Admin
        </h1>
        <p className="text-xs text-blue-800 font-medium">Dashboard</p>
      </div>
    </div>

    {/* Navigation Items */}
    <nav className="p-2 space-y-1">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveTab(item.id);
            setShowCreateLeadForm && setShowCreateLeadForm(false);
          }}
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-all text-left group font-semibold ${
            activeTab === item.id
              ? "bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow"
              : "text-blue-900 hover:bg-blue-200"
          }`}
        >
          <item.icon
            className={`h-5 w-5 ${
              activeTab === item.id ? "text-white" : "text-blue-900"
            }`}
          />
          <span className="ml-3 transition-all duration-300 group-hover:inline-block hidden font-medium">
            {item.label}
          </span>
        </button>
      ))}
    </nav>

    {/* Logout Button */}
    <div className="p-2 border-t">
      <button
        onClick={handleLogout}
        className="flex items-center justify-start w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-900 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900 transition-all shadow"
      >
        <MenuIcon className="h-5 w-5" />
        <span className="ml-2 group-hover:inline-block hidden font-semibold">
          Logout
        </span>
      </button>
    </div>
  </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto" >
        <div className="max-w-7xl mx-auto">
          <ToastContainer position="top-center" autoClose={3000} />
          {/* Header */}
          <div className="text-center mb-8 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage Clients, leads, view analytics and more
            </p>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* User Details Tab */}
            {activeTab === 1 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    Client Management
                  </h2>
                  <div className="text-sm text-gray-500">
                    {users.length} clients found
                  </div>
                </div>

                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No Clients found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div
                          className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleUserExpansion(user._id)}
                        >
                          <div className="flex items-center">
                            <User className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {user.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div>
                            {expandedUsers[user._id] ? (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                        {expandedUsers[user._id] && (
                          <div className="p-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-start">
                                <Clipboard className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Assigned Task
                                  </p>
                                  <p className="text-gray-800">
                                    {user.assignedTask || "None assigned"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <BookOpen className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Subject
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.subject || "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <Calendar className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Close Date
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.expectedCloseDate
                                      ? new Date(
                                          user.onboarding.details.expectedCloseDate
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Type */}
                              <div className="flex items-start">
                                <Settings className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Type
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.type || "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Specific Option */}

                              {/* State */}
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    State
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.state || "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Place */}
                              <div className="flex items-start">
                                <Building className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Place
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.place || "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Address
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.address || "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Gender */}
                              <div className="flex items-start">
                                <User className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Gender
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.gender || "N/A"}
                                  </p>
                                </div>
                              </div>

                              {/* Country */}
                              <div className="flex items-start">
                                <Globe className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Country
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.country || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                                  New Technologies Info
                                </h4>
                                {user.onboarding?.technologies?.length > 0 ? (
                                  <ul className="list-disc list-inside text-gray-800">
                                    {user.onboarding.technologies.map(
                                      (tech, idx) => (
                                        <li key={idx}>
                                          <span className="font-semibold">
                                            {tech.category}
                                          </span>
                                          : {tech.item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500">
                                    No technologies added.
                                  </p>
                                )}
                              </div>

                              {/* Category */}
                              <div className="flex items-start">
                                <Tag className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Category
                                  </p>
                                  <p className="text-gray-800">
                                    {user.onboarding?.details?.category || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                                  collaborativeOptions
                                </h4>
                                {user.onboarding.details.collaborativeOptions
                                  ?.length > 0 ? (
                                  <ul className="list-disc list-inside text-gray-800 mb-2">
                                    {user.onboarding.details.collaborativeOptions.map(
                                      (opt) => (
                                        <li key={opt}>{opt}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500 mb-2">
                                    None selected
                                  </p>
                                )}
                                {user.onboarding.details.collaborativeOther && (
                                  <p className="text-gray-600">
                                    <span className="font-semibold">Other:</span>{" "}
                                    {user.onboarding.details.collaborativeOther}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Assigned Coordinator Display */}
                            {/* {user.onboarding?.details?.coordinator && (
                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700">
                                  Assigned Coordinator:
                                </p>
                                <p className="text-gray-800">
                                {
                                  coordinators.find(
                                    (c) => String(c._id) === String(user.onboarding.details.coordinator)
                                  )?.name || "Coordinator Assigned"
                                }
                                </p>
                              </div>
                            )} */}

                            {user.onboarding?.details?.coordinator && (
                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700">
                                  Assigned staff:
                                </p>
                                <p className="text-gray-800">
                                  {typeof user.onboarding.details.coordinator ===
                                  "object"
                                    ? user.onboarding.details.coordinator
                                        .name /* populated object */
                                    : coordinators.find(
                                        (c) =>
                                          c._id.toString() ===
                                          user.onboarding.details.coordinator.toString()
                                      )?.name || "Coordinator Assigned"}
                                </p>
                              </div>
                            )}

                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Action Logs
                              </h4>

                              {loadingUserLogs[user._id] ? (
                                <p className="text-sm text-gray-400">Loading…</p>
                              ) : userLogs[user._id] ? (
                                userLogs[user._id].length > 0 ? (
                                  <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {userLogs[user._id].map((log) => (
                                      <div
                                        key={log._id}
                                        className="border rounded p-2 bg-gray-50"
                                      >
                                        <div className="flex justify-between items-baseline">
                                          <span className="font-medium">
                                            {log.actionType}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            {new Date(
                                              log.date
                                            ).toLocaleDateString()}
                                          </span>
                                        </div>
                                        {log.details && (
                                          <p className="text-sm text-gray-700 mt-1">
                                            {log.details}
                                          </p>
                                        )}
                                        {log.transactionId && (
                                          <p className="text-xs text-gray-600 mt-1">
                                            Txn: {log.transactionId}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No actions logged for this user.
                                  </p>
                                )
                              ) : (
                                <p className="text-sm text-gray-500">
                                  (Click the header to load action logs.)
                                </p>
                              )}
                            </div>

                            <div className="mt-4">
                              {user.onboarding?.details?.coordinator ? (
                                <button
                                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed flex items-center"
                                  disabled
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  staff Assigned
                                </button>
                              ) : !assignForm.show ||
                                assignForm.userId !== user._id ? (
                                <button
                                  onClick={() => openAssignForm(user._id)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Assign Staff
                                </button>
                              ) : (
                                <form
                                  onSubmit={submitAssignForm}
                                  className="bg-gray-50 p-4 rounded-lg"
                                >
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Staff
                                    </label>
                                    <select
                                      name="coordinatorId"
                                      value={assignForm.coordinatorId}
                                      onChange={handleAssignChange}
                                      className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                      required
                                    >
                                      <option value="">
                                        Select a staff
                                      </option>
                                      {coordinators.map((coord) => (
                                        <option key={coord._id} value={coord._id}>
                                          {coord.name} ({coord.email})
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Task Description
                                    </label>
                                    <input
                                      type="text"
                                      name="task"
                                      value={assignForm.task}
                                      onChange={handleAssignChange}
                                      className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                      required
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setAssignForm({
                                          show: false,
                                          userId: "",
                                          coordinatorId: "",
                                          task: "",
                                        })
                                      }
                                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Assign
                                    </button>
                                  </div>
                                </form>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Leads Tab */}
            {activeTab === 3 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Bookmark className="h-6 w-6 mr-2 text-blue-600" />
                    Leads Management
                  </h2>
                  <button
                    onClick={() => window.open("/create-lead", "_blank")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Lead
                  </button>
                </div>
                {showCreateLeadForm && (
                  <div className="mb-6">
                    <CreateLead />
                  </div>
                )}
                {leads.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No leads found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div
                        key={lead._id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div
                          className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleLeadExpansion(lead._id)}
                        >
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {lead.onboarding?.details?.subject ||
                                "Untitled Lead"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {lead.onboarding?.details?.type || "No type"}
                            </p>
                          </div>
                          {expandedLeads[lead._id] ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        {expandedLeads[lead._id] && (
                          <div className="p-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-start">
                                <BookOpen className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Discussion Matter
                                  </p>
                                  <p className="text-gray-800">
                                    {lead.onboarding?.details?.discussionMatter ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <Calendar className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Close Date
                                  </p>
                                  <p className="text-gray-800">
                                    {lead.onboarding?.details?.expectedCloseDate
                                      ? new Date(
                                          lead.onboarding.details.expectedCloseDate
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <DollarSign className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Lead Value
                                  </p>
                                  <p className="text-gray-800">
                                    {lead.onboarding?.details?.leadValue !==
                                    undefined
                                      ? `$${lead.onboarding.details.leadValue}`
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {lead.onboarding?.contactPersons?.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                  <Contact className="h-5 w-5 mr-2 text-blue-600" />
                                  Contact Persons
                                </h4>
                                <div className="space-y-3 pl-7">
                                  {lead.onboarding.contactPersons.map(
                                    (contact, idx) => (
                                      <div
                                        key={idx}
                                        className="border-l-2 border-blue-200 pl-4"
                                      >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">
                                              Name
                                            </p>
                                            <p className="text-gray-800">
                                              {contact.name}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">
                                              Email
                                            </p>
                                            <p className="text-gray-800">
                                              {contact.emailDetail}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">
                                              Mobile
                                            </p>
                                            <p className="text-gray-800">
                                              {contact.mobileDetail}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">
                                              Organization
                                            </p>
                                            <p className="text-gray-800">
                                              {contact.organization}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                            {lead.onboarding?.technologies?.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                  <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                                  Technologies
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Category
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Selected Technology
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {lead.onboarding.technologies.map(
                                        (tech, idx) => {
                                          let category = "";
                                          if (idx === 0) category = "Broad Area";
                                          else if (idx === 1)
                                            category = "Commodity";
                                          else if (idx === 2)
                                            category = "Keyword";
                                          return (
                                            <tr key={idx}>
                                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                                {category}
                                              </td>
                                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                                {tech.item || "Not selected"}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                      </tbody>
                                    </table>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 4 && <AdminSettings />}

            {/* Staff Analytics Tab */}
            {activeTab === 5 && (
              <div className="space-y-8">
                {/* Coordinator Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Select Staff
                  </label>
                  <select
                    value={selectedCoordinator}
                    onChange={(e) => setSelectedCoordinator(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  >
                    <option value="">Select a Staff</option>
                    {coordinators.map((coord) => (
                      <option key={coord._id} value={coord._id}>
                        {coord.name} ({coord.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <BarChart2 className="h-6 w-6 mr-2 text-blue-600" />
                    Staff Performance Analytics
                  </h2>
                  <button
                    onClick={() => {
                      setIsCoordinatorAnalyticsRefreshing(true);
                      fetchCoordinatorAnalytics();
                      fetchActionLogs();
                    }}
                    disabled={
                      isCoordinatorAnalyticsRefreshing || isActionLogsLoading
                    }
                    className={`flex items-center px-3 py-1 rounded-lg text-sm ${
                      isCoordinatorAnalyticsRefreshing || isActionLogsLoading
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    } transition-colors`}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-1 ${
                        isCoordinatorAnalyticsRefreshing || isActionLogsLoading
                          ? "animate-spin"
                          : ""
                      }`}
                    />
                    {isCoordinatorAnalyticsRefreshing || isActionLogsLoading
                      ? "Refreshing..."
                      : "Refresh Data"}
                  </button>
                </div>

                {/* Analytics Display */}
                {coordinatorAnalytics ? (
                  <div>
                    {/* Task Status Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-100 p-4 rounded-lg border">
                        <p className="text-sm text-blue-600">Pending Tasks</p>
                        <h3 className="text-2xl font-bold text-blue-800">
                          {coordinatorAnalytics.taskStats.pending}
                        </h3>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-lg border">
                        <p className="text-sm text-yellow-600">In Progress</p>
                        <h3 className="text-2xl font-bold text-yellow-800">
                          {coordinatorAnalytics.taskStats.inProgress}
                        </h3>
                      </div>
                      <div className="bg-green-100 p-4 rounded-lg border">
                        <p className="text-sm text-green-600">Completed Tasks</p>
                        <h3 className="text-2xl font-bold text-green-800">
                          {coordinatorAnalytics.taskStats.completed}
                        </h3>
                      </div>
                    </div>

                    {/* ECF Charts Section */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        ECF (Expected Cash Flow) Tracking
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Monthly ECF Chart */}
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h4 className="font-medium text-gray-700 mb-3">
                            Monthly ECF: INR{" "}
                            {coordinatorAnalytics.monthlyECF || 0}
                          </h4>
                          <div className="h-64">
                            <MemoizedBarChart
                              data={{
                                labels: ["Current Month"],
                                datasets: [
                                  {
                                    label: "Monthly ECF",
                                    data: [coordinatorAnalytics.monthlyECF || 0],
                                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                  },
                                ],
                              }}
                              options={{
                                ...barChartOptions,
                                plugins: {
                                  ...barChartOptions.plugins,
                                  title: {
                                    display: true,
                                    text: "Monthly ECF Generation",
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>

                        {/* Yearly ECF Chart */}
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h4 className="font-medium text-gray-700 mb-3">
                            Yearly ECF: INR {coordinatorAnalytics.yearlyECF || 0}
                          </h4>
                          <div className="h-64">
                            <MemoizedBarChart
                              data={{
                                labels: ["Current Year"],
                                datasets: [
                                  {
                                    label: "Yearly ECF",
                                    data: [coordinatorAnalytics.yearlyECF || 0],
                                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                                    borderColor: "rgba(75, 192, 192, 1)",
                                    borderWidth: 1,
                                  },
                                ],
                              }}
                              options={{
                                ...barChartOptions,
                                plugins: {
                                  ...barChartOptions.plugins,
                                  title: {
                                    display: true,
                                    text: "Yearly ECF Generation",
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-indigo-100 p-4 rounded-lg border">
                        <p className="text-sm text-indigo-600">Total Amounts</p>
                        <h3 className="text-2xl font-bold text-indigo-800">
                          INR {coordinatorAnalytics.totalAmounts || 0}
                        </h3>
                      </div>
                      <div className="bg-purple-100 p-4 rounded-lg border">
                        <p className="text-sm text-purple-600">
                          Payment Received
                        </p>
                        <h3 className="text-2xl font-bold text-purple-800">
                          INR {coordinatorAnalytics.totalPaymentReceived || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                    <p className="text-gray-500 mt-2">
                      Loading Staff analytics...
                    </p>
                  </div>
                )}

                {/* Action Logs Display */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Action Logs
                  </h3>
                  {isActionLogsLoading ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                      <p className="text-gray-500 mt-2">Loading action logs...</p>
                    </div>
                  ) : actionLogs.length > 0 ? (
                    <div className="space-y-4">
                      {actionLogs.map((log) => (
                        <div key={log._id} className="border p-4 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              {/* User info first */}
                              {log.userId && (
                                <div className="mb-1">
                                  <span className="font-semibold text-blue-700">
                                    {log.userId.name}
                                  </span>
                                  {log.userId.contact && (
                                    <span className="text-sm text-gray-700 ml-2">
                                      {log.userId.contact}
                                    </span>
                                  )}
                                  {log.userId.email && (
                                    <span className="text-sm text-gray-500 ml-2">
                                      {log.userId.email}
                                    </span>
                                  )}
                                </div>
                              )}
                              {/* Action info */}
                              <span className="font-medium">
                                {log.actionType}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                ({log.category})
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(log.date).toLocaleDateString()}
                            </div>
                          </div>
                          {log.details && (
                            <p className="mt-1 text-sm text-gray-700">
                              {log.details}
                            </p>
                          )}
                          {log.transactionId && (
                            <p className="mt-1 text-sm">
                              <span className="font-medium">Transaction ID:</span>{" "}
                              {log.transactionId}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No action logs found for this staff.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 6 && (
              <div className="space-y-6">
                {/* Coordinator selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Select Staff
                  </label>
                  <select
                    value={selectedCoordinator}
                    onChange={(e) => setSelectedCoordinator(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  >
                    <option value="">-- pick one --</option>
                    {coordinators.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Header & Action Buttons */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Technology Transfer Process Flow
                  </h2>
                  <div className="space-x-2">
                    {/* Download & Print buttons unchanged... */}
                  </div>
                </div>

                {/* Flow Cards */}
                {isLoadingTechFlows ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading flows…</p>
                  </div>
                ) : techFlows.length > 0 ? (
                  techFlows.map((flow) => (
                    <div
                      key={flow._id}
                      className="border rounded-lg mb-6 overflow-hidden"
                    >
                      {/* Coordinator Info & Actions */}
                      <div className="p-4 bg-gray-50 flex justify-between items-center">
                        {/* <div>
                          <h3 className="font-semibold text-gray-800">
                            {flow.dean?.name || "—"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {flow.dean?.email || "—"}
                          </p>
                        </div> */}
                      </div>

                      {/* Steps Table */}
                      <div className="p-4">
                        {flow.steps?.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Step
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Date
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Details
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {flow.steps.map((s, i) => (
                                  <tr key={i}>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {s.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {new Date(s.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {s.details || "—"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-600">No steps recorded.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No process flows found.</p>
                )}
              </div>
            )}

            {activeTab === 7 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <ShieldCheck className="h-6 w-6 mr-2 text-purple-600" />
                  Staff Management
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                          Contact
                        </th>
                        {/* Removed Assign TT Coordinator column */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allCoordinators.map((coord) => (
                        <tr key={coord._id}>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {coord.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {coord.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {coord.contact}
                          </td>
                          {/* Removed Assign TT Coordinator cell */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 8 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Check className="h-6 w-6 mr-2 text-green-600" />
                  Completed Processes
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                          Contact
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                          Staff
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {loadingProcessed ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8">
                            <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                            <p className="text-gray-500 mt-2">Loading…</p>
                          </td>
                        </tr>
                      ) : processedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            No completed processes.
                          </td>
                        </tr>
                      ) : (
                        processedUsers.map((u) => (
                          <tr key={u._id} className="hover:bg-green-50 transition">
                            <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                              {u.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">
                              {u.email || "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">
                              {u.contact || "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">
                              {u.onboarding.details.coordinator
                                ? u.onboarding.details.coordinator.name
                                : "—"}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                className={`bg-purple-600 text-white px-3 py-1 rounded ${
                                  isButtonDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-purple-700"
                                }`}
                                disabled={isButtonDisabled}
                                onClick={() => {
                                  setUserToAssign(u);
                                  setShowDeanModal(true);
                                }}
                              >
                                Assign TT Coordinator
                              </button>

                              {showDeanModal && userToAssign && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                  <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4">
                                      Assign to TT Coordinator
                                    </h2>
                                    <select
                                      value={selectedDeanId}
                                      onChange={(e) => setSelectedDeanId(e.target.value)}
                                      className="w-full p-2 border rounded-lg mb-4"
                                    >
                                      <option value="">— pick a TT Coordinator —</option>
                                      {deans.map((d) => (
                                        <option key={d._id} value={d._id}>
                                          {d.name} ({d.email})
                                        </option>
                                      ))}
                                    </select>
                                    <div className="flex justify-end space-x-2">
                                      <button
                                        onClick={() => setShowDeanModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={async () => {
                                          await axios.put(
                                            `http://localhost:5000/admin/users/${userToAssign._id}/assign-dean`,
                                            { deanId: selectedDeanId },
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          );
                                          toast.success("User assigned to Dean");
                                          setShowDeanModal(false);
                                          await fetchProcessedUsers();
                                        }}
                                        disabled={!selectedDeanId}
                                        className={`px-4 py-2 rounded text-white ${
                                          selectedDeanId
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                      >
                                        Assign
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 9 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Flows By TT Coordinator{" "}
                </h2>

                {loadingAllFlows ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading flows…</p>
                  </div>
                ) : allFlows.length > 0 ? (
                  allFlows.map((flow) => (
                    <div
                      key={flow._id}
                      className="border rounded-lg mb-6 overflow-hidden"
                    >
                      {/* Coordinator Info & Actions */}
                      <div className="p-4 bg-gray-50 flex justify-between items-center">
                        {/* <div>
                          <h3 className="font-semibold text-gray-800">
                            {flow.dean?.name || "—"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {flow.dean?.email || "—"}
                          </p>
                        </div> */}
                      </div>

                      {/* Steps Table */}
                      <div className="p-4">
                        {flow.steps?.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Step
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Date
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                                    Details
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {flow.steps.map((s, i) => (
                                  <tr key={i}>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {s.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {new Date(s.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                      {s.details || "—"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-600">No steps recorded.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No process flows found.</p>
                )}
              </div>
            )}

            {/* Manage Technologies Tab */}
            {activeTab === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Cpu className="h-6 w-6 mr-2 text-blue-600" />
                  Manage Technologies
                </h2>
                {/* Add Technology Form */}
                <form
                  className="mb-6 flex flex-col md:flex-row gap-4"
                  onSubmit={handleAddTechnology}
                >
                  <input
                    className="border rounded p-2 flex-1"
                    placeholder="Category (e.g. Bakery Products)"
                    value={newTech.category}
                    onChange={e => setNewTech(t => ({ ...t, category: e.target.value }))}
                    required
                  />
                  <input
                    className="border rounded p-2 flex-1"
                    placeholder="Subcategory (e.g. Bread, Cake)"
                    value={newTech.subcategory}
                    onChange={e => setNewTech(t => ({ ...t, subcategory: e.target.value }))}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </form>
                {/* Technologies List */}
                <div>
                  {technologies.length === 0 ? (
                    <p className="text-gray-500">No technologies added yet.</p>
                  ) : (
                    <ul className="list-disc ml-6">
                      {technologies.map((tech, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{tech.category}</span>: {tech.subcategory}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
