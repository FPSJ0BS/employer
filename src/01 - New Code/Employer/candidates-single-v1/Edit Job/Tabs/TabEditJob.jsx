import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Questions } from '../../components/questions';
import { CandidatesApplied } from '../Candidates/Candidates';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { SuggestedProfile } from '../Candidates/SuggestedProfile';

export default function TabsEditJob({ screenignQuestions, desc }) {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box className=" w-[920px] sm:w-[950px]">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                className="font-semibold"
                label="Applied Candidates"
                value="1"
              />
              <Tab
                className="font-semibold"
                label="Job Description"
                value="2"
              />
            
              {/* <Tab className='font-semibold' label="Screening Questions" value="2" /> */}
            </TabList>
          </Box>
          <TabPanel value="2">
            <div id="descEditJob">{desc}</div>
          </TabPanel>
          <TabPanel value="1">
            <CandidatesApplied />
          </TabPanel>
          
          {/* <TabPanel value="2"><Questions screenignQuestions={screenignQuestions} /></TabPanel> */}
        </TabContext>
      </Box>
    );
}

TabsEditJob.propTypes = {
    applicationsArray: PropTypes.array.isRequired,
    screenignQuestions: PropTypes.array.isRequired,
    desc: PropTypes.array.isRequired,
};