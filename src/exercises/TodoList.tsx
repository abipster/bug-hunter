import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 2;
export const getDescription: Exercise['getDescription'] = () => 'adding and toggling todos sometimes does nothing until something else triggers a render; sorting scrambles the original order.';
export const getDifficulty: Exercise['getDifficulty'] = () => 1;
export const getHints: Exercise['getHints'] = () => [
  '`Object.is(prev, next)`. Which array methods mutate? Is `todos.length + 1` a safe id after a delete?'
];

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