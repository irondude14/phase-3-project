import React from 'react';
import Step from './Step';

const StepList = ({ selectedSteps, onDeleteStep, onUpdateStep, taskID }) => {
  return (
    <div className='flex flex-col'>
      {selectedSteps ? (
        selectedSteps.map((step) => (
          <Step
            key={step.id}
            step={step}
            onDeleteStep={onDeleteStep}
            onUpdateStep={onUpdateStep}
            taskID={taskID}
          />
        ))
      ) : (
        <div>Your steps here.</div>
      )}
    </div>
  );
};

export default StepList;
