
MovieBox (movie-discovery)
A movie and TV show browser built with React, Vite and Material UI. It uses The Movie Database (TMDB) API to show popular and top-rated titles, filter by genre, search, view details, and keep a personal watchlist.

Live site: add your Vercel link here after deploying (for example https://movie-discovery.vercel.app)

Features
Home page with sideways-scrolling rows: Popular Movies, Top Rated Movies, Popular TV Shows, Top Rated TV Shows
Movies and TV Shows pages with a genre filter
Search from the top bar (movies and TV shows together)
Details page with poster, year, rating, genres and overview
Watchlist: add or remove titles from the Details page, saved in the browser so it survives a refresh
Collapsible sidebar: tap the menu icon in the top bar to slide it in or out, so it never covers the posters
Tech stack
React and Vite
React Router
Material UI (MUI) and MUI icons
TMDB API
GitHub for version control and Vercel for hosting
Getting started
1. Prerequisites
Node.js 18 or newer
A free TMDB account and API key: https://www.themoviedb.org/settings/api
2. Clone and install
bash
git clone https://github.com/aparoolive9-blip/movie-discovery.git
cd movie-discovery
npm install
3. Add your API key
Create a file named .env in the project root (next to package.json):

VITE_TMDB_API_KEY=your_key_here
The variable name must match the one read in src/api/tmdb.js. Vite only loads .env when it starts, so restart the dev server after any change to it.

4. Run
bash
npm run dev
Open the address shown in the terminal (usually http://localhost:5173).

5. Build for production
bash
npm run build
npm run preview
Deploying to Vercel
Push the project to GitHub.
Add a vercel.json file in the project root so page links still work after a refresh:
json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
On vercel.com, choose Add New, then Project, and import the repository.
Keep the detected Vite settings (build command npm run build, output folder dist).
Under Environment Variables, add VITE_TMDB_API_KEY with your TMDB key.
Click Deploy. Every later git push redeploys the site automatically.
Project structure
src/
  api/tmdb.js             TMDB request functions
  hooks/useFetch.js       data loading hook (data, loading, error)
  hooks/useWatchlist.js   watchlist saved in localStorage
  components/             Navbar, Sidebar, MovieCard, MovieRow, MovieGrid,
                          GenreFilter, Loader, ErrorMessage
  pages/                  Home, Movies, TvShows, Search, Details, Watchlist
  App.jsx                 layout and routes
  main.jsx                app entry point (theme and router)
Routes
Path	Page
/	Home
/movies	Movies with genre filter
/tv	TV Shows with genre filter
/search?q=...	Search results
/watchlist	My Watchlist
/:type/:id	Details (type is movie or tv)

