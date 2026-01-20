"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";


function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const donationId = searchParams.get("donation_id");
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (donationId && sessionId) {
      
      fetch("/api/confirm-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationId, sessionId }),
      })
        .then((res) => {
          if (res.ok) setStatus("success");
          else setStatus("error");
        })
        .catch(() => setStatus("error"));
    }
  }, [donationId, sessionId]);

  return (
    <main className="flex-1 ml-64 p-10 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg border-2 border-green-50">
        
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Verifying your donation...</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-500 mb-8">
              Your donation was successful. Your support helps us make a real difference!
            </p>
            <button 
              onClick={() => router.push("/user/dashboard")}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200"
            >
              Back to Dashboard
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-500 mb-6">We couldn't verify your payment. Please check your history or contact support.</p>
            <button onClick={() => router.push("/user/donate")} className="text-purple-600 font-bold">Try Again</button>
          </>
        )}
      </div>
    </main>
  );
}


export default function SuccessPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 animate-pulse">Loading...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}