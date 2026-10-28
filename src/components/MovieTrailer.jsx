export default function MovieTrailer({ video, isMuted }) {
  if (!video) return null;
  const muted = isMuted ? "1" : "0";
  const videoId = video.key;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: `${muted}`,
    controls: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
  });

  return (
        <iframe
            className="hero-video"
            src={`https://www.youtube.com/embed/${videoId}?${params}`}
            title={`${video.title} Official Trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
        />
  );
}



