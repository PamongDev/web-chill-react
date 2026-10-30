export default function EmptyPlaylistState() {
    return (
        <div className="empty-state" style={{ textAlign: "center", marginTop: "10vh", paddingBottom: "20vh" }}>
            <svg 
                viewBox="0 0 24 24" 
                width="60" 
                height="60" 
                fill="none" 
                stroke="#555" 
                strokeWidth="1" 
                style={{ marginBottom: "1rem" }}
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Daftarmu masih kosong
            </h3>
            <p style={{ color: "#888" }}>
                Simpan film dan series favoritmu agar lebih mudah ditonton nanti.
            </p>
        </div>
    );
}