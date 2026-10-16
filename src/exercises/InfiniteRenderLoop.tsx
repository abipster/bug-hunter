import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 3;
export const getDescription: Exercise['getDescription'] = () => '"Too many re-renders" or the network tab floods with requests.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'Open the Network tab. What is the identity of `options` on each render?',
  'Does the fetch even depend on `filter`?',
];

type User = { id: number; name: string };

export default function InfiniteRenderLoop() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const options = { limit: 5, filter };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?_limit=${options.limit}`)
      .then(r => r.json())
      .then(setUsers);
  }, [options]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {users
          .filter(u => u.name.toLowerCase().includes(filter.toLowerCase()))
          .map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}
