import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 1;
export const getDescription: Exercise['getDescription'] = () => 'Counter that will not count. Clicking "+3" adds only 1. The label shows the old value in the alert.'
export const getDifficulty: Exercise['getDifficulty'] = () => 1
export const getHints: Exercise['getHints'] = () => [
  'Each render is a snapshot. Which count do the three calls see? Which count does the timeout capture?'
]
export const getFix: Exercise['getFix'] = () => [
  'Use the updater form: `setCount(c => c + 1)` three times. The alert showing the value from click time is correct snapshot behaviour;',
  'If you want the latest value, read it from a ref (`const latest = useRef(count); latest.current = count;`).'
]

export default function Counter() {
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