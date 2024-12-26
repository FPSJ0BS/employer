

const Benefits = ({ jobData }) => {
 

  return (
    <div className="flex flex-wrap  gap-x-3  w-full">
      {jobData?.benefits?.map((item, index) => {
        return (
          <p className="bg-[#9d8189] text-white px-3 py-1 font-medium rounded-[30px]" key={index}>{item}</p>
        )
      })}
    </div>
  )
}

export default Benefits