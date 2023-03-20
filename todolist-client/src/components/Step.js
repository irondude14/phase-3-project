import React, { useState } from 'react';

export default function Step({ step, onDeleteStep, onUpdateStep }) {
  const [stepName, setStepName] = useState(`${step.name}`);
  const [editStep, setEditStep] = useState(false);
  const [done, setDone] = useState(false);

  function handleDeleteBtn() {
    fetch(`http://localhost:9292/steps/` + step.id, {
      method: 'DELETE',
    });
    onDeleteStep(step.id);
  }

  function handleEdit() {
    setEditStep(!editStep);
  }

  function handleSaveChanges(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/steps/${step.id}/name`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: stepName,
      }),
    })
      .then((r) => r.json())
      .then((updatedStep) => onUpdateStep(updatedStep));
    setStepName(`${step.name}`);
    setEditStep(!editStep);
  }

  function handleDoneUndone(e) {
    e.preventDefault();
    setDone(!done);
    fetch(`http://localhost:9292/steps/${step.id}/done`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: done ? 0 : 1,
      }),
    });
  }

  return (
    <div>
      <li>
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
        {step.done ? (
          <button onClick={handleDoneUndone}>Undo</button>
        ) : (
          <button onClick={handleDoneUndone}>Done</button>
        )}
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
      </li>
    </div>
  );
}
