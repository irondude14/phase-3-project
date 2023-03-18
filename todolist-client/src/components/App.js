import React from 'react';
import List from './List';
import { useEffect, useState } from 'react';

function App() {
  let [tasks, setTasks] = useState([]);
  let [steps, setSteps] = useState([]);

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

  return (
    <div className='App'>
      <List tasks={tasks} steps={steps} />
    </div>
  );
}

export default App;
