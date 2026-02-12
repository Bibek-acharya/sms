"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password Validation Criteria
  const passwordCriteria = {
    length: password.length >= 8 && password.length <= 128,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/create-new-password");
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
          Welcome Back
        </h2>
        <p className="text-gray-500 text-xs lg:text-sm">
          Enter your email and password to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold text-gray-600 block"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email Address"
              className={`w-full pl-12 pr-4 py-3.5 bg-[#F1F5F9] border-2 rounded-xl focus:ring-2 outline-none transition-all text-gray-800 placeholder:text-gray-400 text-sm ${
                email && !isEmailValid
                  ? "border-red-400 focus:ring-red-400"
                  : "border-transparent focus:ring-[#14B8A6]"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {email && !isEmailValid && (
            <p className="text-[10px] text-red-500 font-medium ml-1 italic">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold text-gray-600 block"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              maxLength={128}
              className={`w-full pl-12 pr-12 py-3.5 bg-[#F1F5F9] border-2 rounded-xl focus:ring-2 outline-none transition-all text-gray-800 placeholder:text-gray-400 text-sm ${
                password && !isPasswordValid
                  ? "border-amber-400 focus:ring-amber-400"
                  : "border-transparent focus:ring-[#14B8A6]"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
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
                {showPassword ? (
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
            </button>
          </div>

          {/* Password Validation Checklist */}
          {password && (
            <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-2 px-1">
              <div
                className={`text-[10px] flex items-center gap-1.5 ${
                  passwordCriteria.length
                    ? "text-teal-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    passwordCriteria.length ? "bg-teal-600" : "bg-gray-400"
                  }`}
                />
                {password.length < 8 ? "8+ characters" : "Max 128 characters"}
              </div>
              <div
                className={`text-[10px] flex items-center gap-1.5 ${
                  passwordCriteria.uppercase
                    ? "text-teal-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    passwordCriteria.uppercase ? "bg-teal-600" : "bg-gray-400"
                  }`}
                />
                1 Uppercase
              </div>
              <div
                className={`text-[10px] flex items-center gap-1.5 ${
                  passwordCriteria.lowercase
                    ? "text-teal-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    passwordCriteria.lowercase ? "bg-teal-600" : "bg-gray-400"
                  }`}
                />
                1 Lowercase
              </div>
              <div
                className={`text-[10px] flex items-center gap-1.5 ${
                  passwordCriteria.special
                    ? "text-teal-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    passwordCriteria.special ? "bg-teal-600" : "bg-gray-400"
                  }`}
                />
                1 Special char
              </div>
            </div>
          )}
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-[#14B8A6] focus:ring-[#14B8A6] cursor-pointer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
              Remember me
            </span>
          </label>
          <Link
            href="/create-new-password"
            className="text-xs font-semibold text-gray-600 hover:text-[#14B8A6] transition-colors"
          >
            Forget password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] text-sm"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
