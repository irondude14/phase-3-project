import React from 'react';

export default function Tasks({ tasks, setTaskID }) {
  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  return (
    <div>
      <label>Tasks:</label>
      <select onChange={(e) => setTaskID(parseInt(e.target.value))}>
        {taskList}
      </select>
    </div>
  );
}
