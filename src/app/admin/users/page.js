"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  // Fetch users on load
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Role Change
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirmMsg = `Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`;
    
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch("/api/admin/users/update-role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });

      if (res.ok) {
        alert("Role updated successfully!");
        fetchUsers(); // Refresh the list
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update role");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // Handle Export to CSV
  const handleExport = () => {
    const headers = ["Name,Email,Role,Registered Date"];
    const rows = users.map(user => 
      `"${user.name}","${user.email}","${user.role}","${new Date(user.createdAt).toLocaleDateString()}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Stats Logic
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const regularCount = totalUsers - adminCount;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500">View and manage all registered users.</p>
        </div>

        {/* Stats Cards  */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
             
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase">Admin Users</p>
               <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
             
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase">Regular Users</p>
               <p className="text-2xl font-bold text-gray-900">{regularCount}</p>
             </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-800">All Users</h2>
           <div className="flex gap-3">
             <input 
  type="text" 
  placeholder="Search users..." 
  className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500 placeholder-gray-500 text-gray-900"
  onChange={(e) => setSearch(e.target.value)}
/>
             <button onClick={handleExport} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50">
               Export CSV
             </button>
           </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">User</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Email</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Role</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Registered</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-10 text-center text-gray-400">Loading users...</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-gray-700">{user.name}</span>
                  </td>
                  <td className="p-5 text-sm text-gray-500">{user.email}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      user.role === 'admin' 
                      ? "bg-purple-100 text-purple-600" 
                      : "bg-gray-100 text-gray-500"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleRoleChange(user._id, user.role)}
                      className="text-xs font-bold text-blue-500 hover:text-blue-700 underline"
                      disabled={user.email === session?.user?.email} // Disable editing self
                    >
                      {user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                    </button>
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