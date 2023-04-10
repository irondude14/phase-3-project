import React, { useState, useEffect } from 'react';

export default function TaskForm({
  taskID,
  onAddTask,
  onUpdateTask,
  selectedTaskName,
  editTask,
  setEditTask,
}) {
  const [taskName, setTaskName] = useState('');
  const [updatedTaskName, setUpdatedTaskName] = useState(
    selectedTaskName || ''
  );

  useEffect(() => {
    setUpdatedTaskName(selectedTaskName);
  }, [selectedTaskName]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:9292/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
      }),
    })
      .then((r) => r.json())
      .then((newTask) => {
        onAddTask(newTask);
        setTaskName('');
      });
  }

  function handleSaveChanges(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/tasks/${taskID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedTaskName,
      }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        onUpdateTask(Number(taskID), updatedTask);
        setUpdatedTaskName('');
        setEditTask(false);
      });
  }

  return (
    <div>
      {editTask ? (
        <form className='pr-3 pb-1'>
          <label>New Name: </label>
          <input
            type='text'
            name='updatedName'
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <button
            type='submit'
            onClick={handleSaveChanges}
            className='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 pr-1 ml-2'
          >
            Save
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className='pr-3 pb-1'>
          <label>Add a Task: </label>
          <input
            type='text'
            name='name'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className=''
          />
          <button
            type='submit'
            className='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 pr-1 ml-2'
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
