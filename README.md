# AyahGlow

A modern Quran reading and listening experience built with Next.js, React, TypeScript, and Tailwind CSS.

AyahGlow focuses on a clean reading interface, fast search experience, responsive UI, and structured API handling for Quran content. The project combines server-side API routes with modern frontend state management to create a scalable and maintainable Quran web application.

### 🗂 Application Page

<div style="display: flex; gap: 20px;">

  <div style="flex: 1; text-align: center;">
    <h3>Mobile View</h3>
    <img src="public/home dark.png" alt="Task List" width="100%">
    <img src="public/home page.png" alt="Task List" width="100%">
  </div>

  <div style="flex: 1; text-align: center;">
    <h3>Responsive Setting</h3>
    <img src="public/mobile view.png" alt="Create Task" width="100%">
  </div>

</div>

---

## Live Project

* Website: [https://ayahglow.netlify.app/](https://ayahglow.netlify.app/)
* Repository: [https://github.com/md-borno/AyahGlow.git](https://github.com/md-borno/AyahGlow.git)

---

# Project Overview

AyahGlow is designed as a Quran reader application where users can:

* Browse Surahs
* Read Ayahs with translations
* Search Quran verses quickly
* Listen to audio recitations
* Navigate smoothly between Surahs and Ayahs
* Use the app comfortably on both desktop and mobile devices

The project uses a modern App Router architecture from Next.js and organizes API handling through server route endpoints.

---

# Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* Lucide React Icons
* CLSX

## State & Data Management

* Zustand → Global state management
* React Query → API caching and data fetching
* Fuse.js → Fuzzy search functionality

## Performance & UI

* React Window → Virtualized rendering for better performance
* Tailwind CSS → Responsive utility-first styling

---

# Project Structure

```bash
AyahGlow/
│
├── app/
│   ├── api/
│   │   ├── search/
│   │   ├── surah/
│   │   └── juz/
│   │
│   ├── surah/
│   │   └── [id]/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── reader/
│   ├── audio/
│   ├── sidebar/
│   ├── search/
│   └── ui/
│
├── lib/
│   ├── api/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── types/
│
├── public/
│
├── styles/
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# Architecture Overview

## 1. Frontend Layer

The frontend is built using the Next.js App Router.

Main responsibilities:

* Rendering Surah pages
* Displaying Ayahs
* Managing responsive layouts
* Handling audio controls
* Search interaction
* Navigation between Surahs

The UI is component-based for scalability and maintainability.

---

## 2. API Layer

The project uses Next.js Route Handlers inside the `app/api` directory.

### API Endpoints

| Endpoint          | Purpose            |
| ----------------- | ------------------ |
| `/api/surah/[id]` | Fetch Surah data   |
| `/api/juz`        | Fetch Juz data     |
| `/api/search`     | Search Quran Ayahs |

This architecture helps:

* Keep API logic separated from UI
* Prevent repeated fetch logic
* Centralize data handling
* Improve maintainability
* Make future scaling easier

---

# API Management Strategy

The project structure suggests a clean separation between:

## UI Components

Responsible only for rendering.

## Hooks / Query Layer

Responsible for:

* Fetching data
* Caching responses
* Loading states
* Error handling
* Optimistic UI updates

## Store Layer (Zustand)

Used for:

* Audio playback state
* Current Surah tracking
* UI states
* Sidebar state
* Search states

## Utility Layer

Handles:

* API helpers
* Formatting
* Reusable logic
* Type safety

This separation keeps the codebase scalable and easier to debug.

---

# UI & UX Design

AyahGlow follows a minimal and readable UI philosophy.

## Design Goals

* Clean Quran reading experience
* Focus on readability
* Minimal distractions
* Fast navigation
* Mobile-first responsiveness
* Smooth audio interaction

---

## UI Features

### Responsive Layout

Tailwind CSS is used heavily to create:

* Mobile layouts
* Tablet responsiveness
* Desktop optimization
* Flexible spacing
* Adaptive typography

---

### Sidebar Navigation

The sidebar likely includes:

* Surah list
* Quick navigation
* Active Surah highlighting
* Search integration

---

### Quran Reader

The reader section focuses on:

* Ayah display
* Arabic text rendering
* Translation display
* Audio controls
* Reading flow

---

### Search Experience

Fuse.js enables fuzzy searching for:

* Ayah text
* Translations
* Quick verse discovery

The search system improves user experience by allowing approximate matching.

---

# State Management

## Zustand

Zustand is used instead of larger state libraries to keep the project lightweight.

Possible managed states:

* Current Surah
* Current Ayah
* Audio playing state
* Sidebar open/close
* Search query
* UI preferences

---

## React Query

React Query is used for:

* API caching
* Background refetching
* Request deduplication
* Loading/error handling
* Better performance

This reduces unnecessary API calls and improves responsiveness.

---

# Performance Optimization

## React Window

React Window helps render large Quran datasets efficiently.

Benefits:

* Reduced DOM nodes
* Faster rendering
* Better scrolling performance
* Lower memory usage

---

## Next.js App Router

Benefits:

* Server-side rendering
* Faster routing
* Better SEO
* Improved performance
* Streaming support

---

# Styling System

## Tailwind CSS v4

Tailwind is used for:

* Responsive utilities
* Fast UI development
* Consistent spacing
* Typography styling
* Dark/light flexibility

---

# Installation

## Clone Repository

```bash
git clone https://github.com/md-borno/AyahGlow.git
cd AyahGlow
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# Build for Production

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

# Dependencies Used

## Main Dependencies

| Package               | Purpose                 |
| --------------------- | ----------------------- |
| next                  | React framework         |
| react                 | UI library              |
| react-dom             | DOM rendering           |
| @tanstack/react-query | Data fetching & caching |
| zustand               | Global state management |
| fuse.js               | Fuzzy search            |
| react-window          | Virtualized rendering   |
| clsx                  | Conditional classes     |
| lucide-react          | Icons                   |

---

# Why This Structure Works Well

This architecture provides:

* Better scalability
* Cleaner code separation
* Easier debugging
* Reusable UI components
* Centralized API management
* Better performance
* Easier future feature additions

---

# Possible Future Improvements

## Features

* Bookmark Ayahs
* Dark mode
* Tafsir integration
* Multi-language translations
* User preferences
* Reading progress tracking
* Offline support
* PWA support

---

# Screenshots

Add screenshots here:

```md
/assets/home.png
/assets/reader.png
/assets/search.png
/assets/audio.png
```

---

# Deployment

The project can be deployed easily on:

* Netlify
* Vercel
* Render
* Railway

Recommended:

* Vercel for full Next.js optimization

---

# Contribution

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

# License

This project is open-source and available under the license chosen by the repository owner.

---

# Author

Developed by MD Borno.

GitHub:
[https://github.com/md-borno](https://github.com/md-borno)
