"use client";
import Sidebar from '../../../components/Sidebar';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // ✅ CHANGED: Preset amounts suitable for INR
  const presetAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handlePresetClick = (val) => setAmount(val);

  const handleInputChange = (e) => {
    if (e.target.value >= 0) setAmount(e.target.value);
  };

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          email: session?.user?.email,
          name: session?.user?.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create session");
      if (data.url) window.location.href = data.url; 

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden relative">
      <Sidebar />
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        {/* Animated Blob 1 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        {/* Animated Blob 2 */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        {/* Animated Blob 3 */}
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 ml-64 p-10 relative z-10 flex items-center justify-center min-h-screen">
        
        {/* CENTERED CARD */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white p-8 max-w-lg w-full transform transition-all hover:scale-[1.01]">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            
            <h1 className="text-3xl font-extrabold text-gray-900">Support Our Cause</h1>
            <p className="text-gray-500 mt-2">Your contribution in Rupees (₹) makes a direct impact.</p>
          </div>

          {/* Donation Form */}
          <div className="space-y-6">
            
            {/* Amount Label */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <span className="text-pink-500">♡</span> Select Amount
              </h3>
              
              {/* Preset Buttons Grid */}
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                      Number(amount) === preset
                        ? "border-pink-500 bg-pink-50 text-pink-600 shadow-md transform scale-105"
                        : "border-gray-100 text-gray-600 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                {/* ✅ CHANGED: Rupee Symbol */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={handleInputChange}
                  placeholder="e.g. 2500"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all font-bold text-gray-800 text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* Donate Button */}
            <button 
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-5 rounded-xl shadow-lg shadow-pink-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <span>💳</span> Donate {amount ? `₹${amount}` : ""}
                </>
              )}
            </button>

            {/* Footer Trust Badge */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                🔒 Secure payment via Stripe · Tax Deductible
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* --- CSS FOR ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
}