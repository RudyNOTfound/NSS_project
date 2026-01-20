"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRaised: 0,
    totalDonationsCount: 0,
    statusCounts: { success: 0, pending: 0, failed: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (error) {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  
  const getPercentage = (count) => {
    if (stats.totalDonationsCount === 0) return 0;
    return Math.round((count / stats.totalDonationsCount) * 100);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10 flex flex-col h-screen overflow-hidden">
  
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500 mt-2">Real-time platform insights and performance.</p>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 pb-10">
          
         
          <div className="flex flex-col gap-8 h-full">
            
        
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                  웃
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Users</p>
                <h2 className="text-6xl font-extrabold text-gray-900">
                  {loading ? "..." : stats.totalUsers}
                </h2>
                <p className="text-gray-500 mt-4 font-medium">
                  Registered members on the platform
                </p>
              </div>
            </div>

  
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute right-0 top-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                  ₹
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Raised</p>
                <h2 className="text-6xl font-extrabold text-gray-900">
                  {loading ? "..." : `₹${stats.totalRaised.toLocaleString()}`}
                </h2>
                <p className="text-gray-500 mt-4 font-medium">
                  Total successful contributions processed
                </p>
              </div>
            </div>

          </div>

        
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 h-full flex flex-col relative overflow-hidden">
             
        
             <div className="flex items-center justify-between mb-12 relative z-10">
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Donation Status</h2>
                 <p className="text-gray-500">Breakdown of all {stats.totalDonationsCount} transactions</p>
               </div>
               
             </div>

             
             <div className="space-y-10 relative z-10 flex-1 justify-center flex flex-col">
               
            
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold text-gray-700 text-lg flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Successful
                   </span>
                   <span className="font-bold text-emerald-600 text-xl">{stats.statusCounts.success}</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                   <div 
                     className="bg-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: `${getPercentage(stats.statusCounts.success)}%` }}
                   ></div>
                 </div>
                 <p className="text-right text-xs text-gray-400 mt-1 font-bold">{getPercentage(stats.statusCounts.success)}%</p>
               </div>

            
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold text-gray-700 text-lg flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full bg-amber-400"></span> Pending
                   </span>
                   <span className="font-bold text-amber-500 text-xl">{stats.statusCounts.pending}</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                   <div 
                     className="bg-amber-400 h-4 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: `${getPercentage(stats.statusCounts.pending)}%` }}
                   ></div>
                 </div>
                 <p className="text-right text-xs text-gray-400 mt-1 font-bold">{getPercentage(stats.statusCounts.pending)}%</p>
               </div>

            
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold text-gray-700 text-lg flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full bg-rose-500"></span> Failed
                   </span>
                   <span className="font-bold text-rose-500 text-xl">{stats.statusCounts.failed}</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                   <div 
                     className="bg-rose-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: `${getPercentage(stats.statusCounts.failed)}%` }}
                   ></div>
                 </div>
                 <p className="text-right text-xs text-gray-400 mt-1 font-bold">{getPercentage(stats.statusCounts.failed)}%</p>
               </div>

             </div>

          </div>

        </div>
      </main>
    </div>
  );
}