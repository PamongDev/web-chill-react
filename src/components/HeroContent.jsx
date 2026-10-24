export default function HeroContent({movie}){

    if(!movie) return null;
    return (
        <div className="hero-content">
            <p className="eyebrow">CHILL ORIGINAL EXPERIENCE</p>
            <h1 className="hero-title">{movie.title}</h1>
            <div className="hero-meta">
                {movie.year && <span>{movie.year}</span>}
                {movie.rating && <span>{movie.rating}</span>}
                {movie.duration && <span>{movie.duration}</span>}
                
                {/* Looping genre agar rapi */}
                {movie.genres && movie.genres.map((genre, index) => (
                    <span key={index}>{genre}</span>
                ))}
            </div>
            <p className="hero-description">
                {/* Jika di JSON tidak ada deskripsi, kita pakai teks default */}
                {movie.synopsis || movie.description || "Sebuah petualangan luar biasa menanti Anda. Saksikan sekarang hanya di Chill."}
            </p>

            <div className="hero-actions">
                <a className="button button-primary" href="#">▶ Watch Now</a>
                <button className="button button-secondary" type="button">＋ Playlist</button>
            </div>
        </div>
    )
}