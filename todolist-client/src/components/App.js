import React from 'react';
import Tasks from './Tasks';
import StepList from './StepList';
import StepForm from './StepFrom';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskID, setTaskID] = useState(1);

  // Original fetch request

  useEffect(() => {
    fetch(`http://localhost:9292/tasks`)
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  console.log(tasks);

  // Extracting associated Steps & Name of the Task

  const findTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const taskIdToFind = 1;
  const taskToFind = findTaskById(taskIdToFind);

  let selectedTaskName, selectedSteps;
  if (taskToFind) {
    selectedTaskName = taskToFind.name;
    selectedSteps = taskToFind.steps;
  } else {
    selectedTaskName = '';
    selectedSteps = [];
  }

  console.log(selectedTaskName);
  console.log(selectedSteps);

  // Extracting associated Steps

  // let selectedTask = tasks.find((task) => task.id === 1);
  // let selectedSteps = selectedTask ? selectedTask.steps : [];
  // let selectedTaskName = selectedTask.name;
  // console.log(selectedTask);
  // console.log(selectedSteps);
  // console.log(selectedTaskName);

  // Function to handle Tasks updates

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleUpdateTask(taskID, updatedTask) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...updatedTask, id: taskID };
      }
      return task;
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
      <h1>To-Do App</h1>
      <Tasks
        tasks={tasks}
        taskID={taskID}
        setTaskID={setTaskID}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
        onAddTask={handleAddTask}
        selectedTaskName={selectedTaskName}
      />
      <StepList
        selectedSteps={selectedSteps}
        onDeleteStep={handleDeleteStep}
        onUpdateStep={handleUpdateStep}
        taskID={taskID}
        onAddStep={handleAddStep}
      />
      <StepForm taskID={taskID} onAddStep={handleAddStep} />
    </div>
  );
}

export default App;
