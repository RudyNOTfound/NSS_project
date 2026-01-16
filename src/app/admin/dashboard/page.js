"use client";
import AdminSidebar from '../../../components/AdminSidebar';

export default function AdminDashboard() {
  const recentUsers = [
    { name: "Sarah Johnson", email: "sarah.j@email.com", role: "User", initial: "SJ" },
    { name: "Michael Chen", email: "michael.c@email.com", role: "User", initial: "MC" },
    { name: "Emily Rodriguez", email: "emily.r@email.com", role: "User", initial: "ER" },
    { name: "David Kim", email: "david.k@email.com", role: "User", initial: "DK" },
    { name: "Jessica Williams", email: "jessica.w@email.com", role: "Admin", initial: "JW" },
  ];

  const recentDonations = [
    { name: "Sarah Johnson", date: "May 15", amount: "$150", status: "success" },
    { name: "Michael Chen", date: "May 14", amount: "$75", status: "success" },
    { name: "Emily Rodriguez", date: "May 13", amount: "$200", status: "pending" },
    { name: "David Kim", date: "May 12", amount: "$50", status: "success" },
    { name: "Sarah Johnson", date: "May 10", amount: "$100", status: "success" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Monitor registrations and donations at a glance.</p>
        </header>

        {/* ADMIN SUMMARY CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Registrations', value: '8', change: '+18% from last month', icon: 'bg-purple-50' },
            { label: 'Total Donations', value: '$1,065', change: '+24% from last month', icon: 'bg-purple-50' },
            { label: 'This Month', value: '$640', trend: '📈', icon: 'bg-purple-100 text-purple-600' },
            { label: 'Pending', value: '1', trend: '🕒', icon: 'bg-orange-100 text-orange-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                {stat.trend && <span className={`p-2 rounded-lg text-xs ${stat.icon}`}>{stat.trend}</span>}
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              {stat.change && <p className="text-[10px] text-gray-400 mt-2">{stat.change}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* RECENT USERS SECTION */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">8 total</span>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {user.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      <p className="text-[10px] text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${user.role === 'Admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-purple-600 text-sm font-bold hover:underline">View all users ↗</button>
          </div>

          {/* RECENT DONATIONS SECTION */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Recent Donations</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">10 total</span>
            </div>
            <div className="space-y-4">
              {recentDonations.map((donation, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${donation.status === 'success' ? 'bg-pink-100 text-pink-500' : 'bg-orange-100 text-orange-500'}`}>
                      {donation.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{donation.name}</p>
                      <p className="text-[10px] text-gray-400">{donation.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-800">{donation.amount}</p>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase flex items-center gap-1 ${donation.status === 'success' ? 'text-green-500 bg-green-50' : 'text-orange-500 bg-orange-50'}`}>
                      ● {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-purple-600 text-sm font-bold hover:underline">View all donations ↗</button>
          </div>
        </div>
      </main>
    </div>
  );
}