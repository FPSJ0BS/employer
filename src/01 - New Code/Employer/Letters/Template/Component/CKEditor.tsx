import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface ICKEDITOR {
  setTemplateData: (data: any) => void;
  templateData: any;
}
export const CKEditorComponent = ({
  setTemplateData,
  templateData,
}: ICKEDITOR) => {
  const [debouncedData, setDebouncedData] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedData(templateData?.description);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, [templateData?.description]);

  // useEffect(() => {
  //   if (debouncedData?.trim().length >= 50) {
  //     dispatch(
  //       postEmployerPostJob({
  //         job_description: debouncedData,
  //       })
  //     );
  //   }
  // }, [debouncedData]);

  const handleEditorData = (event: any, editor: any) => {
    const data = editor.getData();
    setTemplateData({
      ...templateData,
      description: data,
    });
  };

  return (
    <div className="w-[300px] sm:w-[1000px] mb-[40px]">
      <div className=" py-2">
        <h2 className=" font-semibold">Description</h2>
      </div>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => handleEditorData(event, editor)}
        data={templateData?.description}
      />
    </div>
  );
};
