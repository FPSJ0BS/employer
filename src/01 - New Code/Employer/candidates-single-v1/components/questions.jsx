import { useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getjobDetail } from "@/api/apiAxios";
import { postQuestionsAxios } from '@/api/apiAxios';
import Loader from '../../../../../public/assets/Loader';
import useCustomLoader from '@/hooks/useLoader';
import { updateQuestionsAxios } from '@/api/apiAxios';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';



export const Questions = () => {
    const [newQuestionData, setNewQuestionData] = useState('');
    const [newQuestionTypeData, setNewQuestionTypeData] = useState('');
    const params = useParams();
    const paramsId = params.id;
    const notifySuccessUpdate = () => toast.success('Question Updated');
    const notifySuccess = () => toast.success('Question Posted');
    const notifyError = () => toast.error('Question Post Failed!');
    const [fetchStatus, setFetchStatus] = useState(true);
    const [allQuestions, setAllQuestions] = useState([])
    const [isLoading, setLoader] = useCustomLoader(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobDetailResponse = await getjobDetail(paramsId);
                const jobData = jobDetailResponse?.data?.data[0];
                const screeningQuestionsData = jobData?.screen_questions;
                if (screeningQuestionsData) {
                    const initializedQuestions = screeningQuestionsData.map(question => ({
                        ...question,
                        editable: true,
                        ques_options: JSON.parse(question.ques_options)
                    }));
                    await setAllQuestions(initializedQuestions)
                    // console.log('all ques', allQuestions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchStatus])

    useEffect(() => {
        console.log('all ques', allQuestions);
    }, [allQuestions])

    const [newChoice, setNewChoice] = useState('');

    const addQuestion = () => {
        // const newQuestionId = allQuestions.length + 1;
        setAllQuestions([...allQuestions, { ques_text: '', ques_type: 'text', ques_options: [] }]);
    };

    const deleteQuestion = (questionId) => {
        const updatedQuestions = allQuestions.filter(question => question.ques_id !== questionId);
        setAllQuestions(updatedQuestions);
    };

    const handleQuestionChange = (questionId, newText) => {
        const updatedQuestions = allQuestions.map(question =>
            question.ques_id === questionId ? { ...question, ques_text: newText } : question
        );
        setAllQuestions(updatedQuestions);
    };

    const handleChoiceChange = (questionId, choiceIndex, newText) => {
        const updatedQuestions = allQuestions.map(question =>
            question.ques_id === questionId ? {
                ...question,
                ques_options: question.ques_options.map((choice, index) =>
                    index === choiceIndex ? newText : choice
                )
            } : question
        );
        setAllQuestions(updatedQuestions);
    };


    const handleTypeChange = (questionId, newType) => {
        let updatedQuestions;
        if (newType === 'text') {
            // If the new type is 'text', clear the choices array
            updatedQuestions = allQuestions.map(question =>
                question.ques_id === questionId ? { ...question, ques_type: newType, choices: [] } : question
            );
        } else {
            updatedQuestions = allQuestions.map(question =>
                question.ques_id === questionId ? { ...question, ques_type: newType } : question
            );
        }
        setAllQuestions(updatedQuestions);
    };

    const addChoice = (questionId, newChoice) => {
        const updatedQuestions = allQuestions.map(question =>
            question.ques_id === questionId ? { ...question, ques_options: [...question.ques_options, newChoice] } : question
        );
        setAllQuestions(updatedQuestions);
        setNewChoice(''); // Clear the input field after adding choice
    };

    const deleteChoice = (questionId, choiceIndex) => {
        const updatedQuestions = allQuestions.map(question =>
            question.ques_id === questionId ? { ...question, ques_options: question.ques_options.filter((_, index) => index !== choiceIndex) } : question
        );
        setAllQuestions(updatedQuestions);
    };


    return (
        <div>
            {allQuestions?.map((question) => (
                <div className='mb-4 flex flex-col gap-4 border-2 border-solid border-gray-400 px-4 pb-4 rounded-lg' key={question.id}>

                    <div className='pt-4 flex gap-4 justify-start items-center '>

                        <input
                            disabled
                            required
                            className='bg-[#f1f5f7] py-2 px-4 w-[500px] rounded-md'
                            type="text"
                            value={question.ques_text}
                            onChange={(e) => handleQuestionChange(question.ques_id, e.target.value)}
                        />

                        <select
                            disabled

                            className='bg-[#f3f2f1] py-2 px-4 rounded-md'
                            value={question.ques_type}
                            onChange={(e) => handleTypeChange(question.ques_id, e.target.value)}
                        >
                            <option value="Text">Text</option>
                            <option value="Multi Choice">Multi Choice</option>
                        </select>



                    </div>

                    {question?.ques_type === 'Multi Choice' && (
                        <div>
                            {question?.ques_options.map((choice, choiceIndex) => (

                                <div className='flex gap-2 mb-2' key={choiceIndex}>
                                    <input
                                        disabled
                                        required
                                        className='border-1 border-solid border-gray-400 rounded-md px-2 py-2 w-[400px]'
                                        type="text"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(question.ques_id, choiceIndex, e.target.value)}
                                    />

                                </div>

                            ))}

                        </div>
                    )}

                </div>
            ))}

        </div>

    );
};