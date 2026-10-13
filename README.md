<div align="center">

# 🎬 CINEADDAX

### Your Movie Universe

A responsive movie discovery app where you can explore, search, and save your favorite films, with a personal watchlist that follows you across devices.

[Live Demo](https://your-app.vercel.app) · [Report a Bug](https://github.com/sanjibghosh26/cineaddax-movie-app/issues) · [Request a Feature](https://github.com/sanjibghosh26/cineaddax-movie-app/issues)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

---

## 📖 About

**CINEADDAX** is a movie discovery web application built with React and Tailwind CSS. Users can browse popular and trending movies, search by title, explore genres, view detailed movie information, watch trailers, and build a personal watchlist.

Movie data is powered by the **TMDB API**, while **Firebase** handles authentication and stores each user's watchlist in **Cloud Firestore**.

## ✨ Features

- 🎥 **Movie Discovery**: Browse popular and trending movies.
- 🔍 **Search**: Find movies by title from the desktop search bar or the mobile menu.
- 🗂️ **Genre Browsing**: Explore movies by genre.
- 📄 **Movie Details**: View an overview, ratings, and related information.
- ▶️ **Trailers**: Watch available trailers on YouTube.
- 🔐 **Authentication**: Sign up and log in with email and password.
- 📧 **Email Verification** and 🔑 **Password Recovery** through Firebase.
- 🌐 **Google Sign-In**: One-click login with a Google account.
- ❤️ **Personal Watchlist**: Save movies and access them from any device.
- ☁️ **Cloud Storage**: Each user's watchlist is stored in Cloud Firestore.
- ⏳ **Loading Skeletons**: Smooth placeholders while data loads.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop.
- 🚫 **Custom 404 Page**: A dedicated page for invalid routes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | Building the user interface |
| [Vite](https://vitejs.dev/) | Development server and build tooling |
| [Tailwind CSS](https://tailwindcss.com/) | Styling and responsive layouts |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Firebase Authentication](https://firebase.google.com/products/auth) | Email and Google sign-in |
| [Cloud Firestore](https://firebase.google.com/products/firestore) | User watchlist storage |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie data and discovery |
| [Lucide React](https://lucide.dev/) | Icons |

## 📂 Project Structure

```text
cineaddax-movie-app/
├── public/
│   ├── favicon.svg              # Browser tab icon
│   └── Google_logo.svg          # Logo used on the Google sign-in button
│
├── src/
│   ├── Components/              # Reusable UI components
│   │   ├── ErrorMessage.jsx     # Displays API and data errors
│   │   ├── Footer.jsx           # Site footer
│   │   ├── GenreCard.jsx        # Card for a single genre
│   │   ├── Hero.jsx             # Hero banner on the home page
│   │   ├── MobileMenu.jsx       # Mobile drawer: navigation, search, profile, logout
│   │   ├── MovieCard.jsx        # Movie poster card
│   │   ├── MovieSkeleton.jsx    # Loading placeholder for movie cards
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── Pagination.jsx       # Page navigation controls
│   │   ├── SectionTitle.jsx     # Reusable section heading
│   │   └── Stats.jsx            # Statistics section
│   │
│   ├── Context/
│   │   └── AuthContext.jsx      # Auth provider managing the Firebase user state
│   │
│   ├── Hooks/
│   │   └── UseAuth.js           # Custom hook to access auth state and actions
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx       # Shared layout: Navbar, page content, Footer
│   │
│   ├── pages/                   # Route-level pages
│   │   ├── ForgotPassword.jsx   # Password reset via email
│   │   ├── Genres.jsx           # Genre listing
│   │   ├── Home.jsx             # Landing page
│   │   ├── Login.jsx            # Login, sign up, and Google sign-in
│   │   ├── MovieDetails.jsx     # Movie information and trailer
│   │   ├── Movies.jsx           # Movie listing and trending results
│   │   ├── NotFound.jsx         # Custom 404 page
│   │   ├── Search.jsx           # Search results for a movie title
│   │   └── Watchlist.jsx        # User's saved movies (stored in Firestore)
│   │
│   ├── Services/
│   │   ├── firebase.js          # Firebase configuration (Auth and Firestore)
│   │   └── tmdb.js              # TMDB API request helpers
│   │
│   ├── App.jsx                  # Route definitions
│   ├── index.css                # Global styles and Tailwind import
│   └── main.jsx                 # Application entry point
│
├── .env                         # Environment variables (not committed)
├── .gitignore
├── eslint.config.js             # ESLint configuration
├── index.html                   # Root HTML file
├── package.json
├── vercel.json                  # SPA rewrite rules for Vercel
└── vite.config.js               # Vite configuration
```

> The structure above is a simplified overview and may differ slightly from the repository as the project evolves.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later and npm
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- A [Firebase project](https://console.firebase.google.com/) with:
  - **Authentication** enabled (Email/Password and Google providers)
  - **Cloud Firestore** enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sanjibghosh26/cineaddax-movie-app.git
   cd cineaddax-movie-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open the local URL shown in your terminal (usually `http://localhost:5173`).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## ☁️ Deployment (Vercel)

1. Push the project to GitHub and import the repository in [Vercel](https://vercel.com/).
2. Add every `VITE_*` variable under **Project → Settings → Environment Variables**, then redeploy.
3. Add a `vercel.json` file in the project root so React Router routes work on refresh and direct links:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

4. In the Firebase Console, open **Authentication → Settings → Authorized domains** and add your Vercel domain (for example `your-app.vercel.app`). Without this step, Google sign-in fails with `auth/unauthorized-domain`.

## 🔐 Security Notes

- Never commit your `.env` file. Make sure it is listed in `.gitignore`.
- Variables prefixed with `VITE_` are bundled into the client code, so never store server-side secrets in them.
- Restrict Firestore access so users can only read and write their own data. Example rules, assuming the watchlist is stored under `users/{userId}`:

  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```

  Adjust the path if your watchlist uses a different structure.

## 🧠 What I Learned

- Building reusable, responsive React components with Tailwind CSS
- Managing authentication state with React Context and custom hooks
- URL-driven search and client-side routing with React Router
- Consuming a third-party REST API and handling loading and error states
- Integrating Firebase Authentication and Cloud Firestore
- Handling form validation and authentication flows
- Managing environment variables and deploying a Vite app

## 🔮 Future Improvements

- Personalized movie recommendations
- Performance optimizations such as lazy loading and caching
- Accessibility improvements
- Reviews and ratings from users

## 🙌 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for movie data
- [Firebase](https://firebase.google.com/) for authentication and database services
- [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) for icons

---

<div align="center">

**CINEADDAX** · Explore movies. Find your favorites. Build your watchlist.

<sub>This product uses the TMDB API but is not endorsed or certified by TMDB. Built for learning and portfolio purposes.</sub>

</div>