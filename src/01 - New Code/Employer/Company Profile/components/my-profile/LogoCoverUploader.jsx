


import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { setProfileImageSliceFunc } from "@/redux/InstituteDashboard/instituteProfileImageSlice";

import { postUploadImage, getProfile } from "@/api/apiAxios";

const LogoCoverUploader = ({ setProfileDataDisable }) => {

    const notifyError = () => toast.error("Select an Image");
    const dispatch = useDispatch();


    const [logoImg, setLogoImg] = useState("");
    const [error, setError] = useState('');
    const [errorCheck, setErrorCheck] = useState(false);



    // logo image
    const logoHandler = (file) => {
        if (!file) {
            setError('No file selected');
            setErrorCheck(true);
            return;
        }

        // Check file size (1 MB limit)
        const maxSizeInBytes = 1024 * 1024; // 1 MB
        if (file.size > maxSizeInBytes) {
            setError('File size exceeds 1 MB limit');
            setErrorCheck(true);
            return;
        }

        // Check file type (JPEG or PNG)
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Please choose a JPEG or PNG image.');
            setErrorCheck(true);
            return;
        }
        setErrorCheck(false);
        setError('File Passed');
        setLogoImg(file);

    };


    const updateProfile = async () => {

        if (!logoImg) {
            notifyError();
            return;
        }
        try {
            const res = await postUploadImage(logoImg);
            if (res?.data?.status) {
                

                const imageData = await res?.data?.data[0];
         
                await localStorage.setItem('insProfileImage', imageData);
                await dispatch(setProfileImageSliceFunc(imageData))
                await setProfileDataDisable(true);

            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        setError('');
    }, []);


    return (
        <>
            <div className="uploading-outer flex justify-between">
                <div className=" flex justify-between items-center">
                    <div className="uploadButton">
                        <input
                            className="uploadButton-input"
                            type="file"
                            name="attachments[]"
                            accept="image/*"
                            id="upload"
                            required
                            onChange={(e) => logoHandler(e.target.files[0])}
                        />
                        <label
                            className="uploadButton-button ripple-effect"
                            htmlFor="upload"
                        >
                            {logoImg !== "" ? logoImg?.name : " Browse Logo"}
                        </label>
                        <span className="uploadButton-file-name"></span>
                    </div>
                    <div className="text">
                        Max file size is 1MB, Minimum dimension: 150x150 And
                        Suitable files are .jpg & .pngg

                        <p className={`${errorCheck ? ' text-red-800' : ' text-green-800'} font-semibold`}>{error}</p>
                    </div>
                </div>
                <button onClick={() => updateProfile()} type="submit" className="theme-btn btn-style-one">
                    Update Image
                </button>
            </div>

        </>
    );
};

export default LogoCoverUploader;
