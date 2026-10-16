// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 9;
export const getDescription: Exercise['getDescription'] = () => '"Too many re-renders" right after load; the delete button deletes everything.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'What is actually passed to `onClick`: a function, or the result of calling one?',
];

export default function HandlerOnRender() {
  const [items, setItems] = useState(['a', 'b', 'c']);
  const [selected, setSelected] = useState<string | null>(null);

  const remove = (item: string) => setItems(items.filter(i => i !== item));

  return (
    <div>
      {items.map(item => (
        <div key={item}>
          <span onClick={setSelected(item)}>{item}</span>
          <button onClick={remove(item)}>x</button>
        </div>
      ))}
      <p>Selected: {selected}</p>
    </div>
  );
}
