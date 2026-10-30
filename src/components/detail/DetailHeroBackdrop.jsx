export default function DetailHeroBackdrop({ bg, title }) {
    return (
        <section className="detail-hero-backdrop">
            <img src={`/${bg}`} alt={`${title} Background`} className="backdrop-img" />
            <div className="backdrop-overlay"></div>
        </section>
    );
}