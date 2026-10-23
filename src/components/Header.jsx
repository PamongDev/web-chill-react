export default function Header() {
    return (
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
                                        <span className="profile-name">{user.username}</span>
                                        <span className="profile-email">{user.email}</span>
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
    )
}