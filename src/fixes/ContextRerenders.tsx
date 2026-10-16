import { createContext, useContext, useState, memo, type ReactNode } from 'react';
import type { ExerciseFix } from '../interfaces/ExerciseFix';

export const getId: ExerciseFix['getId'] = () => 10;
export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'

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
