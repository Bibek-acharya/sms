"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ApplicantData {
  id: string;
  name: string;
  class: string;
  academicYear: string;
  status: string;
  photo?: string;
  studentDetails: {
    dob: string;
    gender: string;
    previousSchool: string;
    gradeLastPassed: string;
    address: string;
  };
  parentDetails: {
    fatherName: string;
    motherName: string;
    phone: string;
    email: string;
    occupation: string;
    emergencyContact: string;
  };
  timeline: Array<{
    step: string;
    date: string;
    completed: boolean;
    current?: boolean;
  }>;
  documents: Array<{
    name: string;
    status: "Uploaded" | "Verified" | "Pending" | "Rejected";
    type: string;
  }>;
  interview: {
    date: string;
    time: string;
    interviewer: string;
    score: number;
    remarks: string;
    recommendation: "Accept" | "Waitlist" | "Reject" | "Pending";
  };
  feeDetails: {
    admissionFee: number;
    deposit: number;
    dueDate: string;
    status: "Paid" | "Unpaid" | "Partial";
  };
}

const AdmissionDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data
  const applicant: ApplicantData = {
    id: id || "ADM-2025-002",
    name: "Sarah Smith",
    class: "Grade 5",
    academicYear: "2025-2026",
    status: "Interview Scheduled",
    studentDetails: {
      dob: "2014-05-12",
      gender: "Female",
      previousSchool: "Greenwood Heights Primary",
      gradeLastPassed: "Grade 4",
      address: "452 Maple Ave, Springfield, IL",
    },
    parentDetails: {
      fatherName: "Robert Smith",
      motherName: "Jane Smith",
      phone: "+1 234 567 891",
      email: "r.smith@example.com",
      occupation: "Software Architect",
      emergencyContact: "+1 234 567 999",
    },
    timeline: [
      { step: "Inquiry Received", date: "2025-01-10", completed: true },
      { step: "Application Submitted", date: "2025-01-15", completed: true },
      { step: "Documents Verified", date: "2025-01-20", completed: true },
      { step: "Interview / Entrance Test", date: "2025-01-28", completed: false, current: true },
      { step: "Offer Issued", date: "TBD", completed: false },
      { step: "Fee Paid", date: "TBD", completed: false },
      { step: "Admission Confirmed", date: "TBD", completed: false },
    ],
    documents: [
      { name: "Birth Certificate", status: "Verified", type: "PDF" },
      { name: "Previous Marksheet", status: "Verified", type: "IMAGE" },
      { name: "Transfer Certificate", status: "Pending", type: "PDF" },
      { name: "Parent ID Proof", status: "Verified", type: "PDF" },
    ],
    interview: {
      date: "2025-01-28",
      time: "10:30 AM",
      interviewer: "Dr. Alice Wagner",
      score: 85,
      remarks: "Sarah showed great aptitude in logical reasoning. Very articulate for her age.",
      recommendation: "Pending",
    },
    feeDetails: {
      admissionFee: 1500,
      deposit: 500,
      dueDate: "2025-02-15",
      status: "Unpaid",
    },
  };

  const tabs = [
    { id: "profile", label: "Applicant Profile" },
    { id: "journey", label: "Admission Journey" },
    { id: "documents", label: "Documents" },
    { id: "interview", label: "Interview & Test" },
    { id: "fees", label: "Fees & Offer" },
    { id: "logs", label: "Communication" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileTab applicant={applicant} />;
      case "journey": return <JourneyTab applicant={applicant} />;
      case "documents": return <DocumentsTab applicant={applicant} />;
      case "interview": return <InterviewTab applicant={applicant} />;
      case "fees": return <FeesTab applicant={applicant} />;
      case "logs": return <CommunicationTab />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-[#14B8A6]"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </button>
          <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center text-[#14B8A6] font-black text-2xl border-4 border-white shadow-sm uppercase">
            {applicant.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-gray-800">{applicant.name}</h1>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-100">
                {applicant.status}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-400">
              {applicant.id} • {applicant.class} • {applicant.academicYear}
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-teal-100 text-[#14B8A6] rounded-2xl text-sm font-bold hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Call
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-[#14B8A6] text-white rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all flex items-center justify-center gap-2">
            Update Status
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white border border-gray-100 rounded-3xl overflow-x-auto no-scrollbar shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#14B8A6] text-white shadow-md shadow-teal-500/20"
                : "text-gray-400 hover:text-[#14B8A6] hover:bg-teal-50/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-100">
        {renderTabContent()}
      </div>
    </div>
  );
};

// --- Subcomponents ---

const ProfileTab = ({ applicant }: { applicant: ApplicantData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-[#14B8A6] rounded-full" />
        Student Details
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date of Birth</p>
          <p className="text-sm font-bold text-gray-700">{applicant.studentDetails.dob}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Gender</p>
          <p className="text-sm font-bold text-gray-700">{applicant.studentDetails.gender}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Previous School</p>
          <p className="text-sm font-bold text-gray-700">{applicant.studentDetails.previousSchool}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Grade Last Passed</p>
          <p className="text-sm font-bold text-gray-700">{applicant.studentDetails.gradeLastPassed}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Address</p>
          <p className="text-sm font-bold text-gray-700">{applicant.studentDetails.address}</p>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
        Parent Information
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Father&apos;s Name</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.fatherName}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mother&apos;s Name</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.motherName}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact Number</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.phone}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.email}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Occupation</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.occupation}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Emergency Contact</p>
          <p className="text-sm font-bold text-gray-700">{applicant.parentDetails.emergencyContact}</p>
        </div>
      </div>
    </div>
  </div>
);

const JourneyTab = ({ applicant }: { applicant: ApplicantData }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-black text-gray-800 mb-10">Application Timeline</h3>
    <div className="relative pl-8 space-y-12 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
      {applicant.timeline.map((step, i) => (
        <div key={i} className="relative group">
          <div className={`absolute -left-[2.15rem] top-1 w-7 h-7 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-all ${
            step.completed ? "bg-[#14B8A6] text-white" : 
            step.current ? "bg-amber-100 text-amber-600 animate-pulse" : "bg-gray-100 text-gray-400"
          }`}>
            {step.completed ? (
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
            ) : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className={`font-black text-sm mb-1 ${step.completed ? "text-gray-800" : "text-gray-400"}`}>{step.step}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{step.date}</p>
            </div>
            {step.current && (
                <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider">In Progress</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DocumentsTab = ({ applicant }: { applicant: ApplicantData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {applicant.documents.map((doc, i) => (
      <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-teal-100 transition-all flex flex-col gap-4 group">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${doc.status === 'Verified' ? 'bg-teal-50 text-[#14B8A6]' : 'bg-gray-50 text-gray-400'}`}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider ${
            doc.status === 'Verified' ? 'bg-teal-50 text-[#14B8A6]' : 
            doc.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
          }`}>
            {doc.status}
          </span>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">{doc.name}</h4>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{doc.type}</p>
        </div>
        <div className="flex gap-2">
            <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[10px] font-black uppercase text-gray-500 transition-all">Preview</button>
            {doc.status !== 'Verified' && (
                <button className="flex-1 py-2 bg-teal-50 hover:bg-[#14B8A6] hover:text-white rounded-xl text-[10px] font-black uppercase text-[#14B8A6] transition-all">Verify</button>
            )}
        </div>
      </div>
    ))}
    <div className="bg-gray-50/50 p-6 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center group hover:border-[#14B8A6]/30 transition-all cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-[#14B8A6] shadow-sm mb-3">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload New</p>
    </div>
  </div>
);

const InterviewTab = ({ applicant }: { applicant: ApplicantData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4 border-4 border-white shadow-sm">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </div>
      <h3 className="text-xl font-black text-gray-800 mb-1">Interview Scheduled</h3>
      <p className="text-sm font-bold text-gray-400 mb-6">{applicant.interview.date} at {applicant.interview.time}</p>
      <div className="p-4 bg-gray-50 rounded-2xl w-full max-w-xs text-center border border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned Interviewer</p>
        <p className="text-sm font-black text-gray-700">{applicant.interview.interviewer}</p>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
        Assessment Findings
      </h3>
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Remarks</p>
          <div className="p-4 bg-gray-50 rounded-2xl text-sm font-medium text-gray-600 leading-relaxed border border-gray-100">
            {applicant.interview.remarks}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Test Score</p>
            <p className="text-2xl font-black text-purple-600">{applicant.interview.score}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Decision</p>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{applicant.interview.recommendation}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeesTab = ({ applicant }: { applicant: ApplicantData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-800 mb-6">Payment Configuration</h3>
      <div className="space-y-4">
        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-sm font-bold text-gray-500">Admission Fee</span>
            <span className="text-sm font-black text-gray-800">${applicant.feeDetails.admissionFee}</span>
        </div>
        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-sm font-bold text-gray-500">Security Deposit</span>
            <span className="text-sm font-black text-gray-800">${applicant.feeDetails.deposit}</span>
        </div>
        <div className="flex justify-between p-4 bg-teal-50 border border-teal-100 rounded-2xl">
            <span className="text-sm font-black text-teal-800">Total Payable</span>
            <span className="text-sm font-black text-teal-800">${applicant.feeDetails.admissionFee + applicant.feeDetails.deposit}</span>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${applicant.feeDetails.status === 'Paid' ? 'bg-teal-50 text-[#14B8A6]' : 'bg-red-50 text-red-500 animate-pulse'}`}>
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h4 className="text-lg font-black text-gray-800 mb-1">Status: {applicant.feeDetails.status}</h4>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Due Date: {applicant.feeDetails.dueDate}</p>
      <button className="w-full py-3 bg-[#14B8A6] text-white rounded-2xl text-sm font-black shadow-lg shadow-teal-500/20 hover:bg-[#0D9488] transition-all">Generate Offer Letter</button>
    </div>
  </div>
);

const CommunicationTab = () => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-gray-800 lowercase first-letter:uppercase">Recent correspondence</h3>
            <button className="text-[#14B8A6] text-sm font-black lowercase first-letter:uppercase hover:underline">+ Log communication</button>
        </div>
        <div className="space-y-6">
            {[
                { type: 'Call', status: 'Completed', text: 'Spoke with father regarding missing TC. He will submit by next week.', user: 'Admin Sarah', date: 'Feb 05, 10:20 AM' },
                { type: 'Email', status: 'Sent', text: 'Sent interview invitation and entrance test syllabus.', user: 'System', date: 'Jan 25, 04:15 PM' },
                { type: 'SMS', status: 'Delivered', text: 'Document verification successful notification.', user: 'Admission Officer', date: 'Jan 20, 09:00 AM' },
            ].map((log, i) => (
                <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        log.type === 'Call' ? 'bg-blue-50 text-blue-500' :
                        log.type === 'Email' ? 'bg-amber-50 text-amber-500' : 'bg-teal-50 text-teal-500'
                    }`}>
                        {log.type === 'Call' && <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                        {log.type === 'Email' && <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                        {log.type === 'SMS' && <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-black text-gray-800">{log.type} <span className="text-[10px] text-gray-400 font-bold ml-2">via {log.user}</span></p>
                            <span className="text-[10px] font-black text-gray-400 lowercase">{log.date}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">{log.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default AdmissionDetails;
