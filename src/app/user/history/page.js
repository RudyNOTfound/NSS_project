"use client";
import Sidebar from '../../../components/Sidebar'; 
import { useEffect, useState } from 'react';

export default function DonationHistoryPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/donations/history");
        const data = await res.json();
        
        if (res.ok) {
          setDonations(data.donations);
        }
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ✅ NEW: Helper to format Date and Time separately
  const getDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    
    // Format: "Jan 15, 2024"
    const date = dateObj.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });

    // Format: "02:30 PM"
    const time = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit', 
      minute: '2-digit'
    });

    return { date, time };
  };

  // Helper for Status Styles
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'failed':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      default:
        return 'bg-gray-50 text-gray-500 border border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return '●'; // Dot
      case 'pending': return '◌'; // Circle
      case 'failed':  return '✕'; // Cross
      default: return '-';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
            <p className="text-gray-500 mt-1">Track every contribution you've made.</p>
          </div>
          
          <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2">
            <span>📥</span> Export CSV
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 bg-gray-50/50 items-center">
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</div>
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Donation ID</div>
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</div>
            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400 font-medium">Loading records...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && donations.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">
                📜
              </div>
              <h3 className="text-lg font-bold text-gray-900">No donations yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Your history is empty. Start your journey of giving today.
              </p>
              <a href="/user/donate" className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-lg shadow-pink-200">
                Make a Donation
              </a>
            </div>
          )}

          {/* Data Rows */}
          <div className="divide-y divide-gray-50">
            {!loading && donations.map((donation) => {
              const { date, time } = getDateTime(donation.createdAt);
              
              return (
                <div key={donation._id} className="grid grid-cols-12 px-6 py-5 hover:bg-purple-50/30 transition-colors items-center group">
                  
                  {/* Column 1: Date & Time (Stacked) */}
                  <div className="col-span-3">
                    <p className="font-bold text-gray-800 text-sm">
                        <span suppressHydrationWarning>{date}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <span>🕒</span>
                        <span suppressHydrationWarning>{time}</span>
                    </p>
                  </div>

                  {/* Column 2: ID */}
                  <div className="col-span-3">
                    <div className="inline-flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 group-hover:border-purple-100 transition-colors">
                        <span className="text-xs font-mono text-gray-500">
                            #{donation.paymentId ? donation.paymentId.substring(0, 8) : "---"}...
                        </span>
                    </div>
                  </div>

                  {/* Column 3: Amount */}
                  <div className="col-span-3">
                    <span className="text-gray-900 font-bold text-lg">
                        ₹{donation.amount}
                    </span>
                  </div>

                  {/* Column 4: Status */}
                  <div className="col-span-3 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${getStatusStyles(donation.status)}`}>
                      <span className="text-[10px]">{getStatusIcon(donation.status)}</span>
                      {donation.status}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}