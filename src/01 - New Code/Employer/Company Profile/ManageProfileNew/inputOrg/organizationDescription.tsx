import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { TextInputValidEmployer } from "../../Employer/functions/employerFunctions";
// import { postAuthRegister } from "../../Employer/Redux/Authentication";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const OrganizationDescription = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const inputValue = e.target.value;

  //   if (inputValue ?? false) {
  //     dispatch(
  //       editEmployerManageProfileFields({
  //         organizationDescription: inputValue,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       editEmployerManageProfileFields({
  //         organizationDescription: "",
  //       })
  //     );
  //   }
  // };

  const [editorData, setEditorData] = useState("");
  const [debouncedData, setDebouncedData] = useState("");
  const [loading, setLoading] = useState(false);
  const editorInstanceRef = useRef(null); // Add a ref to access CKEditor instance

  const { employerPostJob } = useSelector(
    (state: any) => state.employerSliceNew
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedData(editorData);
    }, 0);

    return () => clearTimeout(debounceTimeout);
  }, [editorData]);

  useEffect(() => {
    dispatch(
      editEmployerManageProfileFields({
        organizationDescription: debouncedData,
      })
    );
  }, [debouncedData, dispatch]);

  const handleEditorData = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  useEffect(() => {
    if (employerManageProfileFields.organizationDescription) {
      setDebouncedData(employerManageProfileFields.organizationDescription);
    }
  }, [employerManageProfileFields.organizationDescription]);

  return (
    <div className="w-full relative col-span-2">
      <style>
        {`
    .ck.ck-editor__main .ck-placeholder {
      font-size: 16px; /* Adjust font size */
      font-weight: semiBold; /* Make bold */
      color: #aaa; /* Optional color */
    }
  `}
      </style>
      <div className="mb-2">
        <h2 className="font-medium">Organization Description *</h2>
      </div>
      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          editorInstanceRef.current = editor;
        }}
        onChange={(event, editor) => handleEditorData(event, editor)}
        data={debouncedData}
        config={{
          placeholder: "Enter Organization description...",
        }}
      />
    </div>
  );
};
