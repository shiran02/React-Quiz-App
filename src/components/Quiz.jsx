import { useState } from "react";
import QUESTIONS from "../questions";


export default function Quiz(){

    // const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
    const [userAnswers,setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectAnswer){
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectAnswer];
        });
    }

    return( 
        <div id="quiz" >
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer)=>(
                        <li key={answer} className="answer">
                            <button onClick={() =>handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
}