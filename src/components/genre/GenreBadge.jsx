import { Link } from "react-router-dom";
import useState from "react";

export default function GenreBadge({ genre, type = "all" }) {
    // Menentukan URL tujuan berdasarkan konteks (Movie / Series / Global)
    const [baseUrl, setBaseUrl] = useState("/a/genre/");
    setBaseUrl("/a/genre/");
    if (type === "movie") setBaseUrl("/movies/genre");
    if (type === "series") setBaseUrl("/series/genre");

    return (
        <Link 
            to={`${baseUrl}${genre.toLowerCase()}`}
        >
            {genre}
        </Link>
    );
}