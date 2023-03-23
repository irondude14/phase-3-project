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

  function handleAddStep(newStep) {
    setFilteredSteps([...filteredSteps, newStep]);
  }

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteStep(id) {
    const updatedSteps = filteredSteps.filter((step) => step.id !== id);
    setFilteredSteps(updatedSteps);
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleUpdateStep(taskID, stepID, updatedStep) {
    const updatedSteps = filteredSteps.map((step) => {
      if (step.id === updatedStep.id) {
        return updatedStep;
      } else {
        return step;
      }
    });
    setFilteredSteps(updatedSteps);
  }

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <Tasks
        tasks={tasks}
        setTaskID={setTaskID}
        onDeleteTask={handleDeleteTask}
      />
      <StepList
        filteredSteps={filteredSteps}
        onDeleteStep={handleDeleteStep}
        onUpdateStep={handleUpdateStep}
        taskID={taskID}
        onAddStep={handleAddStep}
      />
    </div>
  );
}

export default App;
