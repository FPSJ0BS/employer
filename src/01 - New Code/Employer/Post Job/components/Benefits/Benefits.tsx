import React, { useEffect, useRef, useState } from "react";

const Benefits = () => {
  const dummyData = [
    { id: 1, name: "Health Insurance" },
    { id: 2, name: "Paid Leave" },
    { id: 3, name: "Flexible Hours" },
    { id: 4, name: "Remote Work" },
    { id: 5, name: "Gym Membership" },
  ];

  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  console.log('selectedBenefitsselectedBenefits',selectedBenefits);

  const filteredData = dummyData.filter(
    (item) =>
      !selectedBenefits.some((benefit) => benefit.id === item.id) &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (benefit) => {
    setSelectedBenefits((prev) => [...prev, benefit]);
    setSearchText(""); // Clear search after selection
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleRemove = (id) => {
    setSelectedBenefits((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDropdownFocus = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="p-4">
      {/* Dropdown Trigger */}
      <div className="relative w-full">
        <div
          className="px-3 py-2 border rounded-md cursor-pointer bg-white focus:ring-2 focus:ring-blue-400"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          {dropdownOpen ? "Close Benefits" : "Select Benefits"}
        </div>

        {/* Dropdown List */}
        {dropdownOpen && (
          <div
            className="absolute mt-1 w-full border rounded-md shadow-md bg-white max-h-40 overflow-y-auto z-10"
            onFocus={handleDropdownFocus}
            onMouseDown={handleDropdownFocus} // Prevent dropdown close on click inside
          >
            <input
              type="text"
              placeholder="Search benefits..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-3 py-2 border-b focus:outline-none"
            />
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No options available</div>
            )}
          </div>
        )}
      </div>

      {/* Selected Benefits as Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedBenefits.map((benefit) => (
          <div
            key={benefit.id}
            className=" px-2 text-white rounded-lg py-2 bg-blue-500"
          >
            {benefit.name}
            <button
              onClick={() => handleRemove(benefit.id)}
              className="ml-2 text-[20px] text-red-500 hover:text-red-700"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
