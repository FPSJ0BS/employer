import { BadgeCheck } from "lucide-react";
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
      {
        duration: "8 Months",
        description: "Best fit for larger hiring needs",
        price: "₹16,000",
        originalPrice: "₹20,000",
        discount: "45% off",
        features: [
          "10 Job Credit",
          "1000 Database Credits",
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
        features: [
          "3 Job Credit",
          "No Database Access",
          "AI Assistance Search",
        ],
      },
      {
        duration: "3 Months",
        description: "Ideal for short-term hiring",
        price: "₹8,000",
        originalPrice: "₹12,000",
        discount: "33% off",
        features: [
          "3 Job Credit",
          "No Database Access",
          "AI Assistance Search",
        ],
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
    <div className="pb-5 w-full">
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
      <div className=" grid grid-cols-2 gap-4 lg:grid-cols-3 justify-content-center w-full ">
        {plans[activeTab]?.map((plan, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-6 w-full text-center"
          >
            <h3 className="text-lg text-start font-semibold">
              {plan.duration}
            </h3>
            <p className="text-gray-600 mb-4 text-start">{plan.description}</p>
            <div className="text-[40px] font-bold text-black flex justify-start items-start gap-0">
              {plan.price}{" "}
              <span className="text-lg font-normal">/ per month</span>
            </div>
            <div className=" flex items-start gap-2 mt-3">
              <p className="text-gray-500 line-through text-start">
                {plan.originalPrice}{" "}
              </p>
              <p className="text-green-600 font-medium bg-[#ade5d5] rounded-[30px] px-3">{plan.discount}</p>
            </div>
            <button className="mt-6 bg-[#c94f56] w-full text-white py-2 px-4 rounded-xl hover:bg-[#c94f56]">
              Buy Now
            </button>
            <ul className="mt-6 text-start space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <BadgeCheck />
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
