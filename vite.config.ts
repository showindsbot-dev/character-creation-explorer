import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Actions sets GITHUB_ACTIONS=true; Vercel does not
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  base: isGitHubPages ? '/character-creation-explorer/' : '/',
})
