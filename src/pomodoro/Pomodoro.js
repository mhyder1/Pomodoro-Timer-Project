import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusControl from "./FocusControl";
import BreakControl from "./BreakControl";
import TimerButtons from "./TimerButtons";
import SessionDisplay from "./SessionDisplay";
// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [session, setSession] = useState(null);

  
  const handleFocusDecrease = () => {
    setFocusDuration(Math.max(5, focusDuration - 5));
  };
  const handleFocusIncrase = () => {
    setFocusDuration(Math.min(60, focusDuration + 5));
  };

  const handleBreakDecrease = () => {
    setBreakDuration(Math.max(1, breakDuration - 1));
  };
  const handleBreakIncrease = () => {
    setBreakDuration(Math.min(15, breakDuration + 1));
  };

  const handleStop = () => {
    setIsTimerRunning(false);
    setSession(null);
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  //value for progress bar percentage
   function ariaValue(){
     if(!session) return null;
     if(session.label === "Focusing") return 100 - (((session.timeRemaining)/(focusDuration*60)) * 100);
     else return 100 - (((session.timeRemaining)/(breakDuration*60)) * 100);
  }
  
  return (
    <div className="pomodoro">
      <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css"
      integrity="sha512-UyNhw5RNpQaCai2EdC+Js0QL4RlVmiq41DkmCJsRV3ZxipG2L0HhTqIf/H9Hp8ez2EnFlkBnjRGJU2stW3Lj+w=="
      crossorigin="anonymous"
    />
       <div className="row">
        
        <FocusControl handleFocusDecrease={handleFocusDecrease}
        focusDuration={focusDuration}
        handleFocusIncrease={handleFocusIncrase} 
        session={session}
        />
        <BreakControl handleBreakDecrease={handleBreakDecrease}
        breakDuration={breakDuration}
        handleBreakIncrease={handleBreakIncrease}
        session={session}
        />  
      </div>

      <div>
        <TimerButtons isTimerRunning={isTimerRunning}
          playPause={playPause} 
          session={session}
          handleStop={handleStop}
        />
        <SessionDisplay session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          ariaValue={ariaValue}
        />
        </div>
     </div>
  );
}

export default Pomodoro;
