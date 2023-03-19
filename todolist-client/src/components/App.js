import React from 'react';
import List from './List';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [steps, setSteps] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [filteredSteps, setFilteredSteps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/tasks')
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:9292/steps')
      .then((r) => r.json())
      .then((data) => setSteps(data));
  }, []);

  function handleSelect(id) {
    setTaskId(id);
  }

  useEffect(() => {
    let filteredSteps = steps.filter((step) => step.task_id === taskId);
    setFilteredSteps(filteredSteps);
  }, [steps, taskId]);

  console.log(taskId);
  console.log(filteredSteps);

  return (
    <div>
      <List tasks={tasks} steps={filteredSteps} onHandleSelect={handleSelect} />
    </div>
  );
}

export default App;
