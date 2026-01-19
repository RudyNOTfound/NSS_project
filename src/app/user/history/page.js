"use client";
import Sidebar from '../../../components/Sidebar'; 
import { useEffect, useState } from 'react';

export default function DonationHistoryPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when page loads
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

  // Helper to format date nicely (e.g., "May 15, 2024")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper for Status Badge Colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-600 border border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-600 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
          {/* Export button (Visual only for now) */}
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-all">
            Export
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-4 p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction ID</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right pr-4">Status</div>
          </div>

          {/* Table Body - Loading State */}
          {loading && (
            <div className="p-10 text-center text-gray-400">
              Loading your history...
            </div>
          )}

          {/* Table Body - Empty State */}
          {!loading && donations.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-gray-500 mb-2">No donations found yet.</p>
              <a href="/user/donate" className="text-pink-500 font-bold hover:underline">Make your first donation →</a>
            </div>
          )}

          {/* Table Body - Data Rows */}
          {!loading && donations.map((donation) => (
            <div key={donation._id} className="grid grid-cols-4 p-5 border-b border-gray-50 hover:bg-gray-50/30 transition-colors items-center">
              
              {/* Date */}
              <div className="text-sm font-bold text-gray-300">
                {formatDate(donation.createdAt)}
              </div>

              {/* Amount */}
              <div className="text-sm font-bold text-gray-900">
                ${donation.amount}
              </div>

              {/* ID (Truncated for clean look) */}
              <div className="text-xs font-mono text-gray-500">
                {donation.paymentId ? donation.paymentId.substring(0, 12) + "..." : "---"}
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(donation.status)}`}>
                  • {donation.status}
                </span>
              </div>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
}