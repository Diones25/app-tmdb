<p align="center">
  <img src="src/assets/tmdb.svg" alt="TMDB" width="180" height="180" />
</p>

<h1 align="center">App Movies TMDB</h1>

<p align="center">
  Web application to explore movies, TV shows, actors and more, using The Movie Database (TMDB) API.
  <br />
  <a href="https://developer.themoviedb.org/docs/getting-started"><strong>TMDB API Docs »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-18.2-%2320232a?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/typescript-5.0-%233178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-7.1-%23646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwind-3.4-%2306B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/react%20query-5.0-%23FF4154?logo=reactquery" alt="React Query" />
</p>

---

## Table of Contents

- [Screenshots](#screenshots)
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deploy](#deploy)
- [License](#license)

---

## Screenshots

> The screenshots below describe the main screens of the app-tmdb project.

| Screen | Description |
|--------|-------------|
| <img src="./src/assets/doc/home.png" alt="Home" width="600" /> | **Home / Dashboard** — Main screen with tabs to browse popular movies, upcoming releases, TV shows, live channels, and famous people. |
| <img src="./src/assets/doc/filmes_details.png" alt="Movie Details" width="600" /> | **Movie Details** — Full page with poster, backdrop, trailer, cast, reviews, media, recommendations, and streaming players. |
| <img src="./src/assets/doc/series_details.png" alt="TV Show Details" width="600" /> | **TV Show Details** — Complete show information with seasons, cast, videos, and recommendations. |
| <img src="./src/assets/doc/series_temporada.png" alt="Seasons" width="600" /> | **Seasons** — Lists all available seasons of a TV show. |
| <img src="./src/assets/doc/series_episodies.png" alt="Episodes" width="600" /> | **Episodes** — Displays episodes of a season with an embedded video player. |
| <img src="./src/assets/doc/tela_tv.png" alt="TV Channels List" width="600" /> | **TV Channels List** — Paginated list of TV channels, with the ability to search for a specific channel by name. |

---

## About the Project

**App Movies TMDB** is a React web application built in TypeScript that consumes the [TMDB API](https://developer.themoviedb.org/docs/getting-started) to deliver a complete entertainment catalog experience. The project features a fully Portuguese (pt-BR) UI and integration with embedded streaming players.

---

## Features

- **Tabbed Dashboard** — Browse Popular Movies, Upcoming Releases, TV Shows, Live TV, and People in a single interface.
- **Rich Details** — Detailed pages with backdrop, poster, circular rating, YouTube trailer, cast, reviews, and media.
- **Streaming Players** — 5 embedded player options to watch movies and episodes directly in the browser.
- **Seasons and Episodes** — Explore TV show seasons and watch episodes with integrated players.
- **Actor Profile** — Biography, filmography, personal info, and social media links.
- **Debounced Search** — Search for movies and TV shows with a 500ms debounce input.
- **Infinite Scroll** — Keyword-based navigation with continuous loading via IntersectionObserver.
- **Pagination** — Page navigation across all listings.
- **Responsive Design** — Adaptive layout for mobile, tablet, and desktop.
- **Dark Theme** — Dark mode interface with custom color palette.

---

## Technologies

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | [React](https://react.dev/) | ^18.2.0 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | ^5.0.2 |
| **Build Tool** | [Vite](https://vitejs.dev/) | ^7.1.10 |
| **Routing** | [React Router DOM](https://reactrouter.com/) | ^7.13.1 |
| **Data Fetching** | [TanStack React Query](https://tanstack.com/query) | ^5.40.0 |
| **HTTP Client** | [Axios](https://axios-http.com/) | ^1.16.1 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | ^3.4.3 |
| **Components** | [Shadcn/ui](https://ui.shadcn.com/) (Radix Primitives) | — |
| **Icons** | [Lucide React](https://lucide.dev/) | ^0.379.0 |
| **Dates** | [date-fns](https://date-fns.org/) + [moment](https://momentjs.com/) | ^3.6.0 / ^2.30.1 |
| **State** | TanStack React Query (server state) + useState (local) | — |
| **Hosting** | [Vercel](https://vercel.com/) | — |

---

## Architecture

The application follows a **monolithic SPA (Single Page Application)** architecture with clear separation of concerns:

### Layers

```
┌────────────────────────────────────────────────┐
│                   UI Layer                      │
│   Components (pages, layouts, primitives)      │
├────────────────────────────────────────────────┤
│              Data Fetching Layer                │
│   React Query Hooks (queries.ts)               │
├────────────────────────────────────────────────┤
│               Service Layer                     │
│   API Functions (api.ts via Axios)             │
├────────────────────────────────────────────────┤
│            External APIs                        │
│   TMDB API (api.themoviedb.org/3)              │
│   + reidosembeds.com (TV channels)             │
└────────────────────────────────────────────────┘
```

### Technical Decisions

- **React Query** for all server state — automatic caching, request deduplication, refetch, and optimized pagination with `placeholderData: keepPreviousData`.
- **Granular componentization** — each UI element (cards, badges, reviews) is an isolated, reusable component.
- **Decoupled API Layer** — pure functions in `api.ts` transform TMDB data into TypeScript types, isolating network logic from components.
- **Shadcn/ui** — accessible and customizable components via Tailwind, without heavy design system dependencies.
- **Vite** — extremely fast build with native HMR and efficient tree-shaking.

---

## Project Structure

```
app-movies-tmdb/
├── public/                        # Static assets (favicon)
├── src/
│   ├── assets/                    # SVGs, PNGs, static images
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui primitives (button, card, dialog, etc.)
│   │   ├── Home.tsx               # Main dashboard
│   │   ├── MoviesDetails.tsx      # Movie details
│   │   ├── SeriesDetails.tsx      # TV show details
│   │   ├── SeriesSeasonsDetails.tsx       # Season list
│   │   ├── SeriesSeasonsEpisodeDetails.tsx # Episodes per season
│   │   ├── PersonDetails.tsx      # Person/actor details
│   │   ├── AllMoviesKeywords.tsx  # Movies by keyword
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── Footer.tsx             # Footer
│   │   ├── Banner.tsx             # Hero banner
│   │   ├── Card.tsx               # Movie/TV show card
│   │   ├── CardImage.tsx          # Poster image
│   │   ├── CardPerson.tsx         # Person card
│   │   ├── CardPersonMovieDetail.tsx  # Cast member card
│   │   ├── CardMoviePerson.tsx    # Credit card in person profile
│   │   ├── CardReview.tsx         # Review card
│   │   ├── CardKeywordMovies.tsx  # Keyword movie item
│   │   ├── CardTv.tsx             # TV channel card
│   │   ├── CardSeasonsDetails.tsx # Season card
│   │   ├── CardSeasonsEpisodeDetails.tsx # Episode card
│   │   ├── MoviesRecommended.tsx  # Recommendation thumbnail
│   │   ├── PaginationComponent.tsx # Pagination control
│   │   ├── SearchInput.tsx        # Debounced search input
│   │   └── VoteAveregeItem.tsx    # Circular rating badge
│   ├── lib/
│   │   └── utils.ts               # Utilities (cn(), date/currency formatting)
│   ├── router/
│   │   └── router.tsx             # Route definitions (React Router)
│   ├── types/                     # TypeScript interfaces (24 files)
│   ├── utils/
│   │   ├── api.ts                 # API call functions (Axios)
│   │   ├── queries.ts             # React Query custom hooks
│   │   ├── providers.tsx          # React Query provider
│   │   └── useDebounce.ts         # Debounce hook
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles + CSS variables
│   └── vote_average.css           # Circular vote bar (pure CSS)
├── .env.example                   # Environment variables template
├── components.json                # Shadcn/ui configuration
├── index.html                     # Vite entry HTML
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vercel.json                    # Vercel deploy configuration
└── vite.config.ts                 # Vite configuration
```

---

## Data Flow

```
User
  │
  ▼
React Component
  │
  ▼
Custom Hook (queries.ts) ── useQuery(queryKey, apiFunction)
  │
  ▼
TanStack React Query ── cache, dedup, keepPreviousData
  │
  ▼
API Function (api.ts) ── axios.get() + transformResponse
  │
  ▼
TMDB API ── api.themoviedb.org/3 (pt-BR)
         └── reidosembeds.com/api/channels
  │
  ▼
Typed Data (types/) ── returned to component
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Free [TMDB](https://www.themoviedb.org/) account to obtain your API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/app-movies-tmdb.git
cd app-movies-tmdb

# Install dependencies
npm install

# Configure environment variables (see below)
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Variables

```env
VITE_API_KEY=your_tmdb_api_key
VITE_API_TOKEN=your_tmdb_access_token
```

> Get your key and token at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Starts development server with HMR |
| `build` | `tsc && vite build` | Compiles TypeScript and generates production build |
| `preview` | `vite preview` | Previews production build locally |
| `lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Runs lint check |

---

## Deploy

The project is configured for deployment on **Vercel**:

1. Connect the repository to [Vercel](https://vercel.com/)
2. Configure environment variables (`VITE_API_KEY`, `VITE_API_TOKEN`)
3. Automatic deploy on every push to the main branch

The `vercel.json` file already includes the necessary SPA rewrite rules for React Router to work correctly.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <img src="src/assets/logo.png" alt="Logo" width="40" />
  <br />
  <sub>Powered by data from <a href="https://www.themoviedb.org/">TMDB</a></sub>
</p>
