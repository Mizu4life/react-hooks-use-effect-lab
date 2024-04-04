import React, { useEffect, useRef, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  // //////// 1- setTimeOut method:
  // //setTimeout is a closure, therefore, when setTimeout is scheduled it uses the value of count at that exact moment in time
  // //to solve the issue of using setTimeOut with state: (we don't need it in this case, but will need it if we want to update timeRemaining while using setTimeOut)
  const timeRef= useRef(timeRemaining);
  timeRef.current  = timeRemaining; 

  useEffect(() => {
    const timer = setTimeout(() => setTimeRemaining(timeRef.current - 1), 1000)
    return () => clearTimeout(timer);
  },[onAnswered, timeRemaining]);

  
  // ////// 2- setInterval method
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeRemaining(timeRemaining - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [onAnswered, timeRemaining]);

  if(timeRemaining <= 0){
    onAnswered(false);
    setTimeRemaining(10);
  }
  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }
  
  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
