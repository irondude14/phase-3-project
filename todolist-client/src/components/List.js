import React from 'react';
import Task from './Task';
import Step from './Step';

export default function List({ tasks, steps, onHandleSelect }) {
  return (
    <div>
      <h1>Hello There!</h1>
      <Task tasks={tasks} onHandleSelect={onHandleSelect} />
      <Step steps={steps} />
    </div>
  );
}
