import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import PeopleIcon from '../../../../../public/assets/icons/group.png'
import AcceptedApplications from '../../../../../public/assets/icons/features.png'
import ClosedJobs from '../../../../../public/assets/icons/close.png'
import InterviewScheduled from '../../../../../public/assets/icons/calendar.png'
import OpenJobs from '../../../../../public/assets/icons/dismiss.png'
import PendingApplications from '../../../../../public/assets/icons/file.png'
import RejectedApplications from '../../../../../public/assets/icons/rejected.png'
import TotalApplications from '../../../../../public/assets/icons/all.png'
import TotalJobs from '../../../../../public/assets/icons/candidates.png'
import { getProfile } from "../../../../api/apiAxios";
import { Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopCardBlock = ({ topBLock }) => {

  const [nameEmp, setNameEmp] = useState('')
  const navigate = useNavigate()


  // const { data } = useGetDashboardQuery(authorizationToken);
  const [data, setData] = useState([])

  useEffect(() => {

    setData(topBLock)

   
  }, [topBLock])

  useEffect(() => {

    const fetchApi = async () => {
      try {
        const res = await getProfile()
        if (res?.data?.status) {
         
          const employerName = await res?.data?.data?.employerDetails[0]?.contact_person_name
          await setNameEmp(employerName)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchApi()


  }, [])

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    
      const date = new Date();
      const hours = date.getHours();
    
      let newGreeting = '';
      if (hours >= 8 && hours < 12) {
        newGreeting = 'Good Morning';
      } else if (hours >= 12 && hours < 17) {
        newGreeting = 'Good Afternoon';
      } else if (hours >= 17 && hours < 20) {
        newGreeting = 'Good Evening';
      } else {
        newGreeting = 'Hello';
      }

      setGreeting(newGreeting);


   
  }, []);


  const cardContent = [
    {
      id: 1,
      icon: <img className=" h-[50px] w-[50px]" src={AcceptedApplications} />,
      countNumber: data?.acceptedApplication === null ? 0 : data?.acceptedApplication,
      metaName: "Accepted Applications",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: <img className=" h-[50px] w-[50px]" src={ClosedJobs} />,
      countNumber: data?.closedJobs === null ? 0 : data?.closedJobs,
      metaName: "Closed Jobs",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: <img className=" h-[50px] w-[50px]" src={PeopleIcon} />,
      countNumber: data?.hiredCandidate === null ? 0 : data?.hiredCandidate,
      metaName: "Hired Candidate",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: <img className=" h-[50px] w-[50px]" src={InterviewScheduled} />,
      countNumber: data?.totalJobs === null ? 0 : data?.totalJobs,
      metaName: (
        <>
          Interview Scheduled
        </>
      ),
      uiClass: "ui-green",
    },
    {
      id: 5,
      icon: <img className=" h-[50px] w-[50px]" src={OpenJobs} />,
      countNumber: data?.openJobs === null ? 0 : data?.openJobs,
      metaName: "Open Jobs",
      uiClass: "ui-green",
    },
    {
      id: 6,
      icon: <img className=" h-[50px] w-[50px]" src={PendingApplications} />,
      countNumber: data?.pendingAplication === null ? 0 : data?.pendingAplication,
      metaName: (
        <>
          Pending Applications
        </>
      ),
      uiClass: "ui-green",
    },
    {
      id: 7,
      icon: <img className=" h-[50px] w-[50px]" src={RejectedApplications} />,
      countNumber: data?.rejectedApplication === null ? 0 : data?.rejectedApplication,
      metaName: (
        <>
          Rejected Applications
        </>
      ),
      uiClass: "ui-green",
    },

    {
      id: 8,
      icon: <img className=" h-[50px] w-[50px]" src={TotalApplications} />,
      countNumber: data?.totalApplication === null ? 0 : data?.totalApplication,
      metaName: "Total Applications",
      uiClass: "ui-green",
    },
    {
      id: 9,
      icon: <img className=" h-[50px] w-[50px]" src={TotalJobs} />,
      countNumber: data?.totalJobs === null ? 0 : data?.totalJobs,
      metaName: "Total Jobs",
      uiClass: "ui-green",
    },
  ];

  return (
    <div className="row px-4 my-4 rounded-xl flex items-center justify-start">

      <div className="w-[100%]  h-[250px] my-[20px]">
        <div className="w-[100%] h-[30%] bg-white flex justify-between items-center px-[30px]">

          <div className="w-[90%] text-[#438e76] text-[22px]">
            <h2 className="flex justify-start items-start gap-0 text-[#438e76] "><Sun className=" w-[50px]"/>{greeting},<span className=" capitalize ">&nbsp;{ nameEmp}!</span></h2>
          </div>

          <div className="w-[10%]">
            <div className='text-[#458d76] hover:text-white cursor-pointer w-[100%] border-1 border-solid border-[#458d76] hover:bg-[#458d76] rounded-[6px] h-[30px] flex justify-center items-center gap-2'>


              <h3 onClick={() => navigate('/employers-dashboard/post-jobs')} className=' font-semibold '>Post Job</h3>

            </div>
          </div>

        </div>
        <div className="h-[70%] w-[100%] bg-[#f4fbfb] flex">

          <div className=" w-[20%] h-[100%] flex flex-col justify-center items-center">
            <h2 className="text-[#438e76] text-[50px] font-normal">{data?.activeJobs === null ? 0 : data?.activeJobs}</h2>
            <p>Active Jobs</p>
          </div>


          <div className='ml-1 -mr-1 w-[1%] my-[15px] border-l-[2px] border-r-0 border-t-0 border-b-0 border-solid border-[#e4e4e4]'></div>

          <div className=" w-[20%] h-[100%] flex flex-col justify-center items-center">
            <h2 className="text-[#438e76] text-[50px] font-normal">{data?.newAplication === null ? 0 : data?.newAplication}</h2>
            <p>New Applications</p>
          </div>

          <div className='ml-1 -mr-1 w-[1%] my-[15px] border-l-[2px] border-r-0 border-t-0 border-b-0 border-solid border-[#e4e4e4]'></div>

          <div className=" w-[20%] h-[100%] flex flex-col justify-center items-center">
            <h2 className="text-[#438e76] text-[50px] font-normal">{data?.interviewSchedualed === null ? 0 : data?.interviewSchedualed}</h2>
            <p>Interview Scheduled</p>
          </div>

          <div className='ml-1 -mr-1 w-[1%] my-[15px] border-l-[2px] border-r-0 border-t-0 border-b-0 border-solid border-[#e4e4e4]'></div>

          <div className=" w-[20%] h-[100%] flex flex-col justify-center items-center">
            <h2 className="text-[#438e76] text-[50px] font-normal">{data?.hiredCandidate === null ? 0 : data?.hiredCandidate}</h2>
            <p>Hired Candidate</p>
          </div>

          <div className='ml-1 -mr-1 w-[1%] my-[15px] border-l-[2px] border-r-0 border-t-0 border-b-0 border-solid border-[#e4e4e4]'></div>

          <div className=" w-[20%] h-[100%] flex flex-col justify-center items-center">
            <h2 className="text-[#438e76] text-[50px] font-normal">{data?.totalJobs === null ? 0 : data?.totalJobs}</h2>
            <p>Total Jobs</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default TopCardBlock;

TopCardBlock.propTypes = {
  topBLock: PropTypes.object // Define the prop type
};