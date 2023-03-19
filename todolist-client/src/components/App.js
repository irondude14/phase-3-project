import React from 'react';
import Tasks from './Tasks';
import Step from './Step';
import StepForm from './StepFrom';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [steps, setSteps] = useState([]);
  const [taskID, setTaskID] = useState(1);
  const [filteredSteps, setFilteredSteps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/tasks')
      .then((r) => r.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  useEffect(() => {
    fetch('http://localhost:9292/steps')
      .then((r) => r.json())
      .then((steps) => setSteps(steps));
  }, []);

  useEffect(() => {
    const filteredSteps = steps.filter((step) => step.task_id === taskID);
    setFilteredSteps(filteredSteps);
  }, [taskID, steps]);

  function handleAddStep(newStep) {
    setSteps([...steps, newStep]);
  }

  function handleDeleteStep(id) {
    const updatedSteps = steps.filter((step) => step.id !== id);
    setSteps(updatedSteps);
  }

  return (
    <div>
      <Tasks tasks={tasks} setTaskID={setTaskID} />
      {filteredSteps.map((step) => (
        <ul key={step.id}>
          <Step step={step} onDeleteStep={handleDeleteStep} />
        </ul>
      ))}
      <StepForm taskID={taskID} onAddStep={handleAddStep} />
    </div>
  );
}

export default App;
