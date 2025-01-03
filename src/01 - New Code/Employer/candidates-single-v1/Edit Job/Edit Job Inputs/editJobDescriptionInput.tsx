import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editEmployerEditJob } from '../../../Redux/EmployerEditJob';
import { useSelector, useDispatch } from 'react-redux';

export const EditJobDescriptionInput = () => {

    const { employerEditJob } = useSelector(
        (state: any) => state.employerEditJob
      );

    const [editorData, setEditorData] = useState('');
    const [debouncedData, setDebouncedData] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedData(editorData);
        }, 500); // Adjust debounce delay as needed

        return () => clearTimeout(debounceTimeout);
    }, [editorData]);

    useEffect(() => {
        if (debouncedData.trim().length >= 50) {
            dispatch(editEmployerEditJob({
                job_description: debouncedData,
            }));
        }
    }, [debouncedData]);

    const handleEditorData = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div className="w-[300px] sm:w-[1000px] mb-[40px]">
            <div className=' py-2'>
                <h2 className=' font-semibold'>Please enter a Job Description of at least {editorData.length > 50 ? 0 : 50 - editorData.length} characters</h2>
            </div>
            <CKEditor
                editor={ClassicEditor}
                onInit={editor => {
                    // Initialization code here
                }}
                onChange={(event, editor) => handleEditorData(event, editor)}
                data={employerEditJob.job_description}
                
                
            />
        </div>
    );
};
