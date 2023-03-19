import React from 'react';
import StepForm from './StepFrom';

export default function Steps({ filteredSteps }) {
  return (
    <div>
      <ul>
        {filteredSteps.map((step) => (
          <li key={step.id}>{step.name}</li>
        ))}
      </ul>
      <StepForm />
    </div>
  );
}
