# Character Creation Explorer

Interactive prototype exploring 3 character creation flows for OpenArt's Character Studio.

## 🔗 Live Demo

https://showindsbot-dev.github.io/character-creation-explorer/

## Three Flows

| Flow | Description | Target User |
|---|---|---|
| 🖼 **Start from an image** | Upload a reference → AI reads it → refine with words | Has a visual in mind |
| ✍️ **Describe your character** | Natural language input → detected attributes → generate | Knows the vibe, not the look |
| ✨ **Use a template** | Visual card selection → style → vibe → build | Complete beginner |

## Design System

Built on OpenArt's dark Mauve token system with Magenta as brand accent and Neon Green for CTA.

## Tech

- Vite + React + TypeScript
- Framer Motion (all animations)
- Zero external images — CSS gradients only

## Dev

```bash
npm install
npm run dev
```
