import { useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 1;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the counter here: "+3" should add 3, and the alert should show the latest count.'

export default function Uncounter() {
  const [count, setCount] = useState(0);

  const addThree = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const logLater = () => {
    setTimeout(() => alert(`Count is ${count}`), 2000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addThree}>+3</button>
      <button onClick={logLater}>Alert in 2s</button>
    </div>
  );
}