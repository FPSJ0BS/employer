import React, { useState } from "react";

const PackagesNew = () => {
  const [activeTab, setActiveTab] = useState("Bundle Plans");

  const tabs = [
    { id: "Bundle Plans", name: "Bundle Plans (Jobs + Database)" },
    { id: "Job posting Plans", name: "Job Posting Plans" },
    { id: "Database Plans", name: "Database Plans" },
  ];

  const plans = {
    "Bundle Plans": [
      {
        duration: "6 Months",
        description: "Best fit for larger hiring needs",
        price: "₹12,000",
        originalPrice: "₹18,000",
        discount: "45% off",
        features: [
          "6 Job Credit",
          "600 Database Credits",
          "Use these Credits in 180 days",
          "AI Assistance Search",
        ],
      },
      {
        duration: "6 Months",
        description: "Best fit for larger hiring needs",
        price: "₹12,000",
        originalPrice: "₹18,000",
        discount: "45% off",
        features: [
          "6 Job Credit",
          "600 Database Credits",
          "Use these Credits in 180 days",
          "AI Assistance Search",
        ],
      },
    ],
    "Job posting Plans": [
      {
        duration: "3 Months",
        description: "Ideal for short-term hiring",
        price: "₹8,000",
        originalPrice: "₹12,000",
        discount: "33% off",
        features: ["3 Job Credit", "No Database Access", "AI Assistance Search"],
      },
    ],
    "Database Plans": [
      {
        duration: "6 Months",
        description: "Access to premium database",
        price: "₹10,000",
        originalPrice: "₹15,000",
        discount: "33% off",
        features: [
          "No Job Credit",
          "600 Database Credits",
          "Use these Credits in 180 days",
        ],
      },
    ],
  };

  return (
    <div className="py-10 w-full">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6 border-b-2 border-solid border-[#d3d3d3] border-t-0 border-l-0 border-r-0 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 border-b-[6px]  border-solid border-t-0 border-r-0 border-l-0 ${
              activeTab === tab.id
                ? "border-red-500  text-red-500 font-bold"
                : "border-gray-300 border-none text-black font-medium"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:space-x-8 justify-center">
        {plans[activeTab]?.map((plan, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-6 max-w-sm text-center"
          >
            <h3 className="text-lg font-semibold">{plan.duration}</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="text-4xl font-bold text-black">
              {plan.price} <span className="text-lg font-normal">/ per month</span>
            </div>
            <div className="text-gray-500 line-through">{plan.originalPrice}</div>
            <div className="text-green-600 font-medium">{plan.discount}</div>
            <button className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Buy Now
            </button>
            <ul className="mt-6 text-left space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="material-icons text-gray-600 mr-2">
                    check_circle
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesNew;
