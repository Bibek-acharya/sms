import React from "react";
import LoginForm from "../components/login/LoginForm";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-[2.5rem] shadow-sm border border-[#E2E8F0] flex overflow-hidden p-6">
        {/* Left Side: Background Image and Text */}
        <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/loginimage.png')`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              School Management system
            </h1>
            <p className="text-lg font-medium max-w-md opacity-90">
              Your journey to success starts here. Let&apos;s unlock your
              potential!
            </p>

            {/* Bottom decorative line */}
            <div className="absolute bottom-12 left-12 h-20 w-1 bg-white/40" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-md w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
