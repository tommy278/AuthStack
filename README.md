## TanStack Auth & Dashboard Foundation

# This repository is a foundation for building React applications using TanStack Router, Supabase, and modern authentication patterns. It includes:
	•	Email/password authentication
	•	OAuth login (Google, GitHub)
	•	Password reset / update
	•	Auth-protected dashboard
	•	User context for global state management

# It is designed to serve as a reusable foundation for multiple projects while keeping authentication secure and manageable.

⸻

## Features
	•	Client-side and server-side auth with Supabase
	•	Cookie-based session management for persistent login
	•	Guarded routes using __authed / layouts
	•	User context for managing logged-in state across the app
	•	Responsive navigation that adapts to auth state
	•	Full OAuth support (Google & GitHub)

⸻

## Getting Started

# Prerequisites
	•	Node.js >= 18
	•	Supabase project (create at https://supabase.com￼)
	•	Yarn or npm

# Setup
	1.	Clone the repo
    git clone https://github.com/your-username/tanstack-auth-foundation.git
    cd tanstack-auth-foundation
   2. Install dependencies
    yarn install
    # or
    npm install
  3.	Create environment variables
    Copy .env.example to .env and fill in your Supabase project info:
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  4.	Run the development server
    yarn dev
    # or
    npm run dev

  # Setting up Oauth
    Enable chosen provider and follow the docs to set them up.

  ## Usage
	•	Login: /auth/login
	•	Register: /auth/register
	•	Dashboard: /dashboard (requires auth)
	•	OAuth login: Google/GitHub buttons on login page
	•	Password reset/update: Form available under /auth/reset-password

⸻

## How to Extend
	1.	Use UserContext for accessing user info anywhere in your app.
	2.	Wrap new pages with the _authed layout for route protection.
	3.	Add additional OAuth providers by extending supabase.auth.signInWithOAuth().
	4.	Customize UI without affecting authentication logic.

⸻

## Notes
	•	OAuth and email/password auth use different session handling, but both are persisted in HTTP-only cookies.
	•	Server functions are used to ensure consistent auth handling.
	•	This foundation focuses on auth and structure; you may adapt UI/UX for your projects.

⸻

License

MIT License – feel free to use and modify this foundation for personal or professional projects.

    
