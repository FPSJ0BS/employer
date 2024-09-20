
import { useState, useEffect } from 'react';
import { getProfile } from '@/api/apiAxios';
import LogoCoverUploader from './LogoCoverUploader';
import ProfileImage from './profileImage';
import { useDispatch } from 'react-redux';
import { setProfileImageSliceFunc } from '@/redux/InstituteDashboard/instituteProfileImageSlice';
import { postUpdateProfileAxios } from '../../../../../api/apiAxios';
import Loader from '../../../../../../public/assets/Loader';
import useCustomLoader from '@/hooks/useLoader';


const FormInfoBox = () => {
    const dispatch = useDispatch()
    const [isLoading, setLoader] = useCustomLoader(false)
    const [profileImgeonLoad, setProfileImageOnLoad] = useState('')

    // Getting prifle data ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [profileDataDisable, setProfileDataDisable] = useState(true)
    const [instituteName, setInstituteName] = useState('')
    const [institutePersonName, setInstitutePersonName] = useState('')
    const [instituteEmailId, setInstituteEmailId] = useState('')
    const [institutePhoneNumber, setInstitutePhoneNumber] = useState('')
    const [instituteAddress, setInstituteAddress] = useState('')
    const [instituteState, setInstituteState] = useState('')
    const [instituteCity, setInstituteCity] = useState('')

    const [contactPersonName, setcontactPersonName] = useState('')
    const [contactPersonNumber, setcontactPersonNumber] = useState('')
    const [contactPersonEmail, setcontactPersonEmail] = useState('')
    const [contactPersonDesignation, setcontactPersonDesignation] = useState('')

    useEffect(() => {
        const profileImageDataLS = localStorage.getItem('insProfileImage')
        if (profileImageDataLS !== null) {
            setProfileImageOnLoad(profileImageDataLS)
            dispatch(setProfileImageSliceFunc(profileImageDataLS))
        }
    }, [])


    useEffect(() => {

        const gettingProfile = async () => {
            try {
                const res = await getProfile();
                if (res?.data.status) {
                    console.log('gettinng profile data', res);
                    setLoader(true);
                    const profileAllData = res?.data?.data;


                    if (!profileImgeonLoad) {
                        const profileImageData = profileAllData?.employerDetails?.empimage;
                        dispatch(setProfileImageSliceFunc(profileImageData))
                        localStorage.setItem('insProfileImage', profileImageData)

                    }

                    const insName = profileAllData?.userData?.name;
                    setInstituteName(insName);

                    const insPersonName = profileAllData?.employerDetails?.contact_person_name;
                    setInstitutePersonName(insPersonName);

                    const insEmailId = profileAllData?.userData?.email;
                    setInstituteEmailId(insEmailId)

                    const insPhoneNumber = profileAllData?.userData?.mobile;
                    setInstitutePhoneNumber(insPhoneNumber);

                    const insAddress = profileAllData?.employerDetails?.address;
                    setInstituteAddress(insAddress);

                    const insState = profileAllData?.employerDetails?.state;
                    setInstituteState(insState);

                    const insCity = profileAllData?.employerDetails?.city;
                    setInstituteCity(insCity)

                    const insContactPersonName = profileAllData?.employerDetails?.contact_person_name;
                    setcontactPersonName(insContactPersonName)

                    const insContactPersonNumber = profileAllData?.employerDetails?.contact_person_no;
                    setcontactPersonNumber(insContactPersonNumber)

                    const insContactPersonEmail = profileAllData?.employerDetails?.contact_person_email;
                    setcontactPersonEmail(insContactPersonEmail)

                    const insContactPersonDesignation = profileAllData?.employerDetails?.contact_person_desig;
                    setcontactPersonDesignation(insContactPersonDesignation)
                } else {
                    setLoader(false)
                }
            } catch (error) {
                console.log('error', error);
            }
        }

        gettingProfile();

    }, [])


    // setting edit profile condition

    const changeEditProfileCondition = () => {
        setProfileDataDisable(!profileDataDisable)
    }

    const updateProfileFunc = async (e) => {
        e.preventDefault();
        setLoader(false)
        try {
            const res = await postUpdateProfileAxios({

                name: instituteName,
                contact_person_name: contactPersonName,
                email: instituteEmailId,
                address: instituteAddress,
                state: instituteState,
                city: instituteCity,
                contact_person_email: contactPersonEmail,
                contact_person_no: contactPersonNumber,
                contact_person_desig: contactPersonDesignation
            })

            if (res?.data?.status) {
              
                setLoader(true)
                setProfileDataDisable(true)
            } else {
                
                setLoader(true)
                setProfileDataDisable(true)

            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    {/* Handle Validation for Inputs */ }

    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

    // Institute Name
    const handleInstituteInputNameChange = (e) => {
        const inputValue = e.target.value;
        if (isValidInput(inputValue)) {
            setInstituteName(inputValue);
        }
    };

    // Institute Person name 

    const handleInstitutePersonNameChange = (e) => {
        const inputValue = e.target.value;

        setInstitutePersonName(inputValue);

    };

    // Institute State

    const handleInstituteStateNameChange = (e) => {
        const inputValue = e.target.value;
        if (isValidInput(inputValue)) {
            setInstituteState(inputValue);
        }
    };

    // Institute City

    const handleInstituteCityNameChange = (e) => {
        const inputValue = e.target.value;
        if (isValidInput(inputValue)) {
            setInstituteCity(inputValue);
        }
    };

    // Contact Person Name

    const handleContactPersonNameChange = (e) => {
        const inputValue = e.target.value;

        setcontactPersonName(inputValue);

    };


    //  Handle Contact Person Designation

    const handleContactPersonDesignationChange = (e) => {
        const inputValue = e.target.value;
        if (isValidInput(inputValue)) {
            setcontactPersonDesignation(inputValue);
        }
    };



    const isValidInput = (inputValue) => {
        // Regular expression to match only letters (uppercase and lowercase), spaces, and hyphens
        const regex = /^[A-Za-z]*$/;
        return regex.test(inputValue);
    };


    // Contact Person Number Change

    const handleContactPhoneNumberChange = (e) => {
        const inputPhoneNumber = e.target.value;
        // Regular expression to check if the phone number is valid
        const isValidPhoneNumber = /^[6-9]\d{9}$/.test(inputPhoneNumber);
        setcontactPersonNumber(inputPhoneNumber);
        setIsValidPhoneNumber(isValidPhoneNumber);
    };
    return (
        <div className="default-form">
            <div className='flex justify-end items-baseline pt-4'>

                <button onClick={() => changeEditProfileCondition()} type="submit" className="theme-btn btn-style-one">
                    {`${profileDataDisable ? 'Edit Profile' : 'Cancel Edit'}`}
                </button>
            </div>

            {isLoading ? (<ProfileImage />) : (<Loader />)}
            {!profileDataDisable && <LogoCoverUploader setProfileDataDisable={setProfileDataDisable} />}

            {isLoading ? (<form onSubmit={(e) => updateProfileFunc(e)}>


                <div className="row">
                    {/* <!-- Input --> */}

                    {/* First row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization Name</label>
                        <input
                            onChange={(e) => handleInstituteInputNameChange(e)}
                            className=' '
                            disabled={true}
                            type="text"
                            name="name"
                            value={instituteName}
                            autoComplete="off"


                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Contact Person Name</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="text"
                            name="name"
                            value={contactPersonName}
                            onChange={(e) => handleContactPersonNameChange(e)}
                            autoComplete="off"


                        />
                    </div>


                    {/* Second row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization Email Id</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="email"
                            name="name"
                            value={instituteEmailId}
                            onChange={(e) => setInstituteEmailId(e.target.value)}
                            autoComplete="off"


                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization Mobile Number</label>
                        <input
                            className=' '
                            disabled={true}
                            type="number"
                            name="name"
                            value={institutePhoneNumber}
                            onChange={(e) => setInstitutePhoneNumber(e.target.value)}
                            autoComplete="off"

                        />
                    </div>

                    {/* Third row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization Address</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="text"
                            name="name"
                            value={instituteAddress}
                            onChange={(e) => setInstituteAddress(e.target.value)}
                            autoComplete="off"


                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization State</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="text"
                            name="name"
                            value={instituteState}
                            onChange={(e) => handleInstituteStateNameChange(e)}
                            autoComplete="off"


                        />
                    </div>

                    {/* Fourth row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Organization City</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="text"
                            name="name"
                            value={instituteCity}
                            onChange={(e) => handleInstituteCityNameChange(e)}
                            autoComplete="off"


                        />
                    </div>



                    {/* Fifth row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Contact Person Email</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="email"
                            name="name"
                            value={contactPersonEmail}
                            onChange={(e) => setcontactPersonEmail(e.target.value)}
                            autoComplete="off"


                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Contact Person Number</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="number"
                            name="name"
                            value={contactPersonNumber}
                            onChange={(e) => handleContactPhoneNumberChange(e)}
                            autoComplete="off"


                        />
                        {!isValidPhoneNumber && (
                            <p style={{ color: 'red' }}>
                                Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.
                            </p>
                        )}
                    </div>

                    {/* Sixth row ->>>>>>>>>> */}
                    <div className="form-group col-lg-6 col-md-12 ">
                        <label>Contact Person Designation</label>
                        <input
                            className=' '
                            disabled={profileDataDisable ? true : false}
                            type="text"
                            name="name"
                            value={contactPersonDesignation}
                            onChange={(e) => handleContactPersonDesignationChange(e)}
                            autoComplete="off"


                        />
                    </div>





                </div>
                {!profileDataDisable && <div className="form-group col-lg-6 col-md-12">
                    <button disabled={!isValidPhoneNumber} type="submit" className={`theme-btn btn-style-one ${!isValidPhoneNumber ? ' bg-gray-600' : ' bg-mainBgColor'}`}>
                        Save
                    </button>
                </div>}
            </form>) : (<Loader />)}
        </div>
    );
};

export default FormInfoBox;