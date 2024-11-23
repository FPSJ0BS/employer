import React, { useState } from "react";

const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start).map(
    (value) => (value < 10 ? `0${value}` : `${value}`)
  );
};

export const OtherShiftTiming = () => {
  const [startTime, setStartTime] = useState({ hour: "", minute: "" });
  const [endTime, setEndTime] = useState({ hour: "", minute: "" });

  const hours = generateOptions(0, 23); // 0-23 for hours
  const minutes = generateOptions(0, 59); // 0-59 for minutes

  const handleTimeChange = (
    type: "startTime" | "endTime",
    field: "hour" | "minute",
    value: string
  ) => {
    if (type === "startTime") {
      setStartTime((prev) => ({ ...prev, [field]: value }));
    } else {
      setEndTime((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className=" w-[100%]  flex gap-4 col-span-2 sm:col-span-2">
      {/* Start Time */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="startTime"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Office Start Time *
        </label>
        <div className="flex items-center gap-2">
          <select
            className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none"
            value={startTime.hour}
            onChange={(e) => handleTimeChange("startTime", "hour", e.target.value)}
          >
            <option value="" disabled>
              HH
            </option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span className="text-lg font-semibold">:</span>
          <select
            className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none"
            value={startTime.minute}
            onChange={(e) =>
              handleTimeChange("startTime", "minute", e.target.value)
            }
          >
            <option value="" disabled>
              MM
            </option>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="endTime"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Office End Time *
        </label>
        <div className="flex items-center gap-2">
          <select
            className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none"
            value={endTime.hour}
            onChange={(e) => handleTimeChange("endTime", "hour", e.target.value)}
          >
            <option value="" disabled>
              HH
            </option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span className="text-lg font-semibold">:</span>
          <select
            className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none"
            value={endTime.minute}
            onChange={(e) =>
              handleTimeChange("endTime", "minute", e.target.value)
            }
          >
            <option value="" disabled>
              MM
            </option>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Selected Times */}
      {/* <div className="mt-4">
        <h4 className="text-gray-700 font-medium">Selected Times:</h4>
        <p>
          Start Time:{" "}
          {startTime.hour && startTime.minute
            ? `${startTime.hour}:${startTime.minute}`
            : "Not set"}
        </p>
        <p>
          End Time:{" "}
          {endTime.hour && endTime.minute
            ? `${endTime.hour}:${endTime.minute}`
            : "Not set"}
        </p>
      </div> */}
    </div>
  );
};
