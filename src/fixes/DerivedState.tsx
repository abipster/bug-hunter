import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 7;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

type User = { id: number; name: string; email: string };
const USERS: User[] = [
  { id: 1, name: 'Ana', email: 'ana@x.com' },
  { id: 2, name: 'Bruno', email: 'bruno@x.com' },
];

function UserForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name);
  const [fullLabel, setFullLabel] = useState('');

  useEffect(() => {
    setFullLabel(`${name} <${user.email}>`);
  }, [name]);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>{fullLabel}</p>
    </div>
  );
}

export default function DerivedState() {
  const [selected, setSelected] = useState(USERS[0]);
  return (
    <div>
      {USERS.map(u => <button key={u.id} onClick={() => setSelected(u)}>{u.name}</button>)}
      <UserForm user={selected} />
    </div>
  );
}
