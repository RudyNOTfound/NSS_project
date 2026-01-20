"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";


function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const donationId = searchParams.get("donation_id");

  useEffect(() => {
    if (donationId) {
      fetch("/api/cancel-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationId }),
      });
    }
  }, [donationId]);

  return (
    <main className="flex-1 ml-64 p-10 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg border-2 border-red-50">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">
          You cancelled the payment process. No charges were made.
        </p>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => router.push("/user/history")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Check History
          </button>
          <button 
            onClick={() => router.push("/user/donate")}
            className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition shadow-lg shadow-pink-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}


export default function CancelPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <CancelContent />
      </Suspense>
    </div>
  );
}