import React, { useState } from 'react';

export default function Step({ step, onDeleteStep, onUpdateStep, taskID }) {
  const [stepName, setStepName] = useState(step.name);
  const [editStep, setEditStep] = useState(false);
  const [done, setDone] = useState(step.done);

  function handleDeleteBtn() {
    fetch(`http://localhost:9292/steps/` + step.id, {
      method: 'DELETE',
    });
    onDeleteStep(taskID, step.id);
  }

  function handleEdit() {
    setEditStep(!editStep);
  }

  function handleSaveChanges(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/steps/${step.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: stepName,
      }),
    })
      .then((r) => r.json())
      .then((updatedStep) => onUpdateStep(taskID, step.id, updatedStep));
    setStepName(``);
    setEditStep(!editStep);
  }

  function handleDoneUpdate(e) {
    e.preventDefault();
    setDone(!done);
    fetch(`http://localhost:9292/steps/${step.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: done,
      }),
    })
      .then((r) => r.json())
      .then((updatedStep) => onUpdateStep(taskID, step.id, updatedStep));
  }

  return (
    <div>
      {editStep ? (
        <form>
          <input
            type='text'
            name='name'
            value={stepName}
            onChange={(e) => setStepName(e.target.value)}
          />
          <button type='submit' onClick={handleSaveChanges}>
            Save
          </button>
        </form>
      ) : (
        <>{step.name}</>
      )}
      <label>
        <input type='checkbox' checked={done} onChange={handleDoneUpdate} />
        Done
      </label>
      {editStep ? (
        <button onClick={handleEdit}>
          <span>🚫</span>
        </button>
      ) : (
        <button onClick={handleEdit}>
          <span>📝</span>
        </button>
      )}
      <button onClick={handleDeleteBtn}>
        <span>🗑️</span>
      </button>
    </div>
  );
}
