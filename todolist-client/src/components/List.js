import React from 'react';
import Task from './Task';
import Step from './Step';

export default function List({ tasks, steps }) {
  return (
    <div>
      <h1>Hello There!</h1>
      <Task />
      <Step />
    </div>
  );
}
