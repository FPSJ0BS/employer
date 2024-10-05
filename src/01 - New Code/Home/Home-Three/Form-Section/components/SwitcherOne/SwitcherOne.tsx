import React from 'react';

interface SwitcherOneProps {
  isRecruitmentSelected: boolean;
  handleRecruitmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isJobOpportunitiesSelected: boolean;
  handleJobOpportunitiesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitcherOne: React.FC<SwitcherOneProps> = ({
  isRecruitmentSelected,
  handleRecruitmentChange,
  isJobOpportunitiesSelected,
  handleJobOpportunitiesChange
}) => {
  return (
    <div className="pb-2">
      <p>I'm looking for</p>

      <div className="w-full flex gap-4">
        <div className="flex items-center cursor-pointer">
          <label className="flex items-center cursor-pointer font-normal leading-[1.2em]">
            <input
              className="mr-2 cursor-pointer"
              type="radio"
              value="recruitment"
              checked={isRecruitmentSelected}
              onChange={handleRecruitmentChange}
            />
            Recruitment Solutions
          </label>
        </div>

        <div className="flex items-center cursor-pointer">
          <label className="flex items-center cursor-pointer font-normal leading-[1.2em]">
            <input
              className="mr-2 cursor-pointer"
              type="radio"
              value="jobOpportunities"
              checked={isJobOpportunitiesSelected}
              onChange={handleJobOpportunitiesChange}
            />
            Job Opportunities
          </label>
        </div>
      </div>
    </div>
  );
};

export default SwitcherOne;
