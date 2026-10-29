import { useNavigate } from "react-router-dom";
import "../styles/landscapeCard.css";

export default function LandscapeCard({ movie, progressPercent, timeLabel }) {
    const navigate = useNavigate();

    const isSeries = movie.seasons !== undefined;
    const typeLabel = isSeries ? "Series" : "Movie";

    const handlePlayClick = () => {
        navigate(isSeries ? `/series/detail/${movie.id}` : `/movies/detail/${movie.id}`);
    };

    return (
        <div className="continue-card" onClick={handlePlayClick}>
            <div className="continue-image-wrapper">
                
                {/* 1. Gambar Utama */}
                <img src={`/${movie.bg || movie.poster}`} alt={movie.title} className="continue-img" />
                
                {/* 2. Gradient Bawah (Agar teks selalu terbaca terang walau gambarnya putih) */}
                <div className="continue-gradient"></div>

                {/* 3. Info Teks Menyatu di Dalam Gambar (Pojok Kiri Bawah) */}
                <div className="continue-info-inside">
                    <h4 className="continue-title">{movie.title}</h4>
                    <div className="continue-meta">
                        <span className="continue-type">{typeLabel}</span>
                        <span className="continue-dot">•</span>
                        <span className="continue-time">{timeLabel}</span>
                    </div>
                </div>
                
                {/* 4. Efek Hover Play (Tengah) */}
                <div className="continue-overlay-play">
                    <div className="play-circle">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>

                {/* 5. Progress Bar di paling bawah gambar */}
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                
            </div>
        </div>
    );
}