export default function FeaturedBackdrop({ movie }) {
    const imageSrc = movie?.bg || movie?.poster || movie?.thumbnail;

    return (
        <div className="featured-backdrop">
            <img src={`/${imageSrc}`} alt={movie?.title || "Featured Movie"} />
            <div className="featured-overlay"></div>
        </div>
    );
}