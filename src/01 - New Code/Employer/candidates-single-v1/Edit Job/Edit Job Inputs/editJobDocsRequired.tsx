
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editEmployerEditJob } from '../../../Redux/EmployerEditJob';
import { useSelector, useDispatch } from 'react-redux';

export const EditJobDocsRequired = () => {

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
        if (debouncedData) {
            dispatch(editEmployerEditJob({
              doc_required: debouncedData,
            }));
        }

        console.log('debouncedData',debouncedData);
        
    }, [debouncedData]);

    const handleEditorData = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div className="w-[300px] sm:w-[1000px] mb-[40px]">
            <div className=' py-2'>
                <h2 className=' font-semibold'>Docs Required</h2>
            </div>
            <CKEditor
                editor={ClassicEditor}
                onInit={editor => {
                    // Initialization code here
                }}
                onChange={(event, editor) => handleEditorData(event, editor)}
                data={employerEditJob?.doc_required}
                
                
            />
        </div>
    );
};

