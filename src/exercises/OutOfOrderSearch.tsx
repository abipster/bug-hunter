import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 4;
export const getDescription: Exercise['getDescription'] = () => 'Type "react" quickly; the list sometimes shows results for "rea". Also the loading spinner sticks after an error.';
export const getDifficulty: Exercise['getDifficulty'] = () => 2;
export const getHints: Exercise['getHints'] = () => [
  'Responses can arrive in any order.',
  'What happens on `fetch` rejection or non-2xx?',
  'Should an empty query fetch? Should every keystroke fetch?',
];
export const getFix: Exercise['getFix'] = () => [
  `useEffect(() => {
  if (!query.trim()) { setResults([]); return; }
  const ctrl = new AbortController();
  const t = setTimeout(async () => {
    setLoading(true);
    try {
      const r = await fetch(\`https://api.example.com/search?q=\${encodeURIComponent(query)}\`, { signal: ctrl.signal });
      if (!r.ok) throw new Error(r.statusText);
      setResults((await r.json()).items);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError(e as Error);
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, 300);                     // debounce
  return () => { clearTimeout(t); ctrl.abort(); };
}, [query]);`,
  'In production use TanStack Query (`useQuery({ queryKey: [\'search\', debounced], queryFn, enabled: !!debounced })`) and `encodeURIComponent`.',
];

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
