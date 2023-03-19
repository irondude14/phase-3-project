import React from 'react';
import StepForm from './StepFrom';

export default function Step({ steps }) {
  // let [stepList, setStepList] = useState([]);

  // useEffect(() => {
  //   let filteredSteps = steps.filter((step) => step.task_id === taskId);
  //   setStepList(filteredSteps);
  // }, [steps, taskId]);

  // console.log(stepList);

  const stepList = steps.map((step) => <li key={step.id}>{step.name}</li>);

  return (
    <div>
      <ul>{stepList}</ul>
      <StepForm />
    </div>
  );
}
