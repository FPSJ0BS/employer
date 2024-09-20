import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { Button } from "@mui/material";
import axios from "axios";

import DOMPurify from "dompurify";
import LoadingButton from "@mui/lab/LoadingButton";
import { FlashOnRounded } from "@mui/icons-material";
export const JobDescriptionInput = ({ type }: { type: boolean }) => {
  const [editorData, setEditorData] = useState("");
  const [debouncedData, setDebouncedData] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { employerPostJob } = useSelector(
    (state: any) => state.employerSliceNew
  );
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedData(editorData);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, [editorData]);

  useEffect(() => {
    dispatch(
      postEmployerPostJob({
        job_description: debouncedData,
      })
    );
  }, [debouncedData]);

  const handleEditorData = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };
  const generateDescription = async () => {
    setLoading(true);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer sk-proj-2o8Hn8febjqt2ZyGPqTOT3BlbkFJ3QIA5VqoCAmnIJBqMeav`,
      },
    };
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `write an SEO-friendly job description for  job title ${employerPostJob?.job_title}, with a salary range of ${employerPostJob?.min_salary} ${employerPostJob?.salary_type} to ${employerPostJob?.max_salary} ${employerPostJob?.salary_type}, with experience of ${employerPostJob?.min_experience}-${employerPostJob?.max_experience} years, for location ${employerPostJob?.city} ${employerPostJob?.state}, the candidate must be a graduate or postgraduate from any reputed college university, and have an understanding from any reputed educational institute/school`,
          },
        ],
      },
      {
        ...config,
      }
    );

    if (response?.data.choices[0].message.content) {
      setLoading(false);
      setDebouncedData(
        DOMPurify.sanitize(
          response?.data.choices[0].message.content.replaceAll("```", "")
        )
      );
    }
  };
  console.log(employerPostJob);
  return (
    <div className="w-[300px] sm:w-[1000px] mb-[40px] relative">
      <div className=" py-2">
        <h2 className=" font-semibold">Please enter a Job Description</h2>
      </div>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => handleEditorData(event, editor)}
        data={type ? debouncedData : ""}
      />
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        disabled={!employerPostJob.job_title}
        onClick={generateDescription}
        startIcon={
          <img src="https://employer.jobsineducation.net/images/ai-button.svg" />
        }
        variant="outlined"
        style={{
          position: "absolute",
          bottom: "0px",
          right: "0px",
          background: "#dd4975",
          borderColor: "#dd4975",
          color: "#fff",
        }}
      >
        Generate With AI
      </LoadingButton>
    </div>
  );
};
