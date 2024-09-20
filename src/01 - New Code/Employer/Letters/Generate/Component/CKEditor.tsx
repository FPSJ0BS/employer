import React, { useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface ICKEDITOR {
  setLetterData: (data: any) => void;
  letterData: any;
  label?:string
}
export const CKEditorComponent = ({ setLetterData, letterData, label }: ICKEDITOR) => {
  const [debouncedData, setDebouncedData] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedData(letterData?.description);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, [letterData?.description]);

  // useEffect(() => {
  //   if (debouncedData.trim().length >= 50) {
  //     dispatch(
  //       postEmployerPostJob({
  //         job_description: debouncedData,
  //       })
  //     );
  //   }
  // }, [debouncedData]);

  const handleEditorData = (event: any, editor: any) => {
    const data = editor.getData();

    setLetterData((prv: any) => {
      return {
        ...prv,
        description: data,
      };
    });
  };

  return (
    <div className="w-[300px] sm:w-[1000px]  mb-4">
      <div className=" py-2">
        <h2 className=" font-semibold">{label ? label : "Description"}</h2>
      </div>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => handleEditorData(event, editor)}
        data={letterData?.description}
      />
    </div>
  );
};
