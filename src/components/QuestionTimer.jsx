
import { useState ,useEffect} from "react";

export default function QuestionTimer({timeout,onTimeout}){

    const [remainingTime , setRemainingTime] = useState(timeout);

    
    useEffect(()=> {
        console.log('Setting TIme out');
        const timer = setTimeout(onTimeout,timeout);

        return ()=>{
            clearTimeout(timer);
        };

    }, [timeout,onTimeout]);
    

    

    useEffect(()=>{
        console.log('Setting Interval');

        const interval = setInterval(()=>{
            setRemainingTime(prevRemainingTime => prevRemainingTime-100);
        },100);

        return ()=>{
            clearInterval(interval);
        };
    },[

    ]);
    return <progress id="question-time" max={timeout} value={remainingTime}/>
}