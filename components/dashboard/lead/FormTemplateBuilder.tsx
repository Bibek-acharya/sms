"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormField {
  id: string;
  type: "text" | "phone" | "email" | "dropdown" | "checkbox" | "date" | "file";
  label: string;
  required: boolean;
  options?: string[];
}

const FormTemplateBuilder = ({
  onSave,
  onCancel,
}: {
  onSave: (template: any) => void;
  onCancel: () => void;
}) => {
  const [templateName, setTemplateName] = useState("");
  const [purpose, setPurpose] = useState("Admission");
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "text", label: "Full Name", required: true },
    { id: "2", type: "email", label: "Email Address", required: true },
  ]);

  const addField = () => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      label: "New Field",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">
              Create Form Template
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Build a reusable form for lead capture
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-white text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({ name: templateName, purpose, fields })}
              className="px-6 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:bg-teal-700 transition-all"
            >
              Save Template
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 border-r border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Template Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Annual Sports Day Registration"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Form Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-teal-500/20 transition-all"
                >
                  <option>Admission</option>
                  <option>Inquiry</option>
                  <option>Event</option>
                  <option>Campaign</option>
                  <option>Feedback</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-teal-50/50 p-4 rounded-3xl border border-teal-100">
                <h3 className="text-[11px] font-black text-teal-700 uppercase tracking-widest ml-2">
                  Form Fields ({fields.length})
                </h3>
                <button
                  onClick={addField}
                  className="p-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-md shadow-teal-500/10"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 group hover:border-teal-500/20 transition-all items-end md:items-center"
                  >
                    <div className="hidden md:flex flex-col items-center justify-center p-2 text-gray-200">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, { label: e.target.value })
                        }
                        className="w-full border-none p-0 text-sm font-black text-gray-800 focus:ring-0"
                        placeholder="Enter field label..."
                      />
                      <div className="flex gap-4">
                        <select
                          value={field.type}
                          onChange={(e) =>
                            updateField(field.id, {
                              type: e.target.value as any,
                            })
                          }
                          className="bg-transparent border-none p-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest focus:ring-0 cursor-pointer hover:text-teal-600 transition-colors"
                        >
                          <option value="text">Text Input</option>
                          <option value="phone">Phone Number</option>
                          <option value="email">Email Address</option>
                          <option value="date">Date Picker</option>
                          <option value="dropdown">Dropdown Select</option>
                          <option value="file">File Upload</option>
                        </select>
                        <label className="flex items-center gap-2 cursor-pointer group/req">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) =>
                              updateField(field.id, {
                                required: e.target.checked,
                              })
                            }
                            className="w-3 h-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-[10px] font-bold text-gray-300 group-hover/req:text-teal-600 uppercase transition-colors">
                            Required
                          </span>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => removeField(field.id)}
                      className="p-3 bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="w-full md:w-96 bg-gray-50/50 p-8 overflow-y-auto hidden lg:block">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                🏠
              </div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider text-center">
                Live Preview
              </h3>
              <p className="text-[10px] font-bold text-gray-400 text-center uppercase">
                How leads will see the form
              </p>
            </div>

            <div className="bg-white rounded-4xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-5">
              <div className="border-b border-gray-50 pb-4">
                <h4 className="font-black text-gray-800 text-sm leading-tight">
                  {templateName || "Untitled Template"}
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                  {purpose} Registration
                </p>
              </div>
              {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100" />
                </div>
              ))}
              <button className="w-full py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/10 mt-4">
                Submit Information
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormTemplateBuilder;
