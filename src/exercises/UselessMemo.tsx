import { memo, useMemo, useState, type CSSProperties } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 12;
export const getDescription: Exercise['getDescription'] = () => '`ExpensiveList` re-renders on every parent render despite `memo`; a `useMemo` returns outdated filtered data.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  'List every prop and ask whether its identity is stable across renders.',
  'Check the `useMemo` dependency list against what the callback reads.',
];

type Item = { id: number; label: string };

const ExpensiveList = memo(function ExpensiveList({
  items,
  onSelect,
  style,
}: {
  items: Item[];
  onSelect: (id: number) => void;
  style: CSSProperties;
}) {
  console.log('list render');
  return (
    <ul style={style}>
      {items.map(i => <li key={i.id} onClick={() => onSelect(i.id)}>{i.label}</li>)}
    </ul>
  );
});

export default function UselessMemo() {
  const [text, setText] = useState('');
  const [minId, setMinId] = useState(0);
  const all: Item[] = Array.from({ length: 1000 }, (_, i) => ({ id: i, label: `Item ${i}` }));

  const filtered = useMemo(() => all.filter(i => i.id >= minId), [all]);

  const onSelect = (id: number) => console.log(id);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setMinId(m => m + 100)}>Hide 100</button>
      <ExpensiveList items={filtered} onSelect={onSelect} style={{ color: 'teal' }} />
    </div>
  );
}
