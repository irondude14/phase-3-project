import React from 'react';
import StepForm from './StepFrom';

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
      <StepForm />
    </div>
  );
}
