import { Link } from "react-router-dom";

export default function ProfileActions() {
    return (
        <div className="profile-actions">
            <Link to="/playlist" className="profile-btn-primary">
                <span>Jelajahi Playlist</span>
                <span className="profile-btn-arrow">↗</span>
            </Link>

            <Link to="/" className="profile-btn-secondary">
                Kembali ke Beranda
            </Link>
        </div>
    );
}