import React from 'react';

export const JobsDropDown = ({ packageOptions, onJobSelect }) => {
  const handleChange = (event) => {
    onJobSelect(event.target.value);
  };

  return (
    <div className="flex items-center gap-2 ">
      <select className="w-full  py-1 px-2 border rounded postjobHandleScrollbar" onChange={handleChange}>
        {packageOptions.map((option) => (
          <option className=' ' key={option.jobs} value={option.jobs}>
            {option.jobs} {`${option.jobs === 1 ? "Job" : "Jobs"} `}
          </option>
        ))}
      </select>
    </div>
  );
};
