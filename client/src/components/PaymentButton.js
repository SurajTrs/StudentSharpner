import React, { useState } from "react";

const PaymentButton = ({ course, user }) => {
  const [loading, setLoading] = useState(false);

  const handleBuyNowClick = async () => {
    setLoading(true);
    try {
      // Step 1: Call backend to create the payment order
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          courseId: course.id,
          amount: course.price,
        }),
      });

      const data = await response.json();

      if (data && data.order) {
        // Step 2: Initiate Razorpay Payment Gateway
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: "INR",
          order_id: data.order.id,
          name: "Course Payment",
          description: course.title,
          image: "your_logo_url", // Your logo image for Razorpay modal
          handler: (paymentResponse) => {
            verifyPayment(paymentResponse);
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch("/api/payment/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentResponse),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful! You can now access your course.");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert("Payment verification failed.");
    }
  };

  return (
    <button
      onClick={handleBuyNowClick}
      disabled={loading}
      className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default PaymentButton;
