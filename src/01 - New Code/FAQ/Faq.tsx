import React, { useState } from "react";
import DefaulHeader2 from "../Headers/DefaulHeader2ts";
import MobileMenu from "../Headers/MobileMenuts";
import FooterDefault from "../../components/footer/common-footer/index.jsx";

const Faq = () => {
  const faqData = [
    {
      id: 1,
      question: "What is your refund policy?",
      answer:
        "Our refund policy allows you to request a refund within 30 days of purchase. Please ensure that you meet the eligibility criteria.",
    },
    {
      id: 2,
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through email at support@example.com or call us at (123) 456-7890.",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, PayPal, and various other online payment methods.",
    },
    {
      id: 4,
      question: "Can I upgrade my subscription?",
      answer:
        "Yes, you can upgrade your subscription at any time through your account settings.",
    },
    {
      id: 5,
      question: "Is my data secure?",
      answer:
        "Absolutely. We follow industry-standard security practices to ensure that your data is safe with us.",
    },
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      <DefaulHeader2 />
      <MobileMenu />
      <div className="w-full py-[100px] px-[100px] lg:px-20">
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border rounded-md shadow-md"
              onClick={() => toggleFaq(faq.id)}
            >
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-lg font-bold">
                  {activeFaq === faq.id ? "-" : "+"}
                </span>
              </div>
              {activeFaq === faq.id && (
                <div className="px-4 py-3 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <FooterDefault footerStyle="alternate" />
    </div>
  );
};

export default Faq;
