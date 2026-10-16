import { useEffect, useState } from 'react'
import type { Exercise } from './interfaces/Exercise'
import ExercisePage from './components/ExercisePage'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// Every file in the exercises folder is picked up automatically.
const exerciseModules = import.meta.glob<Exercise>(
  './exercises/*.tsx',
  { eager: true },
)

const exercises = Object.entries(exerciseModules)
  .map(([path, module]) => ({
    id: module.getId(),
    name: path.replace('./exercises/', '').replace('.tsx', ''),
    module,
    description: module.getDescription(),
    difficulty: module.getDifficulty(),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const getHashName = () => decodeURIComponent(window.location.hash.slice(1))

function App() {
  const [selected, setSelected] = useState(getHashName)

  useEffect(() => {
    const onHashChange = () => setSelected(getHashName())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activeExercise = exercises.find((exercise) => exercise.name === selected)

  if (activeExercise) {
    return (
      <ExercisePage name={activeExercise.name} exercise={activeExercise.module} />
    )
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Welcome to Bug Hunter, your React application powered by Vite.
          </p>
          <p>
            Select an option from the menu above to get started with your React training.
          </p>
          <p>Difficulty levels range from 1 (warm-up) to 3 (senior trap).</p>
        </div>

        <section id="how-to-use" className="how-to-use">
          <h2>How to use</h2>
          <ol>
            <li>Click an exercise in the table below to open it.</li>
            <li>
              The page shows two panels side by side: <strong>Exercise (broken)</strong>, the
              original component (don't edit it), and <strong>Your fix</strong>, your workspace,
              which renders <code>src/fixes/&lt;ExerciseName&gt;.tsx</code>.
            </li>
            <li>
              Reproduce the bug, say out loud what you observe, form a hypothesis, then edit the
              fix file and watch the right panel update.
            </li>
            <li>Stuck? Open the collapsible <strong>Hints</strong> under the broken exercise.</li>
            <li>
              Some exercises start with <code>// @ts-nocheck</code> because the broken code has
              deliberate TypeScript errors. Delete that line in your fix file to see them, they
              are often a clue.
            </li>
          </ol>
          <h4>Reset your fixes</h4>
          <p>
            <code>npm run reset-fixes</code> resets all fix files, or{' '}
            <code>npm run reset-fixes -- Uncounter</code> resets one. This overwrites your
            changes with a fresh copy of the exercise.
          </p>
          <h4>Add an exercise</h4>
          <p>
            Create <code>src/exercises/&lt;Name&gt;.tsx</code> with a default component plus{' '}
            <code>getId</code>, <code>getDescription</code>, <code>getDifficulty</code> and{' '}
            <code>getHints</code>, then run <code>npm run reset-fixes -- &lt;Name&gt;</code> to
            create the matching fix file. It shows up in the table automatically.
          </p>
        </section>

       <section id="exercises">
        <table className="exercise-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Exercise</th>
              <th>Difficulty</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {exercises.sort((a, b) => a.id - b.id)
              .map(({ id, name, difficulty, description }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <a href={`#${encodeURIComponent(name)}`}>{name}</a>
                </td>
                <td>{difficulty}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
