# EarVibes - Interactive Chord Progression Trainer

EarVibes is an interactive, open-source ear training application designed to help musicians master chord progressions through adaptive lessons and randomized quizzes. Built with modern web technologies, it functions as a Progressive Web App (PWA) that can be installed on desktop and mobile devices.

## Features

*   **Interactive Ear Training**: Listen to 4-chord progressions and identify them by ear.
*   **Multiple Difficulty Levels**:
    *   **Level 1**: Major Diatonic (The fundamentals).
    *   **Level 2**: Natural Minor (Emotional and darker sounds).
    *   **Level 3**: Dominant 7th (Understanding tension and resolution).
*   **High-Quality Audio Engine**: Powered by Tone.js, featuring multiple synthesizer presets:
    *   **VANGELIS**: Lush, cinematic CS-80 style strings.
    *   **JUMP**: Punchy, classic OB-X style saw waves.
    *   **PIANO**: Clean acoustic-style keys.
*   **Music Theory Integration**: Contextual lessons explaining the function of every chord (Tonic, Dominant, Subdominant, etc.).
*   **Keyboard Support**: Full Vim-style keyboard shortcuts for rapid training.
*   **PWA Ready**: Installable on iOS, Android, Windows, and macOS for offline practice.
*   **Multi-language Support**: English, Spanish, Portuguese, and Japanese.

## Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Audio**: Tone.js
*   **Content**: React Markdown

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `pnpm install`
3.  Run the development server: `pnpm run dev`

**Note**: This app uses ES modules and must be served via HTTP server. Double-clicking `index.html` directly will not work due to CORS restrictions. Use `pnpm run dev` for local development.

## Contributing

This is a personal project and not a commercial product. While the source code is open, I am maintaining it primarily for my own use and learning.

You are welcome to:
*   Open issues for bugs or feature ideas.
*   Submit Pull Requests (PRs).

**Please Note:** I review and accept contributions at my own discretion. I may not accept features that deviate from my vision for the application or add unnecessary complexity.

## License

This project is free and open-source software licensed under the **GNU General Public License v3.0 (GPLv3)**. You are free to use, modify, and distribute this software in accordance with the license terms.

See the [LICENSE](./LICENSE.md) file for details.