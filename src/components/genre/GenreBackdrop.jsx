export default function GenreBackdrop({ imageSrc }) {
    return (
        <div className="genre-backdrop">
            <img src={imageSrc} alt="" />
            <div className="featured-overlay" />
        </div>
    );
}