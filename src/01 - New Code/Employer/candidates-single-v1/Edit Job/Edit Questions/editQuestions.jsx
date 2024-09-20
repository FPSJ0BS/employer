import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import Loader from '../../../../../public/assets/Loader';
import useCustomLoader from '@/hooks/useLoader';
import PropTypes from 'prop-types';


export const EditQuestions = ({ allQuestionsEditSEJ, setAllQuestionsEditSEJ, allNewQuestionsEditSej, setNewQuestionsEditSej }) => {

    const params = useParams();
    const paramsId = params.id;





    const addNewFieldToQuestions = () => {
        // Map through the array and add the new field to each object
        const updatedQuestions = allQuestionsEditSEJ.map(question => ({
            ...question,
            new_question: false // You can set any default value for the new field
        }));

        // Update the state with the modified array
        setNewQuestionsEditSej(updatedQuestions);
        // setAllQuestionsEditSEJ(updatedQuestions);
    };

    useEffect(() => {
        addNewFieldToQuestions();

    }, [allQuestionsEditSEJ]);

    useEffect(() => {

        console.log('all data questions', allNewQuestionsEditSej);

    }, [allNewQuestionsEditSej]);


    // Trigger the effect when allQuestionsEditSEJ changes



    const [newChoice, setNewChoice] = useState('');

    const addQuestion = () => {
        // const newQuestionId = allQuestions.length + 1;
        setNewQuestionsEditSej([...allNewQuestionsEditSej, { ques_id: crypto.randomUUID(), ques_text: '', ques_type: 'Text', ques_options: [], is_ques_delete: 0, new_question: true }]);
    };

    const deleteQuestion = (questionId) => {

        const quesToDelete = allNewQuestionsEditSej.find(question => question.ques_id === questionId);

        if (quesToDelete && quesToDelete.new_question === true) {
            const quesToDeleteNew = allNewQuestionsEditSej.filter(question => question.ques_id !== questionId);
            setNewQuestionsEditSej(quesToDeleteNew);
            return;
        }


        const updatedQuestions = allNewQuestionsEditSej?.map(question =>
            question.ques_id === questionId ? { ...question, is_ques_delete: 1 } : question
        );
        setNewQuestionsEditSej(updatedQuestions);
    };

    const handleQuestionChange = (questionId, newText) => {
        const updatedQuestions = allNewQuestionsEditSej?.map(question =>
            question.ques_id === questionId ? { ...question, ques_text: newText } : question
        );
        setNewQuestionsEditSej(updatedQuestions);
    };

    const handleChoiceChange = (questionId, choiceIndex, newText) => {
        const updatedQuestions = allNewQuestionsEditSej?.map(question =>
            question.ques_id === questionId ? {
                ...question,
                ques_options: question.ques_options.map((choice, index) =>
                    index === choiceIndex ? newText : choice
                )
            } : question
        );
        setNewQuestionsEditSej(updatedQuestions);
    };


    const handleTypeChange = (questionId, newType) => {
        let updatedQuestions;
        if (newType === 'text') {
            // If the new type is 'text', clear the choices array
            updatedQuestions = allNewQuestionsEditSej?.map(question =>
                question.ques_id === questionId ? { ...question, ques_type: newType, choices: [] } : question
            );
        } else {
            updatedQuestions = allNewQuestionsEditSej?.map(question =>
                question.ques_id === questionId ? { ...question, ques_type: newType } : question
            );
        }
        setNewQuestionsEditSej(updatedQuestions);
    };

    const addChoice = (questionId, newChoice) => {
        const updatedQuestions = allNewQuestionsEditSej?.map(question =>
            question.ques_id === questionId ? { ...question, ques_options: [...question.ques_options, newChoice] } : question
        );
        setNewQuestionsEditSej(updatedQuestions);
        setNewChoice(''); // Clear the input field after adding choice
    };

    const deleteChoice = (questionId, choiceIndex) => {
        const updatedQuestions = allNewQuestionsEditSej?.map(question =>
            question.ques_id === questionId ? { ...question, ques_options: question.ques_options.filter((_, index) => index !== choiceIndex) } : question
        );
        setNewQuestionsEditSej(updatedQuestions);
    };


    return (
        <div>
            {allNewQuestionsEditSej?.map((question) => (
                question.is_ques_delete === 0 && (
                    <div className='mb-4 flex flex-col gap-4 border-2 border-solid border-gray-400 px-4 pb-4 rounded-lg' key={question.id}>
                        <div className='pt-4 flex gap-4 justify-start items-center '>
                            <input
                                required
                                className='bg-[#f1f5f7] py-2 px-4 w-[500px] rounded-md'
                                type="text"
                                value={question.ques_text}
                                onChange={(e) => handleQuestionChange(question.ques_id, e.target.value)}
                            />
                            <select
                                className='bg-[#f3f2f1] py-2 px-4 rounded-md'
                                value={question.ques_type}
                                onChange={(e) => handleTypeChange(question.ques_id, e.target.value)}
                            >
                                <option value="Text">Text</option>
                                <option value="Multi Choice">Multi Choice</option>
                                <option value="Single Choice">Single Choice</option>
                            </select>
                            <button type="button" className='py-2 px-4 bg-red-600 rounded-md text-white text-[20px]' onClick={() => deleteQuestion(question.ques_id)}>X</button>
                        </div>
                        {question?.ques_type === 'Multi Choice' && (
                            <div>
                                {question?.ques_options.map((choice, choiceIndex) => (
                                    <div className='flex gap-2 mb-2' key={choiceIndex}>
                                        <input
                                            required
                                            className='border-1 border-solid border-gray-400 rounded-md px-2 py-2 w-[400px]'
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(question.ques_id, choiceIndex, e.target.value)}
                                        />
                                        <button type="button" className='text-[18px]' onClick={() => deleteChoice(question.ques_id, choiceIndex)}>X</button>
                                    </div>
                                ))}
                                <button type="button" className='py-2 px-4 bg-green-600 rounded-md text-white text-[15px]' onClick={() => addChoice(question.ques_id, newChoice)}>Add Choice</button>
                            </div>
                        )}
                        {question?.ques_type === 'Single Choice' && (
                            <div>
                                {question?.ques_options.map((choice, choiceIndex) => (
                                    <div className='flex gap-2 mb-2' key={choiceIndex}>
                                        <input
                                            required
                                            className='border-1 border-solid border-gray-400 rounded-md px-2 py-2 w-[400px]'
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(question.ques_id, choiceIndex, e.target.value)}
                                        />
                                        <button type="button" className='text-[18px]' onClick={() => deleteChoice(question.ques_id, choiceIndex)}>X</button>
                                    </div>
                                ))}
                                <button type="button" className='py-2 px-4 bg-green-600 rounded-md text-white text-[15px]' onClick={() => addChoice(question.ques_id, newChoice)}>Add Choice</button>
                            </div>
                        )}
                    </div>
                )
            ))}
            <button type="button" className='bg-blue-600 p-2 text-white rounded-md' onClick={addQuestion}>Add Question</button>
        </div>


    );
};

EditQuestions.propTypes = {
    allQuestionsEditSEJ: PropTypes.array.isRequired,
    setAllQuestionsEditSEJ: PropTypes.func.isRequired,
    allNewQuestionsEditSej: PropTypes.array.isRequired,
    setNewQuestionsEditSej: PropTypes.func.isRequired,
};