import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 15;
export const getDescription: Exercise['getDescription'] = () => 'Double-clicking the like button leaves the count off by one; when the request fails the UI still shows the new state.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  'Can `liked` and `count` drift apart? Could one be derived from the other?',
  'What should happen to the UI when `api` throws?',
  'What if the user clicks again while a request is in flight?',
];

async function api(liked: boolean) {
  await new Promise(r => setTimeout(r, 800));
  if (Math.random() < 0.4) throw new Error('boom');
  return { liked };
}

export default function OptimisticLike() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(10);

  const toggle = async () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    await api(!liked);
  };

  return <button onClick={toggle}>{liked ? '♥' : '♡'} {count}</button>;
}
