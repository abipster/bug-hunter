import { createContext, useContext, useState, memo, type ReactNode } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export const getId: Exercise['getId'] = () => 10;
export const getDescription: Exercise['getDescription'] = () => 'Typing in the search box makes the (expensive) sidebar re-render on every keystroke. The Profiler flags it.';
export const getDifficulty: Exercise['getDifficulty'] = () => 3;
export const getHints: Exercise['getHints'] = () => [
  '`memo` does not protect against context changes.',
  'How many unrelated concerns share one provider value?',
  'Why is `any` a red flag here?',
];

const AppCtx = createContext<any>(null);

function Provider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');
  return (
    <AppCtx.Provider value={{ search, setSearch, theme, setTheme }}>
      {children}
    </AppCtx.Provider>
  );
}

const Sidebar = memo(function Sidebar() {
  const { theme } = useContext(AppCtx);
  console.log('Sidebar render');
  return <aside className={theme}>Expensive sidebar</aside>;
});

function SearchBox() {
  const { search, setSearch } = useContext(AppCtx);
  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}

export default function ContextRerenders() {
  return (
    <Provider>
      <SearchBox />
      <Sidebar />
    </Provider>
  );
}
