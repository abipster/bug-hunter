// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 11;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
