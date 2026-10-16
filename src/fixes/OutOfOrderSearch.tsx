import { useEffect, useState } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 4;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

export default function OutOfOrderSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.example.com/search?q=${query}`)
      .then(r => r.json())
      .then(data => {
        setResults(data.items);
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p>Loading…</p>}
      <ul>{results.map(r => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}
