/* =========================================================
   CHILL — DATA LOADER
   Stage 1: JS only loads movie data and renders reusable cards.
   Interactive features (hover trailer, play, like, My List, etc.)
   can be added later without changing the HTML structure.
   ========================================================= */

const MOVIE_DATA_URL = "data/dummy-movie.json";

const sectionConfig = {
    continueWatching: document.querySelector("#continue-watching-row"),
    topMovies: document.querySelector("#top-movies-row"),
    trending: document.querySelector("#trending-row"),
    newReleases: document.querySelector("#new-releases-row"),
};

const fallbackMovies = [];
const heroVideo = document.querySelector(".hero-video");
const heroMuteButton = document.querySelector(".hero-mute-button");
const mutedIcon = document.querySelector(".icon-muted");
const unmutedIcon = document.querySelector(".icon-unmuted");

if (heroVideo && heroMuteButton) {
    heroMuteButton.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;

        if (heroVideo.muted) {
            mutedIcon.style.display = "block";
            unmutedIcon.style.display = "none";

            heroMuteButton.setAttribute(
                "aria-label",
                "Unmute trailer"
            );

            heroMuteButton.setAttribute(
                "aria-pressed",
                "true"
            );
        } else {
            mutedIcon.style.display = "none";
            unmutedIcon.style.display = "block";

            heroMuteButton.setAttribute(
                "aria-label",
                "Mute trailer"
            );

            heroMuteButton.setAttribute(
                "aria-pressed",
                "false"
            );
        }
    });
}

function normalizeMovie(movie, index) {
    return {
        id: movie.id ?? index + 1,
        title: movie.title ?? `Movie ${index + 1}`,
        poster: movie.poster ?? movie.posterPath ?? movie.image ?? "",
        trailer: movie.trailer ?? movie.trailerPath ?? movie.video ?? "",
        year: movie.year ?? movie.releaseYear ?? "—",
        rating: movie.rating ?? "—",
        duration: movie.duration ?? "—",
        genres: Array.isArray(movie.genres)
            ? movie.genres
            : Array.isArray(movie.genre)
                ? movie.genre
                : typeof movie.genre === "string"
                    ? movie.genre.split(",").map((item) => item.trim())
                    : [],
    };
}

function movieCard(movie) {
    const article = document.createElement("article");
    article.className = "movie-card";

    const posterWrap = document.createElement("div");
    posterWrap.className = "movie-poster-wrap";

    const poster = document.createElement("img");
    poster.className = "movie-poster";
    poster.src = movie.poster;
    poster.alt = `${movie.title} poster`;
    poster.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "movie-card-overlay";

    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = movie.title;

    const detail = document.createElement("div");
    detail.className = "movie-detail";

    [movie.year, movie.rating, movie.duration, ...movie.genres.slice(0, 1)].forEach((value) => {
        if (!value || value === "—") return;
        const span = document.createElement("span");
        span.textContent = value;
        detail.appendChild(span);
    });

    overlay.append(title, detail);
    posterWrap.append(poster, overlay);
    article.appendChild(posterWrap);

    return article;
}

function renderSection(element, movies) {
    element.innerHTML = "";
    movies.forEach((movie) => element.appendChild(movieCard(movie)));
}

function renderLoading() {
    Object.values(sectionConfig).forEach((element) => {
        element.innerHTML = `<div class="loading-card">Loading movies…</div>`;
    });
}

function renderError() {
    Object.values(sectionConfig).forEach((element) => {
        element.innerHTML = `<div class="error-card">Movie data could not be loaded. Check <strong>data/movie-list.json</strong>.</div>`;
    });
}

function renderMovies(movies) {
    const normalized = movies.map(normalizeMovie);

    // Stage-1 demo grouping. Later these can come from JSON fields:
    // continueWatching, category, trendingRank, releaseDate, etc.
    renderSection(sectionConfig.continueWatching, normalized.slice(0, 6));
    renderSection(sectionConfig.topMovies, normalized.slice(3, 9));
    renderSection(sectionConfig.trending, normalized.slice(7, 13));
    renderSection(sectionConfig.newReleases, normalized.slice(-6));
}

async function loadMovies() {
    renderLoading();

    try {
        const response = await fetch(MOVIE_DATA_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        const movies = Array.isArray(json) ? json : json.movies;

        if (!Array.isArray(movies) || movies.length === 0) {
            throw new Error("Movie list is empty or not an array.");
        }

        renderMovies(movies);
    } catch (error) {
        console.warn("Falling back to local movie assets:", error);
        renderMovies(fallbackMovies);
    }
}
const profileMenu = document.querySelector(".profile-menu");
const profileTrigger = document.querySelector(".profile-trigger");

if (profileMenu && profileTrigger) {
    profileTrigger.addEventListener("click", () => {
        const isOpen = profileMenu.classList.toggle("is-open");

        profileTrigger.setAttribute(
            "aria-expanded",
            isOpen
        );
    });

    document.addEventListener("click", (event) => {
        if (!profileMenu.contains(event.target)) {
            profileMenu.classList.remove("is-open");
            profileTrigger.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}
document.addEventListener("DOMContentLoaded", loadMovies);
