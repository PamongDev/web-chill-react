function MovieTrailer({ featuredMovie, isMuted }) {
  const muted = isMuted ? 1 : 0;

  console.log(featuredMovie);
  return (
        <iframe
            className="hero-video"
            src={`https://www.youtube.com/embed/${featuredMovie}?autoplay=1&mute=${muted}&controls=0&loop=1&playlist=${featuredMovie}&playsinline=1&rel=0`}
            title={`${featuredMovie} Trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
        />
  );
}

export default MovieTrailer;
