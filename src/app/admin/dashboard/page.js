"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState({
    stats: { totalUsers: 0, totalRaised: 0, thisMonthRaised: 0, pendingDonations: 0 },
    recentUsers: [],
    recentDonations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'failed': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Monitor registrations and donations at a glance.</p>
        </div>

     
        <div className="grid grid-cols-4 gap-6 mb-10">
        
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Registrations</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{data.stats.totalUsers}</h2>
          </div>

        
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Donations</p>
            <h2 className="text-3xl font-extrabold text-gray-900">₹{data.stats.totalRaised.toLocaleString()}</h2>
          </div>

        
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">This Month</p>
            <h2 className="text-3xl font-extrabold text-gray-900">₹{data.stats.thisMonthRaised.toLocaleString()}</h2>
          </div>

        
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{data.stats.pendingDonations}</h2>
          </div>
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
   
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Users</h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                {data.recentUsers.length} newest
              </span>
            </div>

            <div className="space-y-6">
              {loading ? <p className="text-gray-400 text-center py-4">Loading...</p> : 
               data.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/admin/users" className="text-sm font-bold text-purple-600 hover:text-purple-700 hover:underline">
                View all users ↗
              </Link>
            </div>
          </div>

        
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Donations</h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                {data.recentDonations.length} newest
              </span>
            </div>

            <div className="space-y-6">
              {loading ? <p className="text-gray-400 text-center py-4">Loading...</p> : 
               data.recentDonations.map((donation) => (
                <div key={donation._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      donation.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {donation.name ? donation.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{donation.name || "Guest"}</p>
                      <p className="text-xs text-gray-400">
                        <span suppressHydrationWarning>{formatDate(donation.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">₹{donation.amount}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/admin/donations" className="text-sm font-bold text-purple-600 hover:text-purple-700 hover:underline">
                View all donations ↗
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}