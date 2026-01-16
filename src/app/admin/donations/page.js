"use client";
import AdminSidebar from '../../../components/AdminSidebar';

export default function ManageDonations() {
  const donations = [
    { name: "Sarah Johnson", amount: "$150", date: "May 15, 2024", id: "TXN-D1", status: "Success", initial: "SJ" },
    { name: "Michael Chen", amount: "$75", date: "May 14, 2024", id: "TXN-D2", status: "Success", initial: "MC" },
    { name: "Emily Rodriguez", amount: "$200", date: "May 13, 2024", id: "TXN-D3", status: "Pending", initial: "ER" },
    { name: "David Kim", amount: "$50", date: "May 12, 2024", id: "TXN-D4", status: "Success", initial: "DK" },
    { name: "Sarah Johnson", amount: "$100", date: "May 10, 2024", id: "TXN-D5", status: "Success", initial: "SJ" },
    { name: "Robert Taylor", amount: "$250", date: "May 8, 2024", id: "TXN-D6", status: "Failed", initial: "RT" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
            <p className="text-gray-500">View and manage all donations.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white">
            📥 Export Report
          </button>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Received', value: '$1,065', icon: '💰', color: 'bg-purple-50 text-purple-600' },
            { label: 'This Month', value: '$640', icon: '📈', color: 'bg-blue-50 text-blue-600' },
            { label: 'Successful', value: '8', icon: '✅', color: 'bg-green-50 text-green-600' },
            { label: 'Pending', value: '1', icon: '🕒', color: 'bg-orange-50 text-orange-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</span>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* DONATIONS TABLE */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-purple-500">$</span> All Donations
            </h3>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search donations..." 
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
                <th className="px-8 py-4">Donor</th>
                <th className="px-8 py-4 text-center">Amount</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Transaction ID</th>
                <th className="px-8 py-4 text-right pr-12">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {row.initial}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-900 text-center">{row.amount}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{row.date}</td>
                  <td className="px-8 py-5 text-xs text-gray-400 font-mono">{row.id}</td>
                  <td className="px-8 py-5 text-right pr-12">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                      row.status === 'Success' ? 'bg-green-100 text-green-600' : 
                      row.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      ● {row.status}
                    </span>
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