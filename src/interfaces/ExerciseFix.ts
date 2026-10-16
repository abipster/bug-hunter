import type { ComponentType } from 'react'

/**
 * Shape every file in `src/exercises` must follow:
 * - `default`: the exercise component (the normal TSX return)
 * - `getDescription`: text shown in the exercises table on the home page
 */
export interface ExerciseFix {
  default: ComponentType
  getId: () => number
  getDescription: () => string
}
