// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 11;
export const getDescription: Exercise['getDescription'] = () => 'Console warning about the effect callback, plus occasional updates after navigating away; unhandled rejection on 500s.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  'What does an effect callback have to return?',
  'Does clicking "Next" refetch? Check the dependency array.',
  'What happens on a non-2xx response, or when the component unmounts mid-request?',
];
export const getFix: Exercise['getFix'] = () => [
  'Effects cannot be `async`; define the async function inside and call it.',
  'Add `id` to deps (otherwise "Next" never refetches), abort in cleanup, check `res.ok`, handle errors.',
  'Clear stale data when `id` changes (or render `<Post key={id} id={id} />`). Or replace the whole thing with `useQuery`.',
];

function Post({ id }: { id: number }) {
  const [post, setPost] = useState<{ title: string }>();

  useEffect(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    setPost(data);
  }, []);

  return <h2>{post?.title}</h2>;
}

export default function AsyncEffect() {
  const [id, setId] = useState(1);
  return (
    <div>
      <button onClick={() => setId(i => i + 1)}>Next</button>
      <Post id={id} />
    </div>
  );
}
