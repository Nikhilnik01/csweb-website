// Copies the self-hosted TinyMCE assets into /public so they are served
// from /tinymce/... in both `vite dev` and the production build.
// Runs automatically via the "postinstall" npm script.
import { existsSync, mkdirSync, cpSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '..', 'node_modules', 'tinymce')
const dest = join(__dirname, '..', 'public', 'tinymce')

if (!existsSync(src)) {
  console.warn('[copy-tinymce] node_modules/tinymce not found, skipping.')
  process.exit(0)
}

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
console.log('[copy-tinymce] copied node_modules/tinymce -> public/tinymce')
