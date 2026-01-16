"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = (e) => {
    e.preventDefault();
    // In a real app, you've verify credentials here.
    // For now, we redirect directly to the dashboard.
    router.push('/user/dashboard');
  };

  return (
    <div className="flex min-h-screen font-sans">
      
      {/* LEFT SIDE: HERO SECTION (HopeGive Branding) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#8b5cf6] text-white p-12 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 rounded-full translate-x-1/4 translate-y-1/4 opacity-30"></div>

        <div className="z-10 text-center">
          <div className="mb-6 inline-block p-4 bg-white/20 rounded-2xl backdrop-blur-md">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4">HopeGive</h1>
          <p className="text-lg opacity-90 max-w-md mx-auto">
            Empowering communities through transparent donations and meaningful impact.
          </p>
          
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm opacity-75">Donors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$2M+</p>
              <p className="text-sm opacity-75">Raised</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN & REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin ? "Enter your credentials to access your account" : "Join us in making a difference today"}
            </p>
          </div>

          {/* TOGGLE SLIDER */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${isLogin ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${!isLogin ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" required />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>

            <button type="submit" className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
              {isLogin ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-purple-600 font-semibold hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
          
          <div className="text-center mt-6">
            <button className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-widest font-semibold">
              Admin Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}