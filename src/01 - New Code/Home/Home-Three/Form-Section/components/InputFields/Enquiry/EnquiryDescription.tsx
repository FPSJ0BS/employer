import React from "react";
import { FormDataType } from "../../../FormSection";

type OrganizationNameProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const EnquiryDescription: React.FC<OrganizationNameProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    setFormData({
      ...formData,
      sales_message: inputValue,
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 col-span-2">
      <textarea
        placeholder="Tell us about your query..."
        autoComplete="off"
        required
        rows={3}
        onChange={(e) => handleChange(e)}
        id="EnquiryDescription"
        name="EnquiryDescription"
        className="p-2 w-[100%] border-b-[3px] focus:border-[2px] border-gray-300 rounded-md focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 resize-none"
        value={formData?.sales_message}
      />
    </div>
  );
};
