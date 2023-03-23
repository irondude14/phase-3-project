import React, { useState } from 'react';
import TaskForm from './TaskFrom';

export default function Tasks({
  tasks,
  setTaskID,
  onDeleteTask,
  onUpdateTask,
  onAddTask,
}) {
  const [editTask, setEditTask] = useState(false);
  const [taskName, setTaskName] = useState();

  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  function handleEdit() {
    setEditTask(!editTask);
  }

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
      {editTask ? (
        <button onClick={handleEdit}>
          <span>🚫</span>
        </button>
      ) : (
        <button onClick={handleEdit}>
          <span>📝</span>
        </button>
      )}
      <button
        onClick={() =>
          handleDeleteBtn(parseInt(document.querySelector('select').value))
        }
      >
        🗑️
      </button>
      <TaskForm onAddTask={onAddTask} />
    </div>
  );
}
