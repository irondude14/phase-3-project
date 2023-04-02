import React from 'react';
import TaskForm from './TaskFrom';

export default function Tasks({
  tasks,
  taskID,
  setTaskID,
  onDeleteTask,
  onUpdateTask,
  onAddTask,
  selectedTaskName,
}) {
  const taskList = tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ));

  function handleDeleteBtn(taskID) {
    fetch(`http://localhost:9292/tasks/${taskID}`, {
      method: 'DELETE',
    });
    onDeleteTask(taskID);
  }

  return (
    <div>
      <div class='pb-1'>
        <label>Tasks: </label>
        <select onChange={(e) => setTaskID(parseInt(e.target.value))}>
          {taskList}
        </select>
        <button
          onClick={() =>
            handleDeleteBtn(parseInt(document.querySelector('select').value))
          }
          class='bg-gray-light hover:bg-gray rounded-sm shadow-lg ml-1'
        >
          🗑️
        </button>
      </div>
      <TaskForm
        taskID={taskID}
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        selectedTaskName={selectedTaskName}
      />
    </div>
  );
}
