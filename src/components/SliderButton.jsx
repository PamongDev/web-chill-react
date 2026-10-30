export default function SliderButton({ direction, onClick }) {
    const isLeft = direction === "left";

    return (
        <button 
            className={`slider-button ${direction}`} 
            onClick={onClick}
            aria-label={`Scroll ${direction}`}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={isLeft ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}></polyline>
            </svg>
        </button>
    );
}