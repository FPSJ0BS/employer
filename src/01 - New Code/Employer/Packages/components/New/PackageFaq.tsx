import React, { useState } from "react";

const PackageFaq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "What is Tallento?",
      answer:
        "Tallento is a cutting-edge recruitment platform designed to simplify the hiring process. It helps organizations find top talent efficiently through AI-powered tools and intuitive features.",
    },
    {
      question: "Does Tallento support remote hiring?",
      answer:
        "Yes, Tallento supports remote hiring to connect talent from anywhere.",
    },
    {
      question: "What industries does Tallento cater to?",
      answer:
        "Tallento caters to a wide range of industries, including IT, healthcare, manufacturing, and more.",
    },
    {
      question: "Is Tallento customizable for my organization’s needs?",
      answer:
        "Yes, Tallento is fully customizable to meet the unique needs of your organization.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, Tallento provides 24/7 customer support to assist with any issues or questions.",
    },
    {
      question: "How secure is Tallento?",
      answer:
        "Tallento ensures top-notch security measures to protect user data and privacy.",
    },
    {
      question: "Can Tallento handle bulk recruitment?",
      answer:
        "Yes, Tallento is designed to handle bulk recruitment efficiently and seamlessly.",
    },
  ];

  const toggleQuestion = (index) => {
    // Set the clicked question to open or close if it's already open
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`border-none rounded-lg shadow-sm p-4 transition-all ${
              openQuestion === index ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h3
                className={`text-lg font-medium ${
                  openQuestion === index ? "text-red-500" : "text-gray-800"
                }`}
              >
                {faq.question}
              </h3>
              <span
                className={`text-xl transition-transform ${
                  openQuestion === index
                    ? "rotate-45 text-red-500"
                    : "rotate-0 text-gray-800"
                }`}
              >
                {openQuestion === index ? "-" : "+"}
              </span>
            </div>
            {openQuestion === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageFaq;
