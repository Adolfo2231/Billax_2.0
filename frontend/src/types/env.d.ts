/**
 * Variables de `import.meta.env` que usa el frontend.
 * Vite solo expone al browser las que empiezan por `VITE_`.
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
