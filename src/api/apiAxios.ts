import axios from "axios";

export const BASE_URL = "https://empapi.fpsjob.com/institute";
// export const BASE_URL = "http://localhost:3005/institute";
const Fcm = localStorage.getItem("Fcm");

// Authentication Flow -->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const patchUpdatePassword = async (new_password: string) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.patch(
      `${BASE_URL}/profile/update-password`,
      {
        new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Post request to Send Otp
export const postPhoneOtpSendAxios = async (phoneNumber: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/mobile-send-otp`, {
      mobile_number: phoneNumber,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postAuthPhoneOtpSendAxios = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/authentication/mobile-send-otp`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

export const postAuthPhoneOtpVerifyAxios = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/authentication/mobile-verify-otp`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Post request to Verify Otp
export const postPhoneOtpVerifyAxios = async (
  phoneNumber: any,
  hash: any,
  otp: any
) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/mobile-verify-otp`, {
      mobile_number: phoneNumber,
      hash,
      otp,
      fcm_token: Fcm,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Institute API ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

// Get request for Institute Type List
export const getInstituteTypeListAxios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/institute-type`);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get request for State List
export const getStateListAxios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/state`);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get request for City List

export const getCityListAxios = async (stateId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities/${stateId}`);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Post Sending otp for registeration

export const postPhoneOtpRegistrationAxios = async (postData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/registration-send-otp`,
      postData
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const postEnquiryForm = async (postData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sales-enquiries`,
      postData
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Post Register
export const postRegisterAxios = async (postData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/registration-verify-otp`,
      {
        ...postData,
        fcm_token: Fcm,
        added_by: "WEB",
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Post Forgot password

export const postForgotPasswordAxios = async (email_id: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/forgot-password`,
      {
        email_id,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Dashboard --------------------------------------------------------------------------------------------------->

// Getting jobs ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getDashboardStats = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Getting recent applications ->>>>>>>>>>>>>>>>>>>>>>>>

export const getRecentApplications = async (
  length: any,
  pageNo: any,
  search: any,
  order_by?: any,
  order_type?: any
) => {
  console.log(search);
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);
    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(
      `${BASE_URL}/job/jobs/?limit=${length}&page=${pageNo}${
        search ? `&search=${search}` : ""
      }${
        order_by && order_type
          ? `&order_by=${order_by}&order_type=${order_type}`
          : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Getting profile data ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getProfile = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Getting Area data ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getArea = async (city : string) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`https://empapi.fpsjob.com/user/areaByCity?city=${city}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get job detail

export const getjobDetail = async (id: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Upload Profile Image ->>>>> change karna hai

export const postUploadImage = async (imageFile: any) => {
  try {
    // Get the authorization token from localStorage
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    // Check if the token is available
    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("profile_image", imageFile);

    // Make the POST request to the upload image endpoint
    const response = await axios.post(
      `${BASE_URL}/profile/upload-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
          accept: "application/json",
          "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

//   Dashboard -> Update Profile ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

export const postUpdateProfileAxios = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.patch(`${BASE_URL}/profile/update`, postData, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Change Candidate Status ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const postChangeCandidateStatus = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.patch(
      `${BASE_URL}/job/applied-job-status`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Change Candidate Status ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const postDbtandUpi = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/subscription-plan/order/bank-validate`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Change Candidate Schedule Interview ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const postChangeCandidateScheduleInterview = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/job/sheduled-interview`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

//   Dashboard -> Edit Job ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

export const patchEditJobAxios = async (jobId: number, jobData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.patch(
      `${BASE_URL}/job/jobs/${jobId}`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

//   Dashboard -> Post Job ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

// Salary Range

export const getJobSalaryRange = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/salary-range`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Experience Range

export const getJobExperienceRange = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/experience-level`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Work Place Type

export const getWorkPlaceType = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/work-place`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Work Job Type

export const getJobType = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/job-type`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get Salary Type

export const getSalaryType = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/salary-type`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get Interview Process Type

export const getInterviewType = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/selection-process`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBoardLevelType = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/board-level`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getQualificationsData = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/qualification`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getSelectionProcessData = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/selection-process`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getCategories`, {});

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getSubCategories = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getSubCategories?CID=${id}`,
      {}
    );

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Posting Job //

export const postPostJobAxios = async (
  job_title: string,
  employerID: number | null,
  catID: number | null,
  functionID: number | null,
  no_of_requirement: number | null,
  state: string,
  city: string,
  job_type: string,
  job_level: string,
  min_experience: number | null,
  max_experience: number | null,
  experience_unit: string,
  qualification: number | null,
  job_description: string,
  doc_required: string,
  job_designation: string,
  min_salary: number | null,
  max_salary: number | null,
  salary_type: string,
  selection_process: string,
  area: string,
  process_state: string,
  process_city: string,
  remarks: string
) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/job/post`,
      {
        job_title,
        employerID,
        catID,
        functionID,
        no_of_requirement,
        state,
        city,
        job_type,
        job_level,
        min_experience,
        max_experience,
        experience_unit,
        qualification,
        job_description,
        doc_required,
        job_designation,
        min_salary,
        max_salary,
        salary_type,
        selection_process,
        area,
        process_state,
        process_city,
        remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Post Questions

export const postQuestionsAxios = async (
  job_id: any,
  question_text: any,
  question_type: any,
  ques_options: any
) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/job/add-screen-question`,
      {
        job_id,
        question_text,
        question_type,
        ques_options, // Include the ques_options parameter
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Get Question type list

export const getQuestionTypeList = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/question-type`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Updating Questions

export const updateQuestionsAxios = async (
  questionId: any,
  ques_text: any,
  ques_type: any,
  ques_options: any,
  ques_delete: any
) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.patch(
      `${BASE_URL}/job/update-screen-question/${questionId}`,
      {
        ques_text,
        ques_type,
        ques_options,
        ques_delete,
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Get Plan List

export const getPackagesList = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/subscription-plan/list`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Payment Integration

export const postPaymentOrder = async (amount: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/subscription-plan/order`,
      {
        amount,
        currency_type: "INR",
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Complete Payment API

export const postValidatePayment = async (
  razorpay_order_id: any,
  razorpay_signature: any,
  razorpay_payment_id: any,
  pack_id: any,
  option_id: any
) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/subscription-plan/order/validate`,
      {
        razorpay_order_id,
        razorpay_signature,
        razorpay_payment_id,
        pack_id,
        option_id,
      },
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Candidate Filter APIs ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getAllCityList = async (search: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/all-city?search=${search}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getSalary = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/salary`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getQualification = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/qualification`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getAllStatus = async (catId: number) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/interview-steps/${catId}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const getAllFaq = async () => {
  try {
    

    const response = await axios.get(`${`https://empapi.fpsjob.com/`}/user/faq-list`);

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getTeachingLevel = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/job/board-level`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Notification ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getAllNotification = async () => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.get(`${BASE_URL}/new-applied-list?limit=10`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postDeleteNotification = async (id: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.delete(
      `${BASE_URL}/notification-delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postViewMobileAndEmail = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/faculity-profile-view`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Authentication Email - Send Otp

export const postEmailSendOtp = async (postData: any) => {
  try {
    const authorizationToken: any = localStorage.getItem("header");
    const storedDataObject = JSON.parse(authorizationToken);

    if (!authorizationToken) {
      console.error("Authorization token not available");
      return;
    }

    const response = await axios.post(`${BASE_URL}/email-send-otp`, postData, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

// Create Template
export const doGetTemplate = async () => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.get(`${BASE_URL}/letter-template`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doDeleteTemplate = async (id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.patch(
      `${BASE_URL}/letter-template/${id}/false`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doGetTemplateById = async (id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.get(`${BASE_URL}/letter-template/${id}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doAddTemplate = async (data: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.post(`${BASE_URL}/letter-template`, data, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doUpdateTemplate = async (data: any, id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.put(
      `${BASE_URL}/letter-template/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Create letter

export const doGetLetter = async () => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.get(`${BASE_URL}/letter`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doDeleteLetter = async (id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.patch(
      `${BASE_URL}/letter/${id}/false`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doGetLetterById = async (id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.get(`${BASE_URL}/letter/${id}`, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doAddLetter = async (data: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.post(`${BASE_URL}/letter`, data, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doUpdateLetter = async (data: any, id: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.put(`${BASE_URL}/letter/${id}`, data, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const doSendMail = async (data: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.post(`${BASE_URL}/letter/sendmail`, data, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const suggestedProfileQuery = async (data: any) => {
  const authorizationToken: any = localStorage.getItem("header");
  const storedDataObject = JSON.parse(authorizationToken);

  if (!authorizationToken) {
    console.error("Authorization token not available");
    return;
  }
  try {
    const response = await axios.post(`${BASE_URL}/suggested_profile_request`, data, {
      headers: {
        Authorization: `Bearer ${storedDataObject}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};