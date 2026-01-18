"use client";
import Sidebar from '../../../components/Sidebar'; 
import { useState } from 'react';

export default function DonatePage() {
  // We now use a single state variable for the amount to keep everything synced
  const [amount, setAmount] = useState('');

  const presetAmounts = [25, 50, 100, 250, 500];

  // Function 1: Handle Preset Button Click
  const handlePresetClick = (presetValue) => {
    setAmount(presetValue); // This inputs the value directly into the placeholder/field
  };

  // Function 2: Handle Manual Typing
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check: Prevent negative values
    if (value < 0) {
      return; // Do nothing if the number is negative
    }

    setAmount(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Make a Donation</h1>
          <p className="text-gray-500">Support a cause that matters to you.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Campaign Details */}
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="h-48 bg-purple-100 rounded-2xl mb-4 flex items-center justify-center text-purple-300">
                  <span className="text-6xl">❤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Education for All</h2>
                <p className="text-gray-500 mb-6">Your contribution helps provide books, uniforms, and education to underprivileged children in rural communities.</p>
                <div className="flex gap-4 text-sm font-bold text-gray-600">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">Goal: $10,000</span>
                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">Raised: $6,450</span>
                </div>
             </div>
          </div>

          {/* RIGHT SIDE: Donation Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
              
              {/* Pink Stripe */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-pink-500"></div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-pink-500">♡</span> Donation Amount
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Select or enter your donation amount</p>
                </div>

                {/* Preset Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      // Logic: Check if current amount matches preset to apply active styles
                      className={`py-3 rounded-xl font-bold text-lg transition-all border-2 ${
                        Number(amount) === preset
                          ? "border-pink-500 bg-pink-50 text-pink-600 shadow-sm"
                          : "border-gray-100 text-gray-700 hover:border-pink-200 hover:bg-pink-50"
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                {/* Custom Input Field */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      min="0" // HTML constraint
                      value={amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all font-bold text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg">
                  <span>💳</span> Donate
                </button>

                <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                  Your donation is secure and tax-deductible.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}