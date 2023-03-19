import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newTaskForm = {
      name: taskName,
    };

    fetch('http://localhost:9292/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskForm),
    })
      .then((r) => r.json())
      .then((newTask) => {
        onAddTask(newTask);
        setTaskName('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Task:</label>
      <input
        type='text'
        name='name'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
