import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 7;
export const getDescription: Exercise['getDescription'] = () => "The form is pre-filled for user 1; selecting user 2 shows user 1's data.";
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'Two anti-patterns from "You Might Not Need an Effect".',
  'Is `fullLabel` state?',
  "How do you reset a component's state when an id changes?",
];

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
