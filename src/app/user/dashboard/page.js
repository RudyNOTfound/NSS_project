"use client";
import Sidebar from '../../../components/Sidebar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    count: 0,
    total: 0,
    memberSince: "..."
  });
  const [recentDonation, setRecentDonation] = useState(null);

  useEffect(() => {
    // Fetch stats on load
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/donations/history");
        const data = await res.json();
        
        if (res.ok && data.donations) {
          const successDonations = data.donations.filter(d => d.status === 'success');
          
          setStats({
            count: successDonations.length,
            total: successDonations.reduce((sum, d) => sum + Number(d.amount), 0),
            memberSince: new Date().getFullYear() 
          });

          if (successDonations.length > 0) {
            setRecentDonation(successDonations[0]);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard", error);
      }
    };

    if (session) fetchDashboardData();
  }, [session]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10">
        {/* Welcome Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name ? session.user.name.split(" ")[0] : "Donor"}!
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Your generosity turns compassion into action. Here is an overview of your impact.
          </p>
        </div>

        {/* --- DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Donate Online (Action) */}
          <Link href="/user/donate" className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* IMAGE HEADER */}
              <div className="h-40 relative overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800" 
                   alt="Donate" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">Donate Online</h3>
                <p className="text-sm text-gray-500">Make a secure contribution today to support our cause.</p>
                <div className="mt-4 text-pink-500 font-bold text-sm">Give Now →</div>
              </div>
            </div>
          </Link>

          {/* Card 2: Donations Made (Stat) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            {/* IMAGE HEADER */}
            <div className="h-40 relative overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" 
                 alt="Impact" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-purple-900/10"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Donations Made</h3>
              <p className="text-4xl font-extrabold text-purple-600 my-2">{stats.count}</p>
              <p className="text-sm text-gray-500">Total Contributions</p>
            </div>
          </div>

          {/* Card 3: Member Since (Stat) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            {/* IMAGE HEADER */}
            <div className="h-40 relative overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" 
                 alt="Community" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Member Since</h3>
              <p className="text-2xl font-bold text-blue-600 my-3">{stats.memberSince}</p>
              <p className="text-sm text-gray-500">Part of our family</p>
            </div>
          </div>

          {/* Card 4: Recent Activity (Kept Clean / No Image as requested) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full md:col-span-2 lg:col-span-2">
             <div className="p-6 h-full flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  Recent Activity
                </h3>
                
                {recentDonation ? (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-800">Donation to NSS_PROJECT</p>
                      <p className="text-xs text-gray-400">
                         <span suppressHydrationWarning>
                           {new Date(recentDonation.createdAt).toLocaleDateString()}
                         </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">+${recentDonation.amount}</p>
                      <span className="bg-green-100 text-green-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase">Success</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    <p>No recent activity.</p>
                  </div>
                )}
                
                <div className="mt-4 text-right">
                   <Link href="/user/history" className="text-sm font-bold text-purple-600 hover:underline">
                     View Full History →
                   </Link>
                </div>
             </div>
          </div>

           {/* Card 5: Profile (Settings) */}
           <Link href="/user/profile" className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* IMAGE HEADER */}
              <div className="h-40 relative overflow-hidden">
                 <img 
                   src="https://plus.unsplash.com/premium_photo-1682092585257-58d1c813d9b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmdvfGVufDB8fDB8fHww" 
                   alt="Profile" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-orange-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">My Profile</h3>
                <p className="text-sm text-gray-500">Manage account details</p>
              </div>
            </div>
          </Link>

        </div>

      </main>
    </div>
  );
}