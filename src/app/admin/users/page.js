"use client";
import AdminSidebar from '../../../components/AdminSidebar';

export default function ManageUsers() {
  const users = [
    { name: "Sarah Johnson", email: "sarah.j@email.com", role: "User", date: "Jan 15, 2024", initial: "SJ" },
    { name: "Michael Chen", email: "michael.c@email.com", role: "User", date: "Feb 20, 2024", initial: "MC" },
    { name: "Emily Rodriguez", email: "emily.r@email.com", role: "User", date: "Mar 8, 2024", initial: "ER" },
    { name: "David Kim", email: "david.k@email.com", role: "User", date: "Mar 22, 2024", initial: "DK" },
    { name: "Jessica Williams", email: "jessica.w@email.com", role: "Admin", date: "Jan 5, 2024", initial: "JW" },
    { name: "Robert Taylor", email: "robert.t@email.com", role: "User", date: "Apr 10, 2024", initial: "RT" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500">View and manage all registered users.</p>
        </header>

        {/* USER STATS CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Users', value: '8', icon: '👤', color: 'bg-purple-50 text-purple-600' },
            { label: 'Admin Users', value: '1', icon: '🔑', color: 'bg-pink-50 text-pink-600' },
            { label: 'Regular Users', value: '7', icon: '👥', color: 'bg-green-50 text-green-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ALL USERS TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-purple-500 text-lg">👥</span> All Users
            </h3>
            
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-xs border-none focus:ring-1 focus:ring-purple-500 outline-none w-64"
                />
              </div>
              <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-xs font-bold text-gray-500">⏳ Filter</span>
              </button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Email</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Registered</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {user.initial}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">{user.email}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
                      user.role === 'Admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-400">{user.date}</td>
                  <td className="px-8 py-5 text-center">
                    <button className="text-gray-400 hover:text-gray-800 font-bold">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}