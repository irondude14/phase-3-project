import React, { useState } from 'react';

export default function StepForm({ taskID, onAddStep }) {
  const [stepName, setStepName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/tasks/${taskID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: stepName,
      }),
    })
      .then((r) => r.json())
      .then((newStep) => {
        onAddStep(taskID, newStep);
        setStepName('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Step: </label>
      <input
        type='text'
        name='name'
        value={stepName}
        onChange={(e) => setStepName(e.target.value)}
      />
      <button
        type='submit'
        class='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 pr-1 ml-2'
      >
        Submit
      </button>
    </form>
  );
}
