import MuteButton from "./MuteButton";

export default function HeroMuteButton({isMuted, onToggle}){
    return(
        <button
            className="hero-mute-button"
            type="button"
            onClick={onToggle}
            aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
            aria-pressed={!isMuted}
        >
            <MuteButton isMuted={isMuted} />
        </button>
    )
}