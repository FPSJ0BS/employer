import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabOne from "./Tabs Section/tabOne.tsx"

export default function Tabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className=' text-black font-semibold' label="Overview" value="1" />
            <Tab className=' text-black font-semibold' label="Why Join Us?" value="2" />
            <Tab className=' text-black font-semibold' label="Jobs" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className=' min-h-[500px] flex gap-2 '>
            
          <TabOne />
           

        </TabPanel>
        <TabPanel value="2" className=' min-h-[500px]'>Item Two</TabPanel>
        <TabPanel value="3" className=' min-h-[500px]'>Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
