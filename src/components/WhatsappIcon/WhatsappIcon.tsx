import { WhatsApp } from "@mui/icons-material";
import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "9728987999"; 
  const message = "Hello, I have a query."; 

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="z-50 fixed bottom-4 right-4 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <WhatsApp />
    </a>
  );
};

export default WhatsAppButton;
