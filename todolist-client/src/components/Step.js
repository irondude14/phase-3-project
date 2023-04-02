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
    const newDone = !done;
    setDone(newDone);
    fetch(`http://localhost:9292/steps/${step.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: newDone,
      }),
    })
      .then((r) => r.json())
      .then((updatedStep) => onUpdateStep(taskID, step.id, updatedStep));
  }

  return (
    <div className='flex pb-1 space-x-1 justify-end mr-5'>
      {editStep ? (
        <form>
          <input
            type='text'
            name='name'
            value={stepName}
            onChange={(e) => setStepName(e.target.value)}
          />
          <button
            type='submit'
            onClick={handleSaveChanges}
            className='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 ml-1'
          >
            Save
          </button>
        </form>
      ) : (
        <ul className='flex-1'>{step.name}</ul>
      )}
      <label className='flex justify-center'>
        <input type='checkbox' checked={done} onChange={handleDoneUpdate} />
        Done
      </label>
      {editStep ? (
        <button
          onClick={handleEdit}
          className='bg-gray-light hover:bg-gray rounded-sm shadow-lg'
        >
          <span>🚫</span>
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className='bg-gray-light hover:bg-gray rounded-sm shadow-lg'
        >
          <span>📝</span>
        </button>
      )}
      <button
        onClick={handleDeleteBtn}
        className='bg-gray-light hover:bg-gray rounded-sm shadow-lg'
      >
        <span>🗑️</span>
      </button>
    </div>
  );
}
