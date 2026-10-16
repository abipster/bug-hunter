# Bug Hunter

A React + TypeScript training app. Each exercise is a small component with some issues in it. You see the broken component next to your own copy and fix the copy until it behaves correctly.

## Getting started

### Checkout

```bash
git clone <repository-url>
cd bug-hunter
npm install
```

You need a recent Node.js (the project uses Vite 8 and TypeScript 6) and npm.

### Run

```bash
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run reset-fixes` | Reset your fix files to the original broken code |

## How to use

1. The home page lists every exercise with its number, name, and description. Click an exercise to open it.
2. The exercise page has two panels side by side:
   - **Exercise (broken)** is the original component. Don't edit it. Open it to reproduce the bug.
   - **Your fix** is your workspace. It renders the code in `src/fixes/<ExerciseName>.tsx`.
3. Reproduce the bug, say out loud what you observe, form a hypothesis, then edit `src/fixes/<ExerciseName>.tsx` and watch the right panel update.
4. Stuck? Open the collapsible **Hints** under the broken exercise.
5. Some exercises start with `// @ts-nocheck` because the broken code has deliberate TypeScript errors. Delete that line in your fix file to see the errors, which are often a clue.

### Reset your fixes

```bash
npm run reset-fixes                    # all exercises
npm run reset-fixes -- Uncounter       # one exercise
```

This overwrites the fix file with a fresh copy of the exercise, so you lose your changes. The fix's own description line is kept.

### Add an exercise

1. Create `src/exercises/<Name>.tsx`. It must export a default component plus `getId`, `getDescription`, `getDifficulty` and `getHints` (see `src/interfaces/Exercise.ts`).
2. Run `npm run reset-fixes -- <Name>` to create the matching `src/fixes/<Name>.tsx`.

The file names in `exercises` and `fixes` must match. Exercises show up in the table on the home page automatically.

## Project structure

```
src/
  exercises/     broken components (one file per exercise)
  fixes/         your working copies, same file names as exercises
  interfaces/    Exercise and ExerciseFix types
  components/    ExercisePage (side-by-side view)
scripts/
  reset-fixes.mjs
```

---

## Template notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
