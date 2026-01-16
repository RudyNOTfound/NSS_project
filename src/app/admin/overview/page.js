"use client";
import AdminSidebar from '../../../components/AdminSidebar';

export default function AdminOverview() {
  const recentDonations = [
    { name: "Mike Johnson", date: "2026-01-12", amount: "7,422", status: "SUCCESSFUL" },
    { name: "John Doe", date: "2026-01-11", amount: "9,901", status: "FAILED" },
    { name: "John Doe", date: "2026-01-07", amount: "8,263", status: "SUCCESSFUL" },
  ];

  const statusStats = [
    { label: "Successful", count: 9, color: "bg-green-500", percentage: "75%" },
    { label: "Pending", count: 4, color: "bg-yellow-500", percentage: "40%" },
    { label: "Failed", count: 2, color: "bg-red-500", percentage: "20%" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of your donation platform</p>
        </header>

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '6' },
            { label: 'Total Donations', value: '50,238' },
            { label: 'Successful', value: '9' },
            { label: 'Failed', value: '2' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* RECENT DONATIONS LIST */}
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold text-gray-800 text-lg">Recent Donations</h3>
              <button className="text-green-500 text-sm font-bold hover:underline">View All</button>
            </div>
            {recentDonations.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 mb-2">{item.amount}</p>
                  <span className={`text-[9px] px-2 py-1 rounded-full font-bold border ${
                    item.status === 'SUCCESSFUL' ? 'text-green-500 border-green-200 bg-green-50' : 'text-red-500 border-red-200 bg-red-50'
                  }`}>
                    ● {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DONATION STATUS PROGRESS BARS */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-gray-800 mb-8">Donation Status</h3>
            <div className="space-y-8">
              {statusStats.map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${stat.color}`}></span>
                      {stat.label}
                    </p>
                    <span className="text-sm font-bold text-gray-800">{stat.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${stat.color} h-full rounded-full transition-all duration-1000`} 
                      style={{ width: stat.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}