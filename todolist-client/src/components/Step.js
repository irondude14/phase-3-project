import React from 'react';

export default function Step({ step, onDeleteStep }) {
  function handleDeleteBtn() {
    fetch(`http://localhost:9292/steps/` + step.id, {
      method: 'DELETE',
    });
    onDeleteStep(step.id);
  }

  return (
    <div>
      <li>
        <>{step.name}</>
        <button>Done</button>
        <button>
          <span>✏️</span>
        </button>
        <button onClick={handleDeleteBtn}>
          <span>🗑</span>
        </button>
      </li>
    </div>
  );
}
