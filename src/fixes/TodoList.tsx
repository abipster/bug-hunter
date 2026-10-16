import { useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 2;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

type Todo = { id: number; text: string; done: boolean };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Write tests', done: false },
    { id: 2, text: 'Ship it', done: false },
  ]);

  const add = () => {
    todos.push({ id: todos.length + 1, text: 'New', done: false });
    setTodos(todos);
  };

  const toggle = (id: number) => {
    const t = todos.find(t => t.id === id)!;
    t.done = !t.done;
    setTodos(todos);
  };

  const sorted = todos.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>
        {sorted.map(t => (
          <li key={t.id} onClick={() => toggle(t.id)}
              style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}