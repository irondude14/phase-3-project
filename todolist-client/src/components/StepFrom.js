import React, { useState } from 'react';

export default function StepForm({ taskID, onAddStep }) {
  const [stepName, setStepName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newStepForm = {
      name: stepName,
      done: parseInt(0),
      task_id: parseInt(taskID),
    };

    fetch('http://localhost:9292/steps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStepForm),
    })
      .then((r) => r.json())
      .then((newStep) => {
        onAddStep(newStep);
        setStepName('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Step:</label>
      <input
        type='text'
        name='name'
        value={stepName}
        onChange={(e) => setStepName(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
