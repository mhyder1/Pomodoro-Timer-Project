import React from 'react';
import { minutesToDuration, secondsToDuration } from '../utils/duration';


function SessionDisplay({ ariaValue, session, focusDuration, breakDuration}) {
  
 // will display during a focus or break session
  return( session &&
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {session && session.label} for {("0" + (session.label.toLowerCase().indexOf("ocus") > 0 ? focusDuration : breakDuration)).substr(-2)}:00 minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session.timeRemaining)} remaining
          </p>
        </div>
      </div>
      {/* progress bar */}
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={ariaValue()
              }
              style={{
                width: `${ariaValue()}%` 
              }}
            />
          </div>
        </div>
      </div>
     </div>
   
  );
}

export default SessionDisplay;