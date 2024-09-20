import { useEffect, useState } from "react";
import { getAllNotification, postDeleteNotification } from "../../../../../api/apiAxios";
import { useNavigate } from "react-router-dom";
import NODATAPIC from "../../../../../../public/assets/storyset/Innovation-pana.png"

const AlertDataTable = () => {
  const navigate = useNavigate()

  const [allDataArray, setAllDataArray] = useState([])

  useEffect(() => {

    fetchApi()
  }, [])


  const deleteNotification = async (id) => {
    try {
      const res = await postDeleteNotification(id)

      if (res?.data?.status) {
        await fetchApi()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchApi = async () => {
    try {
      const res = await getAllNotification()
      if (res.data.status) {
        const data = await res?.data?.data
        await setAllDataArray(data)
        console.log(res?.data?.data);
      } else {
        console.log(res);

      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {allDataArray.length < 1 ? (<div className=' flex flex-col justify-center items-center z-30'> <h2 className=' font-medium text-[20px]'>No Data, Keep Searching!!!</h2> <img className=' w-[40%]' src={NODATAPIC} alt='No Data' /></div>) : (<table className="default-table manage-job-table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Job Name</th>
            <th>Experience</th>
            <th>Candidate Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {allDataArray.map((item) => {
            return (

              <tr key={item?.NID}>
                <td onClick={() => navigate(`/candidates-single-v1/${item.jobID}/applied`)} className=" capitalize cursor-pointer">{item?.name}</td>
                <td onClick={() => navigate(`/candidates-single-v1/${item.jobID}/applied`)} className=" break-words cursor-pointer">
                  {item?.job_title}
                </td>
                <td className=" cursor-pointer" onClick={() => navigate(`/candidates-single-v1/${item.jobID}/applied`)}>{item?.min_experience} - {item.max_experience} Years</td>
                <td className=" cursor-pointer" onClick={() => navigate(`/candidates-single-v1/${item.jobID}/applied`)}>{item?.state}, {item?.city}</td>
                <td className=" cursor-pointer">
                  <button onClick={() => deleteNotification(item?.NID)}>
                    <i className="la la-trash colored"></i>
                  </button>
                </td>
              </tr>



            )
          })}

          {/* End tr */}


          {/* End tr */}
        </tbody>
      </table>)}
    </>
  );
};

export default AlertDataTable;
