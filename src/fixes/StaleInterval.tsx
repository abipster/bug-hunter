import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 5;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

export default function StaleInterval() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, [running]);

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={() => setRunning(r => !r)}>{running ? 'Stop' : 'Start'}</button>
    </div>
  );
}
