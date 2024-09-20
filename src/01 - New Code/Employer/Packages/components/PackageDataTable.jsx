import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import checkPng from '../../../../../public/assets/icons/check.png';
import Loader from "../../../../../public/assets/Loader";
import { getPackagesList } from "@/api/apiAxios";
import useCustomLoader from "@/hooks/useLoader";
import { ModalPackage } from "./ModalPackage";
import ReactHtmlParser from 'react-html-parser';
import { updateSinglePlanData, openBuyPackageModal, editPackageFields } from "../../Redux/EmployerPackages";
import NODATAPIC from "../../../../../public/assets/storyset/Innovation-pana.png";
import { JobsDropDown } from "./inputs/jobsDropDown.tsx";
import { getProfile } from "../../../../api/apiAxios.ts";

const PackageDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [planList, setPlanList] = useState([]);
  const [isLoading, setLoader] = useCustomLoader(false);
  const [showMoreData, setShowMoreData] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [singlePlanData, setSinglePlanData] = useState([]);
  const [planSwitch, setPlanSwitch] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState({});

  useEffect(() => {
    const getPlans = async () => {
      try {
        const res = await getPackagesList();
        if (res.data.status) {
          const data = res?.data?.data;
          setPlanList(data);
          checkingData(data);
          setLoader(true);
        } else {
          setLoader(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlans();
    const gettingProfile = async () => {
      try {
        const res = await getProfile();
        if (res?.data?.status) {
          const profileAllData = await res?.data?.data?.subscriptionData;
          setActivePlan(profileAllData?.packID);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    gettingProfile();
  }, []);

  const checkingData = (data) => {
    if (data?.nationalPlans.length > 0 && data?.statePlans.length > 0) {
      return;
    } else if (data?.nationalPlans.length < 1) {
      setPlanSwitch(true);
      return;
    } else if (data?.statePlans.length < 1) {
      setPlanSwitch(false);
      return;
    }
  };



  const handleJobSelect = (planId, job) => {
    setSelectedJobs((prev) => ({ ...prev, [planId]: job }));
  };

  const getPriceForJob = (plan, job) => {
    const packageOption = plan?.national_package?.find(option => option.jobs === parseInt(job, 10));
    // console.log('option', packageOption);
    // console.log('selected jobs', selectedJobs);
    return packageOption ? packageOption.price : plan?.national_package[0].price;
  };

  const getSinglePlanData = async (plan, selectedJob, planId) => {

    const packageOption = await plan?.national_package?.find(option => option.jobs === parseInt(selectedJob, 10));
    console.log("Selected Package Option:", packageOption);
    const id = await packageOption?.id
    const price = await packageOption?.price
    const packId = await packageOption?.packid


    await dispatch(
      editPackageFields({
        price,
        id: packId,
        optionId: id,
      })
    );

    await getsinglePlan(planId)



  };

  const getsinglePlan = async (planId) => {
    // if (planType) {
    //   const foundPlan = planList?.nationalPlans?.find((planAll) => planAll.id === planId);
    //   if (foundPlan) {
    //     setSinglePlanData(foundPlan);
    //     dispatch(updateSinglePlanData({ singlePlanData: foundPlan }));
    //   }
    // } 
    // else {
    //   const foundPlan = planList?.statePlans?.find((planAll) => planAll.plan_id === planId);
    //   if (foundPlan) {
    //     setSinglePlanData(foundPlan);
    //   }
    // }

    // dispatch(openBuyPackageModal());



    const foundPlan = await planList?.nationalPlans?.find((planAll) => planAll.id === planId);
    if (foundPlan) {
      setSinglePlanData(foundPlan);
      dispatch(updateSinglePlanData({ singlePlanData: foundPlan }));
    }

    await navigate("/checkout");



  };

  return (
    <>
      {planList?.nationalPlans?.length < 1 &&
      planList?.statePlans?.length < 1 ? (
        <div className="flex flex-col justify-center items-center z-30">
          <h2 className="mt-4 font-medium text-[20px]">
            Currently, there are no plans available
          </h2>
          <img className="w-[40%]" src={NODATAPIC} alt="No Data" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10">
          {/* {isLoading && (
            <div className="flex flex-col sm:flex-row sm:gap-4">
              {planList?.nationalPlans?.length > 0 && (
                <button onClick={() => setPlanSwitch(false)} className={`${!planSwitch ? 'bg-mainBgColor' : 'bg-gray-800'} w-[200px] py-[10px] text-white rounded-lg mt-[30px]`}>NATIONAL</button>
              )}
              {planList?.statePlans?.length > 0 && (
                <button onClick={() => setPlanSwitch(true)} className={`${planSwitch ? 'bg-mainBgColor' : 'bg-gray-800'} w-[200px] py-[10px] text-white rounded-lg mt-[30px]`}>STATE</button>
              )}
            </div>
          )} */}

          {!isLoading && <Loader />}

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-3 2xl:grid-cols-3">
              {planList?.nationalPlans?.length > 0 &&
                !planSwitch &&
                planList?.nationalPlans?.map((plan) => (
                  <div
                    key={plan?.id}
                    className="h-auto py-[20px] w-[250px] lg:w-[25vw] xl:w-[20vw] border-[1.5px] border-[#dbdde5] border-solid rounded-xl flex flex-col justify-center items-center"
                  >
                    <div className="text-center text-[20px] font-bold">
                      <h1 className="font-bold">{plan?.name}</h1>
                    </div>

                    <div className="flex my-3">
                      <p>₹</p>
                      <h3 className="text-[45px] text-[#293756]">
                        {getPriceForJob(
                          plan,
                          selectedJobs[plan?.id] ||
                            plan?.national_package[0].jobs
                        )}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 mt-[30px] gap-y-4 px-2 w-full">
                      <div className="flex justify-start items-center gap-2 w-full ml-4">
                        <img
                          height="25px"
                          width="20px"
                          src={checkPng}
                          alt="check"
                        />
                        <p>Package Type:</p>
                        <span className="font-semibold">
                          {plan?.emp_type.charAt(0).toUpperCase() +
                            plan?.emp_type.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-start items-center gap-2 w-full ml-4">
                        <img
                          height="25px"
                          width="20px"
                          src={checkPng}
                          alt="check"
                        />
                        <p>Plan Validity:</p>
                        <span className="font-semibold">
                          {plan.validfor} Days
                        </span>
                      </div>
                      <div className="flex items-center justify-between my-4 h-[60px] border-t-[1.5px] border-b-[1.5px] border-l-0 border-r-0 border-dashed">
                        <JobsDropDown
                          packageOptions={plan?.national_package}
                          onJobSelect={(job) => handleJobSelect(plan?.id, job)}
                        />
                        <h3 className="text-[20px] text-[#293756] font-semibold">
                          <span className="pr-2 font-normal text-[18px]">
                            Total
                          </span>
                          <span className="text-[15px] pr-1 font-medium">
                            ₹
                          </span>
                          {getPriceForJob(
                            plan,
                            selectedJobs[plan?.id] ||
                              plan?.national_package[0].jobs
                          )}
                        </h3>
                      </div>
                    </div>
                    {/* <button disabled={activePlan} onClick={() => getSinglePlanData(plan, selectedJobs[plan?.id] || plan?.national_package[0].jobs)} className={`${activePlan === plan?.plan_id ? 'bg-green-900' : 'bg-mainBgColor'} px-[40px] py-[10px] text-white rounded-lg mt-[30px]`}>
                    {activePlan === plan?.plan_id ? 'Plan Activated' : 'Buy'}
                  </button> */}
                    <button
                      disabled={activePlan === plan?.id}
                      onClick={() =>
                        getSinglePlanData(
                          plan,
                          selectedJobs[plan?.id]
                            ? selectedJobs[plan?.id]
                            : plan?.national_package[0].jobs,
                          plan?.id || plan?.national_package[0].jobs
                        )
                      }
                      style={{
                        opacity: activePlan === plan?.id ? 0.5 : 1,
                        cursor: activePlan === plan?.id ?"no-drop" : "pointer",
                      }}
                      className={`cursor-pointer transition-all 
                                     ${
                                       activePlan === plan?.plan_id
                                         ? "bg-mainBgColor"
                                         : "bg-[#2f5da7]"
                                     } text-white w-[90%] py-2 rounded-lg
                                    border-green-400
                                      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                      active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-mainBgColor shadow-mainBgColor active:shadow-none`}
                    >
                      {activePlan === plan?.id ? "Selected" : " Buy The Plan"}
                    </button>
                  </div>
                ))}
              {/* {planList?.statePlans?.length > 0 && planSwitch && planList?.statePlans?.map((plan) => (
                <div key={plan?.id} className="h-auto py-[20px] w-[250px] lg:w-[25vw] xl:w-[20vw] border-2 border-dashed rounded-xl flex flex-col justify-center items-center">
                  <div className="text-center text-[20px] font-bold">
                    <h1 className="font-bold">{plan?.name}</h1>
                  </div>
                  <div className="text-center pt-4 px-[30px] text-[16px]">
                    <h1 className="">{plan?.description.length > 25 ? ReactHtmlParser(plan?.description.slice(0, 25)) : ReactHtmlParser(plan?.description)}...</h1>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 mt-[30px] gap-y-4 px-2">
                    <div className="flex justify-start items-center gap-2 w-auto">
                      <img height='25px' width='25px' src={checkPng} alt="check" />
                      <p>Package Type:</p>
                      <span className="font-semibold">{plan?.emp_type.charAt(0).toUpperCase() + plan?.emp_type.slice(1)}</span>
                    </div>
                    <div className="flex justify-start items-center gap-2 w-auto">
                      <img height='25px' width='25px' src={checkPng} alt="check" />
                      <p>Plan Validity:</p>
                      <span className="font-semibold">{plan.validfor} Days</span>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                      <JobsDropDown packageOptions={plan?.state_package} onJobSelect={(job) => handleJobSelect(plan?.id, job)} />
                    </div>
                  </div>
                  <button onClick={() => getsinglePlan(plan?.id, false)} className="bg-mainBgColor px-[40px] py-[10px] text-white rounded-lg mt-[30px]">
                    View More
                  </button>
                </div>
              ))} */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PackageDataTable;
