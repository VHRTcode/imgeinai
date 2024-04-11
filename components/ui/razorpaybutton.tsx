"use client"

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");
    
    if (!rzpPaymentForm?.hasChildNodes()) {

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_NxM5boLBDt0wSe";
      rzpPaymentForm?.appendChild(script);

    }

  });

  return (
    <div className="App">
      
      <form id="rzp_payment_form"></form>
      
    </div>
  );
}