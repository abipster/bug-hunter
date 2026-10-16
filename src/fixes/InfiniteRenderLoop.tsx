import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 3;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
