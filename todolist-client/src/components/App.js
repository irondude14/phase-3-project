import React from 'react';
import Tasks from './Tasks';
import Step from './Step';
import StepForm from './StepFrom';
import TaskForm from './TaskFrom';
import StepList from './StepList';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskID, setTaskID] = useState(1);
  const [filteredSteps, setFilteredSteps] = useState([]);

  // Original fetch request

  useEffect(() => {
    fetch('http://localhost:9292/tasks')
      .then((r) => r.json())
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

  useEffect(() => {
    const selectTask = tasks.find((task) => task.id === taskID);
    const selectSteps = selectTask ? selectTask.steps : [];
    setFilteredSteps(selectSteps);
  }, [taskID, tasks]);

  // Extracting associated Steps

  const selectTask = tasks.find((task) => task.id === taskID);
  const selectSteps = selectTask ? selectTask.steps : [];

  // Function to handle Tasks updates

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleUpdateTask(updatedTask) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  // Function to handle Steps updates

  function handleAddStep(taskID, newStep) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskID) {
          const updatedSteps = [...task.steps, newStep];
          return { ...task, steps: updatedSteps };
        }
        return task;
      });
      return updatedTasks;
    });
  }

  function handleDeleteStep(taskID, stepID) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskID) {
          const updatedSteps = task.steps.filter((step) => step.id !== stepID);
          return { ...task, steps: updatedSteps };
        }
        return task;
      });
      return updatedTasks;
    });
  }

  function handleUpdateStep(taskID, stepID, updatedStep) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskID) {
          const updatedSteps = task.steps.map((step) =>
            step.id === stepID ? updatedStep : step
          );
          return { ...task, steps: updatedSteps };
        }
        return task;
      });
      return updatedTasks;
    });
  }

  return (
    <div>
      <Tasks
        tasks={tasks}
        setTaskID={setTaskID}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
        onAddTask={handleAddTask}
      />
      <StepList
        selectSteps={selectSteps}
        onDeleteStep={handleDeleteStep}
        onUpdateStep={handleUpdateStep}
        taskID={taskID}
        onAddStep={handleAddStep}
      />
    </div>
  );
}

export default App;
