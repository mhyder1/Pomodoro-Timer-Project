import React from 'react';
import { minutesToDuration } from '../utils/duration';

function FocusControl({ focusDuration, handleFocusDecrease, handleFocusIncrease, session }) {

  return (
    <div className="col">
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        Focus Duration: {minutesToDuration(focusDuration)}
      </span>
      <div className="input-group-append">
        {/* Decreases focus duration by 5 minutes */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={handleFocusDecrease}
          disabled={focusDuration === 5 || !!session}
        >
          <span className="oi oi-minus" />
        </button>
        {/* Increases Focus session by 5 minutes */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={handleFocusIncrease}
          disabled={focusDuration === 60 || !!session}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  </div>
  );
}

export default FocusControl;