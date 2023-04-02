import React, { useState } from 'react';
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
  const [editTask, setEditTask] = useState(false);

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

  function handleEdit() {
    setEditTask(!editTask);
  }

  return (
    <div>
      <div className='pb-1'>
        <label>Tasks: </label>
        <select onChange={(e) => setTaskID(parseInt(e.target.value))}>
          {taskList}
        </select>
        {editTask ? (
          <button
            onClick={handleEdit}
            className='bg-gray-light hover:bg-gray rounded-sm shadow-lg ml-1'
          >
            <span>🚫</span>
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className='bg-gray-light hover:bg-gray rounded-sm shadow-lg ml-1'
          >
            <span>📝</span>
          </button>
        )}
        <button
          onClick={() =>
            handleDeleteBtn(parseInt(document.querySelector('select').value))
          }
          className='bg-gray-light hover:bg-gray rounded-sm shadow-lg ml-1'
        >
          🗑️
        </button>
      </div>
      <TaskForm
        taskID={taskID}
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        selectedTaskName={selectedTaskName}
        editTask={editTask}
        setEditTask={setEditTask}
      />
    </div>
  );
}
