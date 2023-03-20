import React from 'react';

export default function Tasks({ tasks, setTaskID, onDeleteTask }) {
  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  function handleDeleteBtn(taskId) {
    fetch(`http://localhost:9292/tasks/${taskId}`, {
      method: 'DELETE',
    });
    onDeleteTask(taskId);
  }

  return (
    <div>
      <label>Tasks:</label>
      <select onChange={(e) => setTaskID(parseInt(e.target.value))}>
        {taskList}
      </select>
      <button
        onClick={() =>
          handleDeleteBtn(parseInt(document.querySelector('select').value))
        }
      >
        🗑️
      </button>
    </div>
  );
}
