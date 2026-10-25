export const shuffleArray = (array) => {
    return [...array].sort(() => 0.5 - Math.random());
};

export function normalizeSeries(seriesItem, index) {
    return {
        id: seriesItem.id ?? `s-${index}`,
        title: seriesItem.title ?? `Series ${index + 1}`,
        // Map thumbnail ke poster agar MovieCard tidak error
        poster: seriesItem.thumbnail ?? "",
        key : seriesItem.key ?? "",
        year: seriesItem.year ?? "—",
        rating: "TV-MA", // Default rating karena di JSON tidak ada
        duration: `${seriesItem.seasons?.length || 1} Season`,
        genres: Array.isArray(seriesItem.genre) ? seriesItem.genre : [],
        synopsis : seriesItem.synopsis ?? seriesItem.description ?? "" ,
        cast : seriesItem.cast ?? "",
        country : seriesItem.country ?? "",
        director : seriesItem.director ?? "",

    };
}

export function normalizeMovie(movie, index) {
    return {
        id: movie.id ?? index + 1,
        title: movie.title ?? `Movie ${index + 1}`,
        poster: movie.poster ?? movie.posterPath ?? movie.image ?? "",
        trailer: movie.trailer ?? movie.trailerPath ?? movie.video ?? "",
        key: movie.key ?? movie.videoid ?? movie.link ?? "", 
        synopsis : movie.synopsis ?? movie.description ?? "" ,
        year: movie.year ?? movie.releaseYear ?? "—",
        rating: movie.rating ?? "—",
        duration: movie.duration ?? "—",
        genres: Array.isArray(movie.genres) ? movie.genres : 
                Array.isArray(movie.genre) ? movie.genre : 
                typeof movie.genre === "string" ? movie.genre.split(",").map(i => i.trim()) : [],
        cast : movie.cast ?? "",
        country : movie.country ?? "",
        director : movie.director ?? "",
    };
}