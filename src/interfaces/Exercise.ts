import type { ExerciseFix } from './ExerciseFix'

/**
 * Shape every file in `src/exercises` must follow:
 * - `default`: the exercise component (the normal TSX return)
 * - `getDescription`: text shown in the exercises table on the home page
 */
export interface Exercise extends ExerciseFix {
  getDifficulty: () => number
  getHints: () => string[]
}
