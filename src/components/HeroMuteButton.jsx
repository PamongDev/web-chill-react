export default function HeroMuteButton({isMuted, onToggle}){
    return(
        <button
            className="hero-mute-button"
            type="button"
            onClick={onToggle}
            aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
            aria-pressed={!isMuted}
        >
            <span className="hero-mute-icon" aria-hidden="true">
                {isMuted ? (

                    <svg className="hero-mute-icon icon-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ display: 'block' }}>
                        <path d="M11 5L6 9H3V15H6L11 19V5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M16 9L21 15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M21 9L16 15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                ) : (

                    <svg className="hero-mute-icon icon-unmuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ display: 'block' }}>
                        <path d="M11 5L6 9H3V15H6L11 19V5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M15.5 8.5C16.45 9.45 17 10.7 17 12C17 13.3 16.45 14.55 15.5 15.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.5 5.5C20.25 7.25 21.25 9.55 21.25 12C21.25 14.45 20.25 16.75 18.5 18.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                )}
            </span>
        </button>
    )
}