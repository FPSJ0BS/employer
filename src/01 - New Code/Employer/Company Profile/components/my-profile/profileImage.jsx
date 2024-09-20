import { useSelector } from "react-redux";
import DefaultAvatar from '../../../../../../public/assets/icons/user.png'
import { useEffect, useState } from "react";

const ProfileImage = () => {

    const [iamge, setImage] = useState('')

    const { profileImage } = useSelector(state => state.instituteProfileImageSlice);
    const {  imageUrl } = useSelector(state => state.login);
  
  

    return (
        <div className="flex justify-center mt-[-50px]">
            {profileImage  && (<div className=" flex justify-center object-contain items-center flex-col border-[3px] my-[50px] border-solid rounded-[50%] h-[200px] w-[200px]">
                <img className=" rounded-[100%] h-[180px] w-[180px] p-[15px] border-[#cc5475]" width='180px' height='180px' src={`${imageUrl}${profileImage}`} />
            </div>)}

            {!profileImage && (<div className=" flex justify-center object-contain items-center flex-col border-[3px] my-[50px] border-solid rounded-[50%] h-[200px] w-[200px]">
                <img className=" rounded-[100%] h-[180px] w-[180px] p-[15px] border-[#cc5475]" width='180px' height='180px' src={DefaultAvatar} />
            </div>)}
        </div>
    )
}
export default ProfileImage;