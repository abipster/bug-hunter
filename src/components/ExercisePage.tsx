import type { Exercise } from '../interfaces/Exercise'

// Fix files mirror the exercise file names: exercises/X.tsx <-> fixes/X.tsx
const fixModules = import.meta.glob<Exercise>('../fixes/*.tsx', { eager: true })

interface ExercisePageProps {
  name: string
  exercise: Exercise
}

export default function ExercisePage({ name, exercise }: ExercisePageProps) {
  const fix = fixModules[`../fixes/${name}.tsx`]
  const ExerciseComponent = exercise.default
  const FixComponent = fix?.default
  const hints = exercise.getHints?.() ?? []
  const fixes = exercise?.getFix?.() ?? []

  return (
    <div className="exercise-page">
      <p>
        <a href="#">← Back to exercises</a>
      </p>
      <h2>{name}</h2>

      <div className="exercise-panels">
        <section className="exercise-panel">
          <h3>Exercise (broken)</h3>
          <p className="exercise-panel-description">{exercise.getDescription()}</p>
          <div className="exercise-panel-body">
            <ExerciseComponent />
          </div>
          {hints.length > 0 && (
            <details className="exercise-panel-footer">
              <summary>Hints ({hints.length})</summary>
              <ul>
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </details>
          )}
          {fixes.length > 0 && (
            <details className="exercise-panel-footer">
              <summary>Fix ({fixes.length})</summary>
              <ul>
                {fixes.map((note, index) => (
                  <li key={index}>
                    {note.includes('\n') ? <pre><code>{note}</code></pre> : note}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </section>

        <section className="exercise-panel">
          <h3>Your fix</h3>
          {FixComponent ? (
            <>
              <p className="exercise-panel-description">{fix.getDescription()}</p>
              <div className="exercise-panel-body">
                <FixComponent />
              </div>
            </>
          ) : (
            <p className="exercise-panel-description">
              No fix file yet. Create <code>src/fixes/{name}.tsx</code>.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
