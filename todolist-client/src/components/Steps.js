import React from 'react';

export default function Steps({ filteredSteps }) {
  return (
    <div>
      <ul>
        {filteredSteps.map((step) => (
          <li key={step.id}>
            <>{step.name}</>
            <button>Done</button>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
