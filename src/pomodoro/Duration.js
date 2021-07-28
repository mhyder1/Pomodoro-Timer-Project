import React from "react";
import classNames from "../utils/class-names";
import { minutesToDuration } from '../utils/duration';

function Duration({
  focusDuration, 
  breakDuration, 
  handleDecreaseFocus,
  handleIncreaseFocus,
  handleDecreaseBreak, 
  handleIncreaseBreak,
  session,
 }) {
  
 
return (
<div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* Displays the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* Decreases focus duration and is disabled during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onclick = {handleDecreaseFocus}
                disabled= {session || focusDuration===5}
              >
                <span className="oi oi-minus" />
              </button>
              {/* Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick = {handleIncreaseFocus}
                disabled = {session || focusDuration===60}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* Displays the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* Decreases break duration and is disabled during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick = {handleDecreaseBreak}
                  disabled = {session || breakDuration===1}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* Increases break duration and is disabled during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick = {handleIncreaseBreak}
                  disabled = {session || breakDuration===15}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }

export default Duration;

