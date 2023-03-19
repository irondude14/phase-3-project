import React from 'react';

export default function Task({ tasks, onHandleSelect }) {
  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  return (
    <div>
      <label>Tasks:</label>
      <select onChange={(event) => onHandleSelect(event.target.value)}>
        {taskList}
      </select>
    </div>
  );
}
