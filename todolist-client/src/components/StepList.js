import React from 'react';
import Step from './Step';

const StepList = ({ selectedSteps, onDeleteStep, onUpdateStep, taskID }) => {
  return (
    <div className='flex flex-col'>
      {selectedSteps.map((step) => (
        <Step
          key={step.id}
          step={step}
          onDeleteStep={onDeleteStep}
          onUpdateStep={onUpdateStep}
          taskID={taskID}
        />
      ))}
    </div>
  );
};

export default StepList;
