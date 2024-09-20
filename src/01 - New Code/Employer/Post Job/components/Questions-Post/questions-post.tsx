import { useEffect, useState } from 'react';
import { getQuestionTypeList } from '@/api/apiAxios';

const QuestionsComponent = ({setQuestionsPostJob, questionsPostJob}) => {

   

    useEffect(()=>{

        const fetchQuestions = async () => {
            try {
                const res = await getQuestionTypeList();
                console.log(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchQuestions()

    }, [])

    const [newChoice, setNewChoice] = useState('');

    const addQuestion = () => {
        const newQuestionId = questionsPostJob?.length + 1;
        setQuestionsPostJob([...questionsPostJob, { id: newQuestionId, text: '', type: 'text', choices: [] }]);
    };

    const deleteQuestion = (questionId) => {
        const updatedQuestions = questionsPostJob?.filter(question => question.id !== questionId);
        setQuestionsPostJob(updatedQuestions);
    };

    const handleQuestionChange = (questionId, newText) => {
        const updatedQuestions = questionsPostJob?.map(question =>
            question.id === questionId ? { ...question, text: newText } : question
        );
        setQuestionsPostJob(updatedQuestions);
    };

    const handleChoiceChange = (questionId, choiceIndex, newText) => {
        const updatedQuestions = questionsPostJob?.map(question =>
            question.id === questionId ? {
                ...question,
                choices: question.choices.map((choice, index) =>
                    index === choiceIndex ? newText : choice
                )
            } : question
        );
        setQuestionsPostJob(updatedQuestions);
    };


    const handleTypeChange = (questionId, newType) => {
        let updatedQuestions;
        if (newType === 'text') {
           
            updatedQuestions = questionsPostJob?.map(question =>
                question.id === questionId ? { ...question, type: newType, choices: [] } : question
            );
        } else {
            updatedQuestions = questionsPostJob?.map(question =>
                question.id === questionId ? { ...question, type: newType } : question
            );
        }
        setQuestionsPostJob(updatedQuestions);
    };

    const addChoice = (questionId, newChoice) => {
        const updatedQuestions = questionsPostJob?.map(question =>
            question.id === questionId ? { ...question, choices: [...question.choices, newChoice] } : question
        );
        setQuestionsPostJob(updatedQuestions);
        setNewChoice(''); 
    };

    const deleteChoice = (questionId, choiceIndex) => {
        const updatedQuestions = questionsPostJob?.map(question =>
            question.id === questionId ? { ...question, choices: question.choices.filter((_, index) => index !== choiceIndex) } : question
        );
        setQuestionsPostJob(updatedQuestions);
    };

   
    useState(() => {
        const basicQuestions = [
            {
                id: 1,
                text: 'What is your preferred programming language?',
                type: 'Multi Choice',
                choices: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'],
            },
            {
                id: 2,
                text: 'What is your level of experience?',
                type: 'Multi Choice',
                choices: ['Beginner', 'Intermediate', 'Advanced'],
            },
            {
                id: 3,
                text: 'Which frontend framework do you prefer?',
                type: 'Single Choice',
                choices: ['React', 'Angular', 'Vue.js', 'Svelte'],
            },
            {
                id: 4,
                text: 'What is your preferred database?',
                type: 'Multi Choice',
                choices: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
            },
            {
                id: 5,
                text: 'What is your preferred operating system?',
                type: 'Multi Choice',
                choices: ['Windows', 'MacOS', 'Linux'],
            },
        ];
        setQuestionsPostJob(basicQuestions);

    }, []);

    useEffect(()=>{
        console.log('basic ques', questionsPostJob);

    }, [questionsPostJob])


    // Post Questions API
    
    

    return (
        <div>
            {questionsPostJob?.map((question) => (
                <div className='mb-4 flex flex-col gap-4 border-2 border-solid border-gray-400 px-4 pb-4 rounded-lg' key={question.id}>

                    <div className='pt-4 flex gap-4 justify-start items-center '>
                        <input
                        required
                            className='bg-[#f1f5f7] py-2 px-4 w-[500px] rounded-md'
                            type="text"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        />
                        <select
                            className='bg-[#f3f2f1] py-2 px-4 rounded-md'
                            value={question.type}
                            onChange={(e) => handleTypeChange(question.id, e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="Multi Choice">Multiple Choice</option>
                            <option value="Single Choice">Single Choice</option>
                        </select>
                        <button type="button" className='py-2 px-4 bg-red-600 rounded-md text-white text-[20px]' onClick={() => deleteQuestion(question.id)}>X</button>
                    </div>

                    {question.type === 'Multi Choice'   && (
                        <div>
                            {question.choices.map((choice, choiceIndex) => (
                                <div className='flex gap-2 mb-2' key={choiceIndex}>
                                    <input
                                    required
                                        className='border-1 border-solid border-gray-400 rounded-md px-2 py-2 w-[400px]'
                                        type="text"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(question.id, choiceIndex, e.target.value)}
                                    />
                                    <button type="button" className='text-[18px]' onClick={() => deleteChoice(question.id, choiceIndex)}>X</button>
                                </div>
                            ))}
                            <button type="button" className='py-2 px-4 bg-green-600 rounded-md text-white text-[15px]' onClick={() => addChoice(question.id, newChoice)}>Add Choice</button>
                        </div>
                    )}

                    {question.type === 'Single Choice'   && (
                        <div>
                            {question.choices.map((choice, choiceIndex) => (
                                <div className='flex gap-2 mb-2' key={choiceIndex}>
                                    <input
                                    required
                                        className='border-1 border-solid border-gray-400 rounded-md px-2 py-2 w-[400px]'
                                        type="text"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(question.id, choiceIndex, e.target.value)}
                                    />
                                    <button type="button" className='text-[18px]' onClick={() => deleteChoice(question.id, choiceIndex)}>X</button>
                                </div>
                            ))}
                            <button type="button" className='py-2 px-4 bg-green-600 rounded-md text-white text-[15px]' onClick={() => addChoice(question.id, newChoice)}>Add Choice</button>
                        </div>
                    )}

                </div>
            ))}
            <button type="button" className='bg-blue-600 p-2 text-white rounded-md' onClick={addQuestion}>Add Question</button>
        </div>
    );
};

export default QuestionsComponent;
