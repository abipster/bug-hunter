// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useRef, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 13;
export const getDescription: Exercise['getDescription'] = () => 'Warning "changing an uncontrolled input to be controlled"; submitting sends the wrong values; double-clicking Submit posts twice.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  'Read the console warnings and the TypeScript errors: there are many small bugs, not one.',
  'Is every handler actually being called? What happens to the other fields when one changes?',
  'What stops a second submit while the first is in flight?',
];

type Form = { email?: string; age?: number; newsletter?: boolean };

export default function FormMix() {
  const [form, setForm] = useState<Form>({});
  const [status, setStatus] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault;
    setStatus('Saving…');
    await fetch('/api/signup', { method: 'POST', body: JSON.stringify(form) });
    setStatus('Saved');
  };

  return (
    <form onSubmit={submit}>
      <input value={form.email} onChange={e => setForm({ email: e.target.value })} />
      <input type="number" value={form.age}
             onChange={e => setForm({ ...form, age: e.target.value })} />
      <input type="checkbox" value={String(form.newsletter)}
             onChange={e => setForm({ ...form, newsletter: e.target.value })} />
      <input ref={ref} defaultValue="x" />
      <button>Submit</button>
      <p>{status}</p>
    </form>
  );
}
