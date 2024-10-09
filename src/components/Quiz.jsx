import { useState ,useCallback} from "react";
import QUESTIONS from "../questions";
import quizCompleImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

export default function Quiz(){

    // const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
    const [answerState,setAnswerState] =  useState('');
    const [userAnswers,setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ?  userAnswers.length :  userAnswers.length -1;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ){
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });

        setTimeout(()=>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(()=>{
                setAnswerState('')
            },2000);
        },1000);
    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer]);

    if(quizIsCompleted){
        return <div id="summary">
            <img src={quizCompleImg} alt="Trophy icon"/>
            <h2>Quiz Is Completed</h2>
        </div>
    }
    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleAnswers.sort(()=>Math.random() - 0.5);

    

        return( 
            <div id="quiz" >
                <div id="question">
                    <QuestionTimer 
                        key={activeQuestionIndex}
                        timeout={10000} 
                        onTimeout={handleSelectAnswer}
                    />
                    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                    <ul id="answers">
                        {shuffleAnswers.map((answer)=>{

                            const isSelected = userAnswers[userAnswers.length - 1] === answer ;

                            let cssClasses = '';

                            if(answerState === 'answered' && isSelected){
                                cssClasses = 'selected';
                            }

                            if((answerState === 'correct' || answerState ==='wrong') && isSelected){
                                cssClasses= answerState;
                            }

                           return <li key={answer} className="answer">
                            <button onClick={() =>handleSelectAnswer(answer)} 
                                className={cssClasses}
                            >
                                {answer}
                            </button>
                        </li>;
                        }
                            
                        )}
                    </ul>
                </div>
            </div>
            
        );
    

    
}