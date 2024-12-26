import React from "react";

const TestimonialsPackages = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-6">
        <h3 className=" text-center text-[25px] font-semibold">
          Trusted by Institute from all over India
        </h3>
        <h4 className="text-center text-[25px] text-[#707070]">
          From North to South, East to West, educational institutes across India
          place their trust in us for unparalleled support and results.
        </h4>
      </div>

      <div className=" bg-[#c94f56] min-h-[500px] w-full rounded-2xl p-5 flex flex-col gap-6 items-center justify-start">
        <div className="flex flex-col gap-3 items-center justify-start">
          <h3 className=" text-[30px] text-white font-semibold">
            Recruiter Recommended Tallento
          </h3>
          <p className="text-center text-white text-[18px]">
            Join thousands of recruiters who trust Tallento for efficient,
            seamless, and reliable hiring solutions. From Al-driven candidate
            matching to simplified workflows, we're revolutionizing the
            recruitment process.
          </p>
        </div>

        <div className=" w-full grid grid-cols-2 gap-y-6 gap-x-[50px]">
          <div className=" h-[350px] w-full bg-white rounded-2xl"></div>
          <div className=" h-[350px] w-full bg-white rounded-2xl"></div>
          <div className=" h-[350px] w-full bg-white rounded-2xl"></div>
          <div className=" h-[350px] w-full bg-white rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPackages;
