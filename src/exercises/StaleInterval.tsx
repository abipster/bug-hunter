import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 5;
export const getDescription: Exercise['getDescription'] = () => 'The timer jumps to 1 and stays there; the "Log" button always prints 0 after the start.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'Two bugs: what does the interval callback close over, and who clears the interval on stop/unmount?',
];
export const getFix: Exercise['getFix'] = () => [
  `useEffect(() => {
  if (!running) return;
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);
}, [running]);`,
  'Under StrictMode the missing cleanup makes the bug worse (two intervals, counting by 2).',
];

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
