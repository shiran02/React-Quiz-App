import { useState ,useCallback} from "react";
import QUESTIONS from "../questions";
import quizCompleImg from '../assets/quiz-complete.png';


import Question from "./Question";


export default function Quiz(){

    

    
    const [userAnswers,setUserAnswers] = useState([]);

    const activeQuestionIndex =  userAnswers.length;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ){
       
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });

        
    },[]);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer]);

    if(quizIsCompleted){
        return <div id="summary">
            <img src={quizCompleImg} alt="Trophy icon"/>
            <h2>Quiz Is Completed</h2>
        </div>
    }
   
     

    

        return( 
            <div id="quiz" >
                <Question
                    key={activeQuestionIndex}
                    index={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}
                />
            </div>
            
        );
    

    
}