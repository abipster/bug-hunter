import { useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 6;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

export default function LostInputs() {
  const [names, setNames] = useState(['Ana', 'Bruno', 'Carla']);

  return (
    <ul>
      {names.map((name, index) => (
        <li key={index}>
          <input defaultValue={name} />
          <button onClick={() => setNames(names.filter((_, i) => i !== index))}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
