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
      <form onSubmit={handleSubmit}>
        <label>Add a Task: </label>
        <input
          type='text'
          name='name'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {editTask ? (
        <form>
          <label>Update the Task: </label>
          <input
            type='text'
            name='updatedName'
            placeholder={selectedTaskName}
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
          <button type='submit' onClick={handleSaveChanges}>
            Save
          </button>
        </form>
      ) : null}
      {editTask ? (
        <button onClick={handleEdit}>
          <span>🚫</span>
        </button>
      ) : (
        <button onClick={handleEdit}>
          <span>📝</span>
        </button>
      )}
    </div>
  );
}
