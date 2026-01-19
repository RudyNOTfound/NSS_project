"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. IMPORT getSession HERE
import { signIn, getSession } from "next-auth/react"; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- REGISTER LOGIC (If creating an account) ---
    if (!isLogin) {
      if (!name || !email || !password) {
        setError("All fields are necessary.");
        return;
      }

      try {
        setPending(true);
        const res = await fetch("api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
          e.target.reset();
          setError("");
          setPending(false);
          setIsLogin(true); // Switch to login view
          alert("Registration Successful! Please login.");
        } else {
          const errorData = await res.json();
          setError(errorData.message);
          setPending(false);
        }
      } catch (error) {
        setError("Something went wrong.");
        setPending(false);
      }
    } 
    
    // --- LOGIN LOGIC (This is where the new change is!) ---
    else {
      try {
        setPending(true);
        
        // 1. Attempt to sign in
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false, // Don't redirect automatically
        });

        if (res.error) {
          setError("Invalid Credentials");
          setPending(false);
          return;
        }

        // 2. SUCCESS! Now check WHO logged in (Admin or User?)
        const session = await getSession();
        
        if (session?.user?.role === "admin") {
           // If Admin -> Go to Admin Overview
           router.replace("/admin/overview");
        } else {
           // If User -> Go to User Dashboard
           router.replace("/user/dashboard");
        }

      } catch (error) {
        console.log(error);
        setPending(false);
      }
    }
  };

  // Quick Admin button (Optional, keeps existing functionality)
  const handleAdminRedirect = (e) => {
    e.preventDefault();
    router.push('/admin/overview');
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#8b5cf6] text-white p-12 relative overflow-hidden">
        <div className="z-10 text-center">
          <div className="mb-6 inline-block p-4 bg-white/20 rounded-2xl backdrop-blur-md text-3xl">❤</div>
          <h1 className="text-5xl font-bold mb-4">HopeGive</h1>
          <p className="text-lg opacity-90 max-w-md mx-auto">Empowering communities through transparent donations.</p>
          <div className="flex justify-center gap-12 mt-12">
            <div><p className="text-3xl font-bold">10K+</p><p className="text-sm opacity-75 text-center">Donors</p></div>
            <div><p className="text-3xl font-bold">$2M+</p><p className="text-sm opacity-75 text-center">Raised</p></div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md text-center">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800">{isLogin ? "Welcome back" : "Create account"}</h2>
            <p className="text-gray-500 text-sm mt-2">{isLogin ? "Enter your credentials" : "Join us today"}</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button onClick={() => { setIsLogin(true); setError(""); }} className={`flex-1 py-2 rounded-lg transition-all ${isLogin ? "bg-white shadow text-gray-800 font-bold" : "text-gray-500"}`}>Login</button>
            <button onClick={() => { setIsLogin(false); setError(""); }} className={`flex-1 py-2 rounded-lg transition-all ${!isLogin ? "bg-white shadow text-gray-800 font-bold" : "text-gray-500"}`}>Register</button>
          </div>

          {error && <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mb-4 mx-auto w-fit">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">👤</span>
                  <input onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">✉</span>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            <button disabled={pending} type="submit" className="w-full bg-[#8b5cf6] text-white font-bold py-4 rounded-xl hover:bg-[#7c3aed] shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2 mt-4 disabled:bg-gray-400">
              {isLogin ? "Sign In" : (pending ? "Registering..." : "Create Account")} <span>→</span>
            </button>
          </form>

          <div className="mt-8 space-y-3">
            <div className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-purple-600 font-bold ml-1 hover:underline">{isLogin ? "Sign up" : "Sign in"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}