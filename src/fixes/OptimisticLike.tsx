import { useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 15;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
