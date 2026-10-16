// Resets src/fixes/<Name>.tsx back to a copy of src/exercises/<Name>.tsx.
// Usage: npm run reset-fixes            (all exercises)
//        npm run reset-fixes -- Uncounter (a single exercise)
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src')
const exercisesDir = join(root, 'exercises')
const fixesDir = join(root, 'fixes')

const DESCRIPTION_LINE = /^export const getDescription[^\n]*$/m
const DEFAULT_DESCRIPTION = "export const getDescription: ExerciseFix['getDescription'] = () => 'Fix the bug in this component.'"

const available = readdirSync(exercisesDir)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => file.replace('.tsx', ''))

const requested = process.argv.slice(2)
const unknown = requested.filter((name) => !available.includes(name))
if (unknown.length) {
  console.error(`Unknown exercise(s): ${unknown.join(', ')}\nAvailable: ${available.join(', ')}`)
  process.exit(1)
}

mkdirSync(fixesDir, { recursive: true })

for (const name of requested.length ? requested : available) {
  const source = readFileSync(join(exercisesDir, `${name}.tsx`), 'utf8')
  const fixPath = join(fixesDir, `${name}.tsx`)
  // Keep the fix's own description if it already has one.
  const existing = existsSync(fixPath) ? readFileSync(fixPath, 'utf8').match(DESCRIPTION_LINE)?.[0] : undefined
  // Fix files are typed as ExerciseFix and have no difficulty or hints.
  const reset = source
    .replace(/import type \{ Exercise \} from '([^']*)\/Exercise'/, "import type { ExerciseFix } from '$1/ExerciseFix'")
    .replace(/^export const getDifficulty[^\n]*\n/m, '')
    .replace(/^export const getHints[^\n]*\[\];?\n|^export const getHints[^\n]*\n[\s\S]*?^\];?\n/m, '')
    .replace(/\bExercise\[/g, 'ExerciseFix[')
    .replace(DESCRIPTION_LINE, () => existing ?? DEFAULT_DESCRIPTION)
  writeFileSync(fixPath, reset)
  console.log(`Reset fixes/${name}.tsx`)
}
