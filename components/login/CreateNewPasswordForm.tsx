"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PasswordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z" />
  </svg>
);

const EyeIcon = ({ show }: { show: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {show ? (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </>
    ) : (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const CreateNewPasswordForm = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Image
          src="/assets/logo.png"
          alt="Infi Loop Logo"
          width={150}
          height={45}
          className="object-contain"
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 font-sans tracking-tight">
          Create a new password
        </h2>
        <p className="text-gray-500 text-xs lg:text-sm">
          Please enter your old password and then set your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password Field */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold text-gray-600 block"
            htmlFor="oldPassword"
          >
            Enter the old password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <PasswordIcon />
            </div>
            <input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old Password"
              className="w-full pl-12 pr-12 py-3.5 bg-[#F1F5F9] border-2 rounded-xl focus:ring-2 outline-none transition-all text-gray-800 placeholder:text-gray-400 text-sm border-transparent focus:ring-[#14B8A6]"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <EyeIcon show={showOldPassword} />
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold text-gray-600 block"
            htmlFor="newPassword"
          >
            Create a new password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <PasswordIcon />
            </div>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              maxLength={128}
              className="w-full pl-12 pr-12 py-3.5 bg-[#F1F5F9] border-2 rounded-xl focus:ring-2 outline-none transition-all text-gray-800 placeholder:text-gray-400 text-sm border-transparent focus:ring-[#14B8A6]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <EyeIcon show={showNewPassword} />
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold text-gray-600 block"
            htmlFor="confirmPassword"
          >
            Confirm new password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <PasswordIcon />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full pl-12 pr-12 py-3.5 bg-[#F1F5F9] border-2 rounded-xl focus:ring-2 outline-none transition-all text-gray-800 placeholder:text-gray-400 text-sm border-transparent focus:ring-[#14B8A6]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <EyeIcon show={showConfirmPassword} />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] text-sm"
          >
            Confirm change
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPasswordForm;
