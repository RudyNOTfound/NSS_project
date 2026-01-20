"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react"; 

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'OVERVIEW', href: '/admin/overview'},
    { name: 'DASHBOARD', href: '/admin/dashboard'},
    { name: 'USERS', href: '/admin/users'},
    { name: 'DONATIONS', href: '/admin/donations' },
  ];

  return (
    <aside className="w-64 bg-[#0f111a] text-white p-6 flex flex-col fixed h-full shadow-xl z-50">
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-purple-500 p-2 rounded-lg font-bold text-white">❤</div>
        <span className="text-xl font-bold tracking-tight">NSS_PROJECT</span>
      </div>
      
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                isActive 
                ? "bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}>
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      
      <button 
        onClick={() => signOut({ callbackUrl: "/" })} 
        className="text-gray-400 hover:text-red-400 mt-auto flex items-center gap-2 p-3 border-t border-white/10 pt-6 group w-full text-left"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Logout
      </button>
    </aside>
  );
}