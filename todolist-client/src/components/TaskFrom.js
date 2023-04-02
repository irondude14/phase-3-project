import React, { useState } from 'react';

export default function TaskForm({
  taskID,
  onAddTask,
  onUpdateTask,
  selectedTaskName,
}) {
  const [taskName, setTaskName] = useState('');
  const [editTask, setEditTask] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState('');

  function handleEdit() {
    setEditTask(!editTask);
  }

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
        <form class='pr-3 pt-1'>
          <label>New Name: </label>
          <input
            type='text'
            name='updatedName'
            placeholder={selectedTaskName}
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <button
            type='submit'
            onClick={handleSaveChanges}
            class='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 pr-1 ml-2'
          >
            Save
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Add a Task: </label>
          <input
            type='text'
            name='name'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            class=''
          />
          <button
            type='submit'
            class='bg-gray-light hover:bg-gray rounded-sm shadow-lg p-0.2 pr-1 ml-2'
          >
            Submit
          </button>
        </form>
      )}
      {editTask ? (
        <button
          onClick={handleEdit}
          class='bg-gray-light hover:bg-gray rounded-sm shadow-lg'
        >
          <span>🚫</span>
        </button>
      ) : (
        <button
          onClick={handleEdit}
          class='bg-gray-light hover:bg-gray rounded-sm shadow-lg'
        >
          <span>📝</span>
        </button>
      )}
    </div>
  );
}
