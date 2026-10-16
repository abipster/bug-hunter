import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 14;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
