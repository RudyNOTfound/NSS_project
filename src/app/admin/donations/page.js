"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import { useEffect, useState } from 'react';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    successful: 0,
    pending: 0
  });

  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/admin/donations");
      const data = await res.json();
      
      if (res.ok) {
        setDonations(data.donations);
        calculateStats(data.donations);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);


  const calculateStats = (data) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let total = 0;
    let monthTotal = 0;
    let successCount = 0;
    let pendingCount = 0;

    data.forEach(d => {
      const amount = Number(d.amount) || 0;
      const date = new Date(d.createdAt);

      if (d.status === 'success') {
        total += amount;
        successCount++;
      
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          monthTotal += amount;
        }
      } else if (d.status === 'pending') {
        pendingCount++;
      }
    });

    setStats({
      total,
      thisMonth: monthTotal,
      successful: successCount,
      pending: pendingCount
    });
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'failed':  return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };


  const handleExport = () => {
    const headers = ["Donor Name,Email,Amount,Status,Date,Transaction ID"];
    const rows = donations.map(d => 
      `"${d.name}","${d.email}","${d.amount}","${d.status}","${new Date(d.createdAt).toLocaleDateString()}","${d.paymentId || '-'}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "donations_report.csv";
    link.click();
  };


  const filteredDonations = donations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    (d.paymentId && d.paymentId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
            <p className="text-gray-500">View and manage all financial records.</p>
          </div>
          <button onClick={handleExport} className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50">
            ⬇ Export Report
          </button>
        </div>

     
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl w-fit mb-3"></div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Received</p>
            <p className="text-2xl font-bold text-gray-900">₹{stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit mb-3"></div>
            <p className="text-xs font-bold text-gray-400 uppercase">This Month</p>
            <p className="text-2xl font-bold text-gray-900">₹{stats.thisMonth.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl w-fit mb-3"></div>
            <p className="text-xs font-bold text-gray-400 uppercase">Successful</p>
            <p className="text-2xl font-bold text-gray-900">{stats.successful}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl w-fit mb-3"></div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
        </div>

     
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-800">All Donations</h2>
           <div className="w-64">
             <input 
               type="text" 
               placeholder="Search donor or ID..." 
               className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500 placeholder-gray-500 text-gray-900"
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
        </div>

     
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Donor</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Amount</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Date</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Transaction ID</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-10 text-center text-gray-400">Loading financial data...</td></tr>
              ) : filteredDonations.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                        {d.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{d.name}</p>
                        <p className="text-xs text-gray-400">{d.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-gray-900">₹{d.amount}</td>
                  <td className="p-5 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="p-5 text-xs font-mono text-gray-400">
                    {d.paymentId ? d.paymentId.substring(0, 16) + "..." : "---"}
                  </td>
                  <td className="p-5 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(d.status)}`}>
                      {d.status}
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