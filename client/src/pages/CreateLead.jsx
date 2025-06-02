import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// Discussion Matter Options and sub-options (copy from UserRegister)
const discussionMatterOptions = [
  "Bakery Products",
  "Beverage Products",
  "Cereal Products",
  "Convenience Products",
  "Food Machinery",
  "Fruits & Vegetable Products",
  "Meat & Marine Products",
  "Microbiology & Fermentation",
  "Plantation & Spice Products",
  "Protein Specialty Products",
];

const bakeryProductOptions = [
  "Sugar-free Biscuit",
  "Baking powder",
  "Bread: Production (Brown, Plain, Sweet, Milk, Whole wheat, Fruit, High fiber, Ragi, Bajra)",
  // ...add more as needed
];

const subOptionsMap = {
  "Bakery Products": bakeryProductOptions,
  // Add other mappings as needed
};

const typeOptions = [
  "Startup",
  "MSME",
  "Large Industry",
  "Academic",
  "Government",
  "Other",
];

const CreateLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "defaultPassword",
    contact: "",
    onboarding: {
      details: {
        subject: "",
        gender: "",
        category: "",
        country: "",
        state: "",
        place: "",
        address: "",
        organization: "",
        type: "",
        projectMode: "",
        discussionMatter: "",
        specificOption: "",
        collaborativeOptions: [],
        collaborativeOther: "",
        leadValue: "",
        source: "",
        expectedCloseDate: "",
      },
    },
  });

  const [showSpecificOptions, setShowSpecificOptions] = useState(false);
  const [specificOptions, setSpecificOptions] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes (deep update)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const options = prev.onboarding.details.collaborativeOptions || [];
        return {
          ...prev,
          onboarding: {
            ...prev.onboarding,
            details: {
              ...prev.onboarding.details,
              collaborativeOptions: checked
                ? [...options, value]
                : options.filter((v) => v !== value),
            },
          },
        };
      });
    } else {
      setFormData((prev) => {
        const updated = { ...prev };
        _.set(updated, name, value);
        return updated;
      });
    }
  };

  // Watch for discussionMatter changes
  useEffect(() => {
    const matter = formData.onboarding.details.discussionMatter;
    if (matter && subOptionsMap[matter]) {
      setSpecificOptions(subOptionsMap[matter]);
      setShowSpecificOptions(true);
    } else {
      setShowSpecificOptions(false);
      setSpecificOptions([]);
    }
  }, [formData.onboarding.details.discussionMatter]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/lead/createLead", formData);
      setToastMessage("Lead created successfully!");
      setTimeout(() => {
        navigate("/admin?tab=3");
      }, 2000);
    } catch (err) {
      setToastMessage("Error creating lead.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                Create Lead
              </h2>
              <p className="text-gray-500">Fill the details to create a lead</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-2xl font-semibold text-blue-700">
                    Lead & Technical Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Lead Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="lead@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.subject"
                      placeholder="Subject"
                      value={formData.onboarding.details.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="onboarding.details.gender"
                      value={formData.onboarding.details.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="onboarding.details.category"
                      value={formData.onboarding.details.category}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="SC/ST">SC/ST</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.country"
                      placeholder="Country"
                      value={formData.onboarding.details.country}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.state"
                      placeholder="State"
                      value={formData.onboarding.details.state}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Place
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.place"
                      placeholder="Place"
                      value={formData.onboarding.details.place}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.address"
                      placeholder="Full Address"
                      value={formData.onboarding.details.address}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="e.g. +91-9876543210"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="onboarding.details.organization"
                      placeholder="Organization Name"
                      value={formData.onboarding.details.organization || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      name="onboarding.details.type"
                      value={formData.onboarding.details.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bussiness Scale
                    </label>
                    <div className="flex gap-6">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="onboarding.details.projectMode"
                          value="collaborative"
                          checked={
                            formData.onboarding.details.projectMode ===
                            "collaborative"
                          }
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Collaborative Project
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="onboarding.details.projectMode"
                          value="transfer"
                          checked={
                            formData.onboarding.details.projectMode === "transfer"
                          }
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Technology Transfer
                      </label>
                    </div>
                  </div>
                  {formData.onboarding.details.projectMode === "collaborative" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Collaborative Focus Areas
                      </label>
                      <div className="space-y-2">
                        {[
                          "Product Development",
                          "Process Optimization",
                          "Shelf-life Extension",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={option}
                              checked={formData.onboarding.details.collaborativeOptions?.includes(
                                option
                              )}
                              onChange={handleChange}
                            />
                            {option}
                          </label>
                        ))}
                        <label className="block text-sm font-medium text-gray-700 mt-4">
                          Others
                        </label>
                        <input
                          type="text"
                          placeholder="Describe other collaborative focus..."
                          value={formData.onboarding.details.collaborativeOther}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              onboarding: {
                                ...prev.onboarding,
                                details: {
                                  ...prev.onboarding.details,
                                  collaborativeOther: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}
                  {formData.onboarding.details.projectMode === "transfer" && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Topic of Interest
                        </label>
                        <Select
                          options={discussionMatterOptions.map((topic) => ({
                            value: topic,
                            label: topic,
                          }))}
                          value={
                            formData.onboarding.details.discussionMatter
                              ? {
                                  value: formData.onboarding.details.discussionMatter,
                                  label: formData.onboarding.details.discussionMatter,
                                }
                              : null
                          }
                          onChange={(selected) =>
                            setFormData((prev) => ({
                              ...prev,
                              onboarding: {
                                ...prev.onboarding,
                                details: {
                                  ...prev.onboarding.details,
                                  discussionMatter: selected ? selected.value : "",
                                  specificOption: "",
                                },
                              },
                            }))
                          }
                          placeholder="Select Topic of Interest"
                          isClearable
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              backgroundColor: "#f0f6ff",
                              borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                              boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "",
                              borderRadius: "0.5rem",
                              minHeight: 48,
                              fontSize: "1rem",
                              padding: "2px 0",
                              transition: "border-color 0.2s, box-shadow 0.2s",
                              "&:hover": { borderColor: "#3b82f6" },
                              zIndex: 1,
                            }),
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 9999,
                              maxHeight: 300,
                              borderRadius: "0.75rem",
                              boxShadow: "0 8px 24px 0 rgba(59, 130, 246, 0.10)",
                              backgroundColor: "#fff",
                              overflow: "hidden",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              fontSize: "1rem",
                              backgroundColor: state.isSelected
                                ? "#3b82f6"
                                : state.isFocused
                                ? "#e0e7ff"
                                : "#fff",
                              color: state.isSelected ? "#fff" : "#1e293b",
                              cursor: "pointer",
                              transition: "background 0.15s",
                              borderRadius: "0.5rem",
                              margin: "2px 8px",
                              paddingLeft: 16,
                            }),
                            menuList: (provided) => ({
                              ...provided,
                              maxHeight: 250,
                              overflowY: "auto",
                              paddingTop: 8,
                              paddingBottom: 8,
                              borderRadius: "0.75rem",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color: "#64748b",
                              fontSize: "1rem",
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "#1e293b",
                              fontSize: "1rem",
                            }),
                            input: (provided) => ({
                              ...provided,
                              color: "#1e293b",
                              fontSize: "1rem",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                            dropdownIndicator: (provided, state) => ({
                              ...provided,
                              color: state.isFocused ? "#3b82f6" : "#64748b",
                              "&:hover": { color: "#3b82f6" },
                              transition: "color 0.2s",
                            }),
                            clearIndicator: (provided) => ({
                              ...provided,
                              color: "#64748b",
                              "&:hover": { color: "#3b82f6" },
                              transition: "color 0.2s",
                            }),
                          }}
                          menuPlacement="auto"
                        />
                      </div>
                      {showSpecificOptions && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specific {formData.onboarding.details.discussionMatter}
                          </label>
                          <Select
                            options={specificOptions.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            value={
                              formData.onboarding.details.specificOption
                                ? {
                                    value: formData.onboarding.details.specificOption,
                                    label: formData.onboarding.details.specificOption,
                                  }
                                : null
                            }
                            onChange={(selected) =>
                              setFormData((prev) => ({
                                ...prev,
                                onboarding: {
                                  ...prev.onboarding,
                                  details: {
                                    ...prev.onboarding.details,
                                    specificOption: selected ? selected.value : "",
                                  },
                                },
                              }))
                            }
                            placeholder={`Select or search ${formData.onboarding.details.discussionMatter}`}
                            isClearable
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                backgroundColor: "#f0f6ff",
                                borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                                boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "",
                                borderRadius: "0.5rem",
                                minHeight: 48,
                                fontSize: "1rem",
                                padding: "2px 0",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                                "&:hover": { borderColor: "#3b82f6" },
                                zIndex: 1,
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                                maxHeight: 300,
                                borderRadius: "0.75rem",
                                boxShadow: "0 8px 24px 0 rgba(59, 130, 246, 0.10)",
                                backgroundColor: "#fff",
                                overflow: "hidden",
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                fontSize: "1rem",
                                backgroundColor: state.isSelected
                                  ? "#3b82f6"
                                  : state.isFocused
                                  ? "#e0e7ff"
                                  : "#fff",
                                color: state.isSelected ? "#fff" : "#1e293b",
                                cursor: "pointer",
                                transition: "background 0.15s",
                                borderRadius: "0.5rem",
                                margin: "2px 8px",
                                paddingLeft: 16,
                              }),
                              menuList: (provided) => ({
                                ...provided,
                                maxHeight: 250,
                                overflowY: "auto",
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderRadius: "0.75rem",
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#64748b",
                                fontSize: "1rem",
                              }),
                              singleValue: (provided) => ({
                                ...provided,
                                color: "#1e293b",
                                fontSize: "1rem",
                              }),
                              input: (provided) => ({
                                ...provided,
                                color: "#1e293b",
                                fontSize: "1rem",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              dropdownIndicator: (provided, state) => ({
                                ...provided,
                                color: state.isFocused ? "#3b82f6" : "#64748b",
                                "&:hover": { color: "#3b82f6" },
                                transition: "color 0.2s",
                              }),
                              clearIndicator: (provided) => ({
                                ...provided,
                                color: "#64748b",
                                "&:hover": { color: "#3b82f6" },
                                transition: "color 0.2s",
                              }),
                            }}
                            menuPlacement="auto"
                          />
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Value
                    </label>
                    <input
                      type="number"
                      name="onboarding.details.leadValue"
                      placeholder="Lead Value"
                      value={formData.onboarding.details.leadValue}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source
                    </label>
                    <select
                      name="onboarding.details.source"
                      value={formData.onboarding.details.source}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Source</option>
                      <option value="source1">Source 1</option>
                      <option value="source2">Source 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Close Date
                    </label>
                    <input
                      type="date"
                      name="onboarding.details.expectedCloseDate"
                      value={formData.onboarding.details.expectedCloseDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    Create Lead
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default CreateLead;
