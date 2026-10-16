// @ts-nocheck -- the broken code below has deliberate type errors (remove this line in your fix to see them)
import { useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 9;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
