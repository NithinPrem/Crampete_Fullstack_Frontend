# RaNdOm - React Frontend

A React-based frontend for the RaNdOm full stack application. Provides a dashboard for browsing random movies, news, YouTube videos, and quotes, with user authentication and profile management.

**Live Demo:** [randomnp.vercel.app](https://randomnp.vercel.app)

---

## Features

- User signup, login, and profile management
- Browse top-rated movies and search by title
- Browse top news headlines and search by keyword
- YouTube video search and playback
- Random quotes
- Encrypted and persisted Redux state across sessions

---

## Tech Stack

- **React 18** - UI library
- **Vite 8** - build tool and dev server
- **Redux Toolkit 2** - state management
- **redux-persist** with encrypted storage - persisted auth state across sessions
- **React Router v6** - client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - toast notifications
- **React Player** - media playback
- **React Avatar** - user avatar display
- **React Icons** - icon library

---

## Project Structure

```
.
├── public/                  # Static assets (icons, etc.)
├── src/
│   ├── app/
│   │   ├── features/        # Redux slices
│   │   └── store.jsx        # Redux store with persistence and encryption
│   ├── components/          # Feature components (Auth, Dashboard, Movies, News, YouTube, etc.)
│   ├── images/              # Static image assets
│   ├── Fonts/               # Custom fonts
│   ├── App.jsx              # Root component and routing
│   └── index.jsx            # App entry point
├── index.html               # Vite entry HTML
└── vite.config.js           # Vite configuration
```

---

## Getting Started

### Prerequisites

- Node.js v20 or higher
- npm

### Installation

```bash
git clone https://github.com/NithinPrem/Crampete_Fullstack_Frontend.git
cd Crampete_Fullstack_Frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_SECRET_KEY=your_redux_persist_encryption_key
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` is only needed for local development. In production, the app falls back to the live backend URL automatically if this variable is not set.

All environment variables must be prefixed with `VITE_` to be accessible in the app via `import.meta.env`.

### Running Locally

```bash
npm start
```

The app will run at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Previewing the Production Build

```bash
npm run preview
```

---

## Deployment

Requirements for any static hosting platform:

- Build command: `vite build`
- Output directory: `build`
- Set the `VITE_SECRET_KEY` environment variable in your platform's settings

---

## Related Repository

Backend: [Crampete_Fullstack_Backend](https://github.com/NithinPrem/Crampete_Fullstack_Backend)
