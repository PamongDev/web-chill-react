export default function SearchInputHeader({ query, onQueryChange, inputRef, onClose }) {
    return (
        <div className="search-modal-top">
            <div className="container search-modal-header">
                <svg className="search-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                
                <input 
                    ref={inputRef}
                    type="text" 
                    className="search-modal-input"
                    placeholder="Ketik judul film, series, atau aktor..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                />

                <button className="search-close-btn" onClick={onClose} aria-label="Tutup pencarian">
                    Batal
                </button>
            </div>
        </div>
    );
}