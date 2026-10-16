import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 6;
export const getDescription: Exercise['getDescription'] = () => 'Each row has an input; deleting the first row makes the remaining inputs show the wrong text.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  '`defaultValue` is only read on mount.',
  'Which component instance does React think is "row 0" after the delete?',
];
export const getFix: Exercise['getFix'] = () => [
  'Give rows a stable id (`{ id, name }`) and use `key={item.id}`. Then React removes the right instance and keeps each input\'s DOM state attached to its row.',
  'Also decide whether the input should be controlled (state in the array) if the list needs to be saved.',
];

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
