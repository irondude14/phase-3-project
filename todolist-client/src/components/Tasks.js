import React from 'react';
import TaskForm from './TaskFrom';

export default function Tasks({
  tasks,
  taskID,
  setTaskID,
  onDeleteTask,
  onUpdateTask,
  onAddTask,
}) {
  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  function handleDeleteBtn(taskID) {
    fetch(`http://localhost:9292/tasks/${taskID}`, {
      method: 'DELETE',
    }).then(() => onDeleteTask(taskID));
  }

  return (
    <div>
      <label>Tasks: </label>
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
      <TaskForm
        taskID={taskID}
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
}
