import React from 'react';
import Step from './Step';
import StepForm from './StepFrom';

const StepList = ({
  selectedSteps,
  onDeleteStep,
  onUpdateStep,
  taskID,
  onAddStep,
}) => {
  return (
    <div>
      {selectedSteps.map((step) => (
        <ul key={step.id}>
          <Step
            step={step}
            onDeleteStep={onDeleteStep}
            onUpdateStep={onUpdateStep}
            taskID={taskID}
          />
        </ul>
      ))}
      <StepForm taskID={taskID} onAddStep={onAddStep} />
    </div>
  );
};

export default StepList;
