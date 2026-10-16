import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 14;
export const getDescription: Exercise['getDescription'] = () => '"Rendered fewer hooks than expected" when the user logs out; the window listener count grows with every toggle.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  'Do hooks run in the same order on every render?',
  'What does the effect do when the component goes away?',
];

function Tracker({ user }: { user: { name: string } | null }) {
  if (!user) return null;

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
  }, []);

  return <p>{user.name}: {pos.x},{pos.y}</p>;
}

export default function HookRules() {
  const [user, setUser] = useState<{ name: string } | null>({ name: 'Ana' });
  return (
    <div>
      <button onClick={() => setUser(u => (u ? null : { name: 'Ana' }))}>Toggle</button>
      <Tracker user={user} />
    </div>
  );
}
