# Todo List Manager

Full-stack todo application: React TypeScript frontend with a headless WordPress backend (REST API + JWT authentication).

This repository contains the **frontend**. The WordPress backend runs separately (typically via Docker on `localhost:8080`).

## Features

- JWT login / logout with session persistence (“Remember me”)
- CRUD for todo lists and nested tasks
- Per-user data isolation
- Task filters (All / Active / Completed)
- Light and dark themes
- Demo `host` account with automatic list cleanup on logout

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Redux Toolkit, React Router, MUI, React Hook Form, Zod, Axios |
| Backend | WordPress (custom REST endpoints), JWT Authentication plugin, Advanced Custom Fields (ACF) |

## Architecture

```
Browser (React app :3000)
    │  HTTPS/HTTP + Bearer JWT
    ▼
WordPress REST API (:8080/wp-json)
    ├── /jwt-auth/v1/token      → authentication
    └── /wp/v2/...              → lists & tasks
```

The UI never talks to the database directly. All business data goes through WordPress REST.

## Prerequisites

- **Node.js** 18+ (recommended)
- **npm** or **yarn**
- A running **WordPress** instance with:
  - [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
  - Advanced Custom Fields (if used by your theme/endpoints)
  - Custom list endpoints / post type configured for this app
  - CORS allowing `http://localhost:3000`
- **Docker** + Docker Compose (recommended for the local WordPress stack)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/Kat10-4/my-todolist.git
cd my-todolist
git checkout wordpress-api-app
npm install
```

### 2. Configure environment

Create a `.env` file in the project root (do not commit secrets):

```env
REACT_APP_BASE_URL=http://localhost:8080/wp-json
```

`REACT_APP_BASE_URL` must point at your WordPress REST root (no trailing path beyond `/wp-json`).

### 3. Start the WordPress backend

Start your WordPress stack so the API is available at `http://localhost:8080`.

Example with Docker Compose (from your backend project directory):

```bash
docker compose up -d db wordpress
```

Confirm the API responds:

```bash
curl http://localhost:8080/wp-json
```

Ensure a demo user exists (create one in WP Admin or via WP-CLI if needed):

| Field | Value |
| --- | --- |
| Login | `host` |
| Password | `0000` |

### 4. Start the frontend

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000), open **Login**, and sign in with the demo credentials above.

## Project structure

```
src/
├── app/                 # Store, app shell, main screen
├── common/              # Shared UI, theme, routing, Axios instance, utils
├── features/
│   ├── auth/            # Login UI, auth API, auth slice
│   └── todolists/       # Lists/tasks API, slices, UI
└── assets/              # Fonts and static assets
```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server at `http://localhost:3000` |
| `npm run build` | Production build into `build/` |
| `npm test` | Run tests |
| `npm run storybook` | Component Storybook (if used) |

## Authentication notes

- Access is **invite-based**: there is no public self-registration screen.
- Demo access uses the `host` account; other users can request access via the contact email on the login page.
- Tokens are stored in `localStorage` (Remember me) or `sessionStorage` (session only).
- Protected API calls send `Authorization: Bearer <token>`.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Login fails / network error | WordPress is running on port **8080**; `.env` URL matches |
| `invalid_username` | User `host` exists in WordPress and password is `0000` |
| CORS errors in the browser | WordPress allows origin `http://localhost:3000` and header `Authorization` |
| App loads but lists are empty | JWT plugin active; custom list endpoints reachable; user has data |

## License

Private / personal project. Contact the author for access or collaboration.

**Contact:** diachenko.k.v@gmail.com
