import '../../styles/home.css';

function Home(){
    return(
        <>
        <header className="site-header">
            <div className="container navbar-wrap">
                <nav className="navbar" aria-label="Main navigation">
                    <a className="brand" href="#" aria-label="Chill home">
                        <img src="assets/images/main/logo only no bg.png" alt="Chill"/>
                    </a>

                    <div className="desktop-nav">
                        <a href="#">Home</a>
                        <a href="#movies">Movies</a>
                        <a href="#series">Series</a>
                        <a href="#playlist">Playlist</a>
                    </div>

                    <div className="nav-actions">

                        <button className="icon-button" type="button" aria-label="Search">
                            <span aria-hidden="true">⌕</span>
                        </button>

                        <div className="profile-menu">

                            <button
                                className="profile-trigger"
                                type="button"
                                aria-label="Open profile menu"
                                aria-expanded="false"
                            >
                                <img
                                    src="assets/images/main/logo app.png"
                                    alt="Fahmi"
                                    className="profile-avatar"
                                />

                                <svg
                                    className="profile-chevron"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M6 9L12 15L18 9"></path>
                                </svg>
                            </button>

                            <div className="profile-dropdown">

                                <div className="profile-dropdown-header">
                                    <img
                                        src="assets/images/main/logo app.png"
                                        alt="Fahmi"
                                        className="profile-dropdown-avatar"
                                    />

                                    <div className="profile-user-info">
                                        <span className="profile-name">Muhamad Fahmi Ammar</span>
                                        <span className="profile-email">muhamad@fahmi.am</span>
                                    </div>
                                </div>

                                <div className="profile-dropdown-divider"></div>

                                <a href="#profile" className="profile-dropdown-item">
                                    <span>My Profile</span>
                                </a>

                                <a href="#playlist" className="profile-dropdown-item">
                                    <span>Playlist</span>
                                </a>

                                <a href="#favorites" className="profile-dropdown-item">
                                    <span>Favorites</span>
                                </a>

                                <a href="#settings" className="profile-dropdown-item">
                                    <span>Settings</span>
                                </a>

                                <a href="#help" className="profile-dropdown-item">
                                    <span>Help Center</span>
                                </a>

                                <div className="profile-dropdown-divider"></div>

                                <button
                                    className="profile-dropdown-item profile-logout"
                                    type="button"
                                >
                                    <span>Logout</span>
                                </button>

                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        </header>

        <main>
            <section className="hero" aria-label="Featured movie">
                <video
                    className="hero-video"
                    src="assets/videos/trailer-movies/t21_bcwk.mp4"
                    poster="assets/images/poster-movies/21_poster_black clover.jpg"
                    autoplay
                    muted
                    loop
                    playsinline
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
                <section className="movie-section" id="movies" aria-labelledby="continue-title">
                    <div className="section-heading">
                        <div>
                            <p className="section-eyebrow">KEEP WATCHING</p>
                            <h2 id="continue-title">Continue Watching</h2>
                        </div>
                        <a className="section-link" href="#">See All <span aria-hidden="true">→</span></a>
                    </div>
                    <div className="movie-row" id="continue-watching-row"></div>
                </section>

                <section className="movie-section" aria-labelledby="top-title">
                    <div className="section-heading">
                        <div>
                            <p className="section-eyebrow">POPULAR RIGHT NOW</p>
                            <h2 id="top-title">Top Movies &amp; Series</h2>
                        </div>
                        <a className="section-link" href="#">See All <span aria-hidden="true">→</span></a>
                    </div>
                    <div className="movie-row" id="top-movies-row"></div>
                </section>

                <section className="movie-section" aria-labelledby="trending-title">
                    <div className="section-heading">
                        <div>
                            <p className="section-eyebrow">WHAT PEOPLE ARE WATCHING</p>
                            <h2 id="trending-title">Trending Now</h2>
                        </div>
                        <a className="section-link" href="#">See All <span aria-hidden="true">→</span></a>
                    </div>
                    <div className="movie-row" id="trending-row"></div>
                </section>

                <section className="movie-section" id="series" aria-labelledby="release-title">
                    <div className="section-heading">
                        <div>
                            <p className="section-eyebrow">JUST ADDED</p>
                            <h2 id="release-title">New Releases</h2>
                        </div>
                        <a className="section-link" href="#">See All <span aria-hidden="true">→</span></a>
                    </div>
                    <div className="movie-row" id="new-releases-row"></div>
                </section>
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
        <script src="script/main.js" defer></script>
    </>)
}

export default Home;