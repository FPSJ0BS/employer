import React, { useEffect, useState } from "react";
import { doGetJobTypes } from "../../../../../api/apiAxios";
import { X } from "lucide-react";

const EditBenefits = ({
  selectedBenefits,
  setSelectedBenefits,
  customBenefits,
  setCustomBenefits,
  jobData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [dummyData, setDummyData] = useState([]);

  console.log('jobDatajobData',jobData);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await doGetJobTypes();
        if (res?.status) {
          setDummyData(res?.data?.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    if (dummyData.length > 0 && jobData?.benefits?.length > 0) {
      // Match jobData benefits with dummyData
      const matchedBenefits = dummyData.filter((benefit) =>
        jobData.benefits.includes(benefit.title)
      );

      // Add unmatched benefits as custom
      const unmatchedBenefits = jobData.benefits
        .filter(
          (benefitTitle) =>
            !dummyData.some((dummy) => dummy.title === benefitTitle)
        )
        .map((title, index) => ({
          id: `custom-${customBenefits.length + index}`,
          title,
        }));

      // Combine matched and unmatched benefits, ensuring no duplicates
      const uniqueSelectedBenefits = [
        ...new Map(
          [...matchedBenefits, ...unmatchedBenefits].map((item) => [
            item.title,
            item,
          ])
        ).values(),
      ];

      setSelectedBenefits(uniqueSelectedBenefits);

      // Add unmatched benefits to customBenefits
      setCustomBenefits((prev) => [
        ...new Set([...prev, ...unmatchedBenefits.map((b) => b.title)]),
      ]);
    }
  }, [dummyData, jobData, setSelectedBenefits, setCustomBenefits]);

  const allBenefits = [
    ...new Map(
      [
        ...dummyData,
        ...selectedBenefits,
        ...customBenefits.map((benefit, index) => ({
          id: `custom-${index}`,
          title: benefit,
        })),
      ].map((item) => [item.title, item])
    ).values(),
  ];

  const handleChipClick = (benefit) => {
    if (selectedBenefits.some((b) => b.id === benefit.id)) {
      setSelectedBenefits((prev) =>
        prev.filter((selected) => selected.id !== benefit.id)
      );
    } else {
      setSelectedBenefits((prev) => [
        ...new Map([...prev, benefit].map((item) => [item.title, item])).values(),
      ]);
    }
  };

  const handleAddCustomBenefit = () => {
    if (searchText.trim() !== "") {
      const newBenefit = { id: `custom-${customBenefits.length}`, title: searchText.trim() };

      setCustomBenefits((prev) => [...prev, searchText.trim()]);
      setSelectedBenefits((prev) => [
        ...new Map([...prev, newBenefit].map((item) => [item.title, item]))
          .values(),
      ]);
      setSearchText("");
    }
  };

  const handleRemoveChip = (benefitId) => {
    setSelectedBenefits((prev) =>
      prev.filter((benefit) => benefit.id !== benefitId)
    );

    if (benefitId.startsWith("custom-")) {
      const index = parseInt(benefitId.split("-")[1], 10);
      setCustomBenefits((prev) => prev.filter((_, i) => i !== index));
    }
  };

  console.log('allBenefitsallBenefits',allBenefits);

  return (
    <div className="py-4">
      {/* Chips Display */}
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {allBenefits.map((benefit) => {
          const isSelected = selectedBenefits.some((b) => b.id === benefit.id);
          return (
            <div
              key={benefit.id}
              onClick={() => handleChipClick(benefit)}
              className={`cursor-pointer px-3 py-0 border-2 border-solid rounded-[30px] flex items-center justify-between ${
                isSelected
                  ? "bg-[#d6ccc2] border-2 border-gray-400 text-black font-semibold"
                  : "bg-white border-2 border-gray-400 text-black font-semibold"
              }`}
            >
              {benefit.title}
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(benefit.id);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Field */}
      <div className="mt-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustomBenefit();
            }
          }}
          placeholder="Add a benefit and press Enter..."
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default EditBenefits;
