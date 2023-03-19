import React from 'react';
import Tasks from './Tasks';
import Steps from './Steps';
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

  return (
    <div>
      <Tasks tasks={tasks} setTaskID={setTaskID} />
      <Steps filteredSteps={filteredSteps} />
    </div>
  );
}

export default App;
