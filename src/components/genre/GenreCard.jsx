import { Link } from "react-router-dom";

export default function GenreCard({ item, isActive, imageSrc }) {
    return (
        <Link
            to={`/a/genre/${encodeURIComponent(item.name)}`}
            className={`genre-card ${isActive ? "active" : ""}`}
        >
            <img src={imageSrc} alt={item.name} loading="lazy" />
            <div className="genre-card-overlay" />
            <h4>{item.name}</h4>
        </Link>
    );
}