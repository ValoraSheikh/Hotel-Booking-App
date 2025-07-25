"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Status = "checking" | "success" | "failed" | "not-found";

export default function CheckStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");

  const merchantOrderId = searchParams.get("merchantOrderId");
  const bookingId = searchParams.get("bookingId");
  

  useEffect(() => {
    if (!merchantOrderId || !bookingId) {
      setStatus("not-found");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `/api/payment/status?merchantOrderId=${merchantOrderId}&bookingId=${bookingId}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Unknown error");

        const paymentStatus = data.paymentStatus; // assuming 'success' | 'failed' | 'pending'

        console.log("➡️ Returning status:", paymentStatus);

        if (paymentStatus === "success") {
          setStatus("success");
          setTimeout(() => router.push("/bookings"), 3000);
        } else if (paymentStatus === "failed") {
          setStatus("failed");
        } else {
          setStatus("checking"); // still pending, maybe poll or refresh manually
        }
      } catch (err) {
        console.error("Error checking status:", err);
        setStatus("failed");
      }
    };

    checkStatus();
  }, [merchantOrderId, router, bookingId]);

  const getStatusMessage = () => {
    switch (status) {
      case "checking":
        return "⏳ Checking payment status...";
      case "success":
        return "✅ Payment successful! Redirecting to your bookings...";
      case "failed":
        return "❌ Payment failed. Please try again.";
      case "not-found":
        return "⚠️ Invalid or missing merchantOrderId.";
      default:
        return "Something went wrong.";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Payment Status</h1>
        <p className="text-lg">{getStatusMessage()}</p>
        {status === "failed" && (
          <button
            onClick={() => router.push("/bookings")}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Go to Bookings
          </button>
        )}
      </div>
    </div>
  );
}
