import '../../styles/home.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import MovieSection from '../../components/MovieSection';

const shuffleArray = (array) => {
    return [...array].sort(() => 0.5 - Math.random());
};

function normalizeSeries(seriesItem, index) {
    return {
        id: seriesItem.id ?? `s-${index}`,
        title: seriesItem.title ?? `Series ${index + 1}`,
        // Map thumbnail ke poster agar MovieCard tidak error
        poster: seriesItem.thumbnail ?? "",
        year: seriesItem.year ?? "—",
        rating: "TV-MA", // Default rating karena di JSON tidak ada
        duration: `${seriesItem.seasons?.length || 1} Season`,
        genres: Array.isArray(seriesItem.genre) ? seriesItem.genre : [],
    };
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
        genres: Array.isArray(movie.genres) ? movie.genres : 
                Array.isArray(movie.genre) ? movie.genre : 
                typeof movie.genre === "string" ? movie.genre.split(",").map(i => i.trim()) : [],
    };
}

function Home(){

    // login logic
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        // cek localstorage
        const sessionData = localStorage.getItem('userLoggedIn');
        if(sessionData){
            setUser(JSON.parse(sessionData));
            
        } else{
            navigate("/sign-in")
        }
    }, [navigate])
    
    // rendering movies
     useEffect(() => {
        const loadMovies = async () => {
            try {
                // Pastikan file dummy-movie.json ada di folder public/data/
                const response = await fetch("../data/dummy-movie.json");
                if (!response.ok) throw new Error("Gagal mengambil data");
                
                const json = await response.json();

                const rawMovies = Array.isArray(json) ? json : json.movies;
                const rawSeries = Array.isArray(json) ? json : json.series;
                
               const normalizedMovies = rawMovies.map(normalizeMovie);
               const normalizedSeries = rawSeries.map(normalizeSeries);

               const shuffleMovies = shuffleArray(normalizedMovies);

               setMovies(shuffleMovies);
               setSeries(normalizedSeries);

            } catch (error) {
                console.log("cek");
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMovies();
    }, []);

    // ni kalo user masih kosong, tidak ada isinya, jangan nampilin apa2
    if (!user) return null;   

    // Pecah data film seperti di skrip lamamu
    const continueWatching = movies.slice(0, 15);
    const topMovies = movies.slice(1, 16);
    const trending = movies.slice(2, 17);
    const newReleases = movies.slice(-15);
    const topSeries = series;

    return(
        <>
        <Header username={user.username} email={user.email}></Header>
        

        <main>
            <section className="hero" aria-label="Featured movie">
                <video
                    className="hero-video"
                    src="assets/videos/trailer-movies/t21_bcwk.mp4"
                    poster="assets/images/poster-movies/21_poster_black clover.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                ></video>

                <div className="hero-overlay"></div>

                <button
                    className="hero-mute-button"
                    type="button"
                    aria-label="Unmute trailer"
                    aria-pressed="true"
                >
                    <span className="hero-mute-icon" aria-hidden="true">
                        <svg
                            className="hero-mute-icon icon-muted"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M11 5L6 9H3V15H6L11 19V5Z"
                            ></path>

                            <path
                                d="M16 9L21 15"
                            ></path>

                            <path
                                d="M21 9L16 15"
                            ></path>
                        </svg>

                        <svg
                            className="hero-mute-icon icon-unmuted"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M11 5L6 9H3V15H6L11 19V5Z"
                            ></path>

                            <path
                                d="M15.5 8.5C16.45 9.45 17 10.7 17 12C17 13.3 16.45 14.55 15.5 15.5"
                            ></path>

                            <path
                                d="M18.5 5.5C20.25 7.25 21.25 9.55 21.25 12C21.25 14.45 20.25 16.75 18.5 18.5"
                            ></path>
                        </svg>
                    </span>
                </button>

                <div className="container hero-content">
                    <p className="eyebrow">CHILL ORIGINAL EXPERIENCE</p>
                    <h1 className="hero-title">Black Clover: Sword of the Wizard King</h1>
                    <div className="hero-meta">
                        <span>2023</span>
                        <span>PG-13</span>
                        <span>1h 53m</span>
                        <span>Action</span>
                        <span>Adventure</span>
                        <span>Fantasy</span>
                        <span>Animation</span>
                    </div>
                    <p className="hero-description">
                        Asta and Yuno, two orphans in a world where magic is everything, embark on a journey to become the Wizard King.
                    </p>

                    <div className="hero-actions">
                        <a className="button button-primary" href="#">▶ Watch Now</a>
                        <button className="button button-secondary" type="button">＋ Playlist</button>
                    </div>
                </div>
            </section>

            <div className="container page-content">
                <MovieSection 
                    eyebrow="KEEP WATCHING" 
                    title="Continue Watching" 
                    linkTo="/movies" 
                    movies={continueWatching} 
                    isLoading={isLoading} 
                />
                
                <MovieSection 
                    eyebrow="POPULAR RIGHT NOW" 
                    title="Top Movies & Series" 
                    linkTo="/movies" 
                    movies={topMovies} 
                    isLoading={isLoading} 
                />
                
                <MovieSection 
                    eyebrow="WHAT PEOPLE ARE WATCHING" 
                    title="Trending Now" 
                    linkTo="/movies" 
                    movies={trending} 
                    isLoading={isLoading} 
                />

                <MovieSection 
                    eyebrow="JUST ADDED" 
                    title="New Releases" 
                    linkTo="/movies" 
                    movies={newReleases} 
                    isLoading={isLoading} 
                />

                <MovieSection 
                    eyebrow="BINGE WORTHY" 
                    title="Top Series" 
                    linkTo="/series" 
                    movies={topSeries} 
                    isLoading={isLoading} 
                />
            </div>
        </main>

        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <img src="assets/images/main/logo only no bg.png" alt="Chill"/>
                    <p>© 2026 Chill. All rights reserved.</p>
                    <p className="footer-muted">Your place to relax, discover, and watch.</p>
                </div>

                <div className="footer-column">
                    <h3>Genres</h3>
                    <div className="footer-links-grid">
                        <a href="#">Action</a>
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                        <a href="#">Horror</a>
                        <a href="#">Romance</a>
                        <a href="#">Sci-Fi</a>
                        <a href="#">Thriller</a>
                        <a href="#">Documentary</a>
                        <a href="#">Animation</a>
                        <a href="#">Fantasy</a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Need Help?</h3>
                    <div className="footer-links-list">
                        <a href="#">Contact Us</a>
                        <a href="#">FAQ</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
        {/* <script src="../../script/main.js" defer></script> */}
    </>)
}

export default Home;