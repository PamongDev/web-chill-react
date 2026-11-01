import { Link } from "react-router-dom";

export default function GenreBadge({ genre, type = "all" }) {
    const basePath = type === "movie"
        ? "/movies/genre"
        : type === "series"
            ? "/series/genre"
            : "/a/genre";

    return (
        <Link 
            to={`${basePath}/${genre.toLowerCase()}`}
        >
            {genre}
        </Link>
    );
}