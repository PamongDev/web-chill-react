import { useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/components.css";
export default function Header({ username, email }) {
    const navigate = useNavigate();
    const { isOpen, handletoogle, menuRef } = useDropdown();

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        navigate("/sign-in");
    }
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

                        <div className={`profile-menu ${isOpen ? "is-open" : ""}`} ref={menuRef}>

                            <button
                                className="profile-trigger"
                                type="button"
                                onClick={handletoogle}
                                aria-label="Open profile menu"
                                aria-expanded={isOpen}
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

                            <ProfileDropdown username={username} email={email} handleLogout={handleLogout}></ProfileDropdown>
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}