import React from 'react';
import Tasks from './Tasks';
import StepList from './StepList';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskID, setTaskID] = useState(1);
  const [selectedSteps, setSelectedSteps] = useState([]);

  // Original fetch request

  useEffect(() => {
    fetch('http://localhost:9292/tasks')
      .then((r) => r.json())
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

  // Extracting associated Steps

  useEffect(() => {
    const pickTask = tasks.find((task) => task.id === taskID);
    const pickSteps = pickTask ? pickTask.steps : [];
    setSelectedSteps(pickSteps);
  }, [taskID, tasks]);

  // Function to handle Tasks updates

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleUpdateTask(taskID, updatedTask) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskID) {
          return { ...updatedTask, id: taskID };
        }
        return task;
      });
      return updatedTasks;
    });
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

    const selectedTask = tasks.find((task) => task.id === taskID);
    const updatedSteps = selectedTask ? selectedTask.steps : [];
    setSelectedSteps(updatedSteps);
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
      <h1>To-Do App</h1>
      <Tasks
        tasks={tasks}
        taskID={taskID}
        setTaskID={setTaskID}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
        onAddTask={handleAddTask}
      />
      <StepList
        selectedSteps={selectedSteps}
        onDeleteStep={handleDeleteStep}
        onUpdateStep={handleUpdateStep}
        taskID={taskID}
        onAddStep={handleAddStep}
      />
    </div>
  );
}

export default App;
