import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { doGetJobTypes } from "../../../../../api/apiAxios";

const Benefits = ({
  selectedBenefits,
  setSelectedBenefits,
  customBenefits,
  setCustomBenefits,
}) => {
  const [searchText, setSearchText] = useState("");
  const [dummyData, setDummyData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await doGetJobTypes();

        if (res?.status) {
          setDummyData(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, []);

  const allBenefits = [
    ...dummyData,
    ...customBenefits.map((benefit, index) => ({
      id: `custom-${index}`,
      title: benefit,
    })),
  ];

  const handleChipClick = (benefit) => {
    if (selectedBenefits.some((b) => b.id === benefit.id)) {
      setSelectedBenefits((prev) =>
        prev.filter((selected) => selected.id !== benefit.id)
      );

      handleRemoveChip(benefit.id);
    } else {
      setSelectedBenefits((prev) => [...prev, benefit]);
    }
  };

  const handleAddCustomBenefit = () => {
    setShowAll(true);
    if (searchText.trim() !== "") {
      setCustomBenefits((prev) => [searchText.trim(), ...prev]);
      setSelectedBenefits((prev) => [
        { id: `custom-${customBenefits.length}`, title: searchText.trim() },
        ...prev,
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
      setSelectedBenefits((prev) =>
        prev.filter((benefit) => benefit.id !== benefitId)
      );
    }
  };

  return (
    <div className="py-2">
      {/* Chips Display */}
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {(showAll ? allBenefits : allBenefits.slice(0, 20)).map((benefit) => {
          const isSelected = selectedBenefits.some((b) => b.id === benefit.id);
          return (
            <div
              key={benefit.id}
              onClick={() => {
                handleChipClick(benefit);
              }}
              className={`cursor-pointer px-3 py-1 rounded-[30px] flex items-center justify-between ${
                isSelected
                  ? "bg-[#a6bedb] border-2 border-gray-400 border-solid text-black font-semibold"
                  : "bg-white border-2 border-gray-400 border-solid text-black font-semibold"
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

      {allBenefits.length > 20 && (
        <div className="mt-4 text-start">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 py-0 bg-[#4a4e69] text-white rounded-md hover:bg-[##4a4e69] focus:outline-none"
          >
            {showAll ? "Show Less" : "Show All Benefits"}
          </button>
        </div>
      )}

      {/* Input Field */}
      <div className="mt-3">
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

export default Benefits;
