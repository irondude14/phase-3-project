import React from 'react';
import Step from './Step';
import StepForm from './StepFrom';

const StepList = ({
  filteredSteps,
  onDeleteStep,
  onUpdateStep,
  taskID,
  onAddStep,
}) => {
  return (
    <div>
      {filteredSteps.map((step) => (
        <ul key={step.id}>
          <Step
            step={step}
            onDeleteStep={onDeleteStep}
            onUpdateStep={onUpdateStep}
          />
        </ul>
      ))}
      <StepForm taskID={taskID} onAddStep={onAddStep} />
    </div>
  );
};

export default StepList;
