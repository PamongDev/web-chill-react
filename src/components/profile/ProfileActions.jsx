import { Link } from "react-router-dom";

export default function ProfileActions({handleLogout}) {
    return (
        <div className="profile-actions">
            <Link to="/playlist" className="profile-btn-primary">
                <span>Jelajahi Playlist</span>
                <span className="profile-btn-arrow">↗</span>
            </Link>

            <Link to="/" className="profile-btn-secondary">
                Kembali ke Beranda
            </Link>
            <button
                    className="profile-btn-secondary"
                    type="button" onClick={handleLogout}
                >
                    Logout
                </button>
        </div>
    );
}