"use client";
import Sidebar from '../../../components/Sidebar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalCount: 0,
    lastDonationDate: "N/A"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/donations/history");
        const data = await res.json();

        if (res.ok && data.donations) {
          const successDonations = data.donations.filter(d => d.status === 'success');
          
          const total = successDonations.reduce((sum, d) => sum + Number(d.amount), 0);
          const lastDate = successDonations.length > 0 
            ? new Date(successDonations[0].createdAt).toLocaleDateString() 
            : "No donations yet";

          setStats({
            totalAmount: total,
            totalCount: successDonations.length,
            lastDonationDate: lastDate
          });
        }
      } catch (error) {
        console.error("Error fetching profile stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchStats();
  }, [session]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 flex flex-col">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your account and view your impact.</p>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-50 to-transparent"></div>

            <div className="relative z-10">
              
              <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center text-4xl font-bold text-pink-600 mb-6 mx-auto shadow-inner border-4 border-white">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {session?.user?.name || "Guest User"}
              </h2>
              <p className="text-gray-500 mb-6">{session?.user?.email || "No email"}</p>

              <div className="bg-pink-50 text-pink-700 px-6 py-2 rounded-full font-bold text-sm inline-block">
                 Verfied Donor
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
             
             <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-purple-50 to-transparent"></div>

             <div className="relative z-10 w-full">
                <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-8">
                  Lifetime Impact
                </h3>

                <div className="grid grid-cols-1 gap-8">
                  
                  
                  <div>
                    <p className="text-6xl font-extrabold text-gray-900 mb-2">
                      
₹{stats.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-500 font-medium">Total Donated</p>
                  </div>

                  <div className="w-full h-px bg-gray-100 my-2"></div>

                  
                  <div className="flex justify-center gap-12">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">{stats.totalCount}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase mt-1">Donations</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-600">
                        <span suppressHydrationWarning>{stats.lastDonationDate}</span>
                      </p>
                      <p className="text-xs text-gray-400 font-bold uppercase mt-1">Last Active</p>
                    </div>
                  </div>

                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}