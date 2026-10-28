import { Link } from "react-router-dom";

export default function GenreBadge({ genre, type = "all" }) {
    // Menentukan URL tujuan berdasarkan konteks (Movie / Series / Global)
    const baseUrl = "/a/genre/";
    if (type === "movie") baseUrl = "/movies/genre";
    if (type === "series") baseUrl = "/series/genre";

    return (
        <Link 
            to={`${baseUrl}${genre.toLowerCase()}`}
        >
            {genre}
        </Link>
    );
}