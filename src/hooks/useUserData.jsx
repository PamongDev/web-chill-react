import { createContext, useContext, useState, useEffect } from "react";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
    const [watchHistory, setWatchHistory] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Tambahan state untuk menangani error jika fetch gagal
    const [error, setError] = useState(null);

    // ==========================================
    // 1. INISIALISASI DATA MENGGUNAKAN FETCH
    // ==========================================
    useEffect(() => {
        const initializeData = async () => {
            try {
                const localWatchlist = localStorage.getItem("chill_watchlist");
                const localHistory = localStorage.getItem("chill_history");

                if (!localWatchlist || !localHistory) {
                    // FETCH DARI FOLDER PUBLIC (Simulasi API)
                    const response = await fetch("/data/mockUserData.json");
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const mockData = await response.json();

                    // Simpan hasil fetch ke LocalStorage
                    localStorage.setItem("chill_watchlist", JSON.stringify(mockData.watchlist));
                    localStorage.setItem("chill_history", JSON.stringify(mockData.history));
                    
                    // Set State
                    setWatchlist(mockData.watchlist);
                    setWatchHistory(mockData.history);
                } else {
                    // JIKA SUDAH ADA: Pakai data dari LocalStorage
                    setWatchlist(JSON.parse(localWatchlist));
                    setWatchHistory(JSON.parse(localHistory));
                }
            } catch (err) {
                console.error("Gagal mengambil mock data:", err);
                setError(err.message);
                
                // Fallback jika fetch gagal (misal server error), pastikan state tidak undefined
                setWatchlist([]);
                setWatchHistory([]);
            } finally {
                setIsLoaded(true);
            }
        };

        initializeData();
    }, []); // Render 1x saat aplikasi dimuat

    // ==========================================
    // 2. AUTO-SAVE KE LOCALSTORAGE
    // ==========================================
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("chill_watchlist", JSON.stringify(watchlist));
        }
    }, [watchlist, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("chill_history", JSON.stringify(watchHistory));
        }
    }, [watchHistory, isLoaded]);

    // ==========================================
    // 3. FUNGSI CRUD UNTUK WATCHLIST (Niat Nonton)
    // ==========================================
    
    // Ubah pengecekan ID dengan memaksa keduanya menjadi String
    const isInWatchlist = (id) => watchlist.some((item) => String(item.id) === String(id));

    const toggleWatchlist = (movie) => {
        setWatchlist((prev) => {
            // Gunakan String() untuk membandingkan ID
            if (prev.some((m) => String(m.id) === String(movie.id))) {
                // Logika Hapus
                return prev.filter((m) => String(m.id) !== String(movie.id)); 
            } else {
                // Logika Tambah
                return [{ ...movie, addedAt: new Date().toISOString() }, ...prev]; 
            }
        });
    };

    // ==========================================
    // 4. FUNGSI CRUD UNTUK HISTORY (Jejak Tontonan)
    // ==========================================
    const updateHistory = (movie, currentTime, duration, episodeId = null) => {
        if (!duration || duration === 0) return;

        const progressPercent = Math.round((currentTime / duration) * 100);

        setWatchHistory((prev) => {
            const filtered = prev.filter((m) => m.id !== movie.id);
            
            const updatedMovie = { 
                ...movie, 
                progressPercent, 
                lastTime: currentTime,
                updatedAt: new Date().toISOString()
            };
            if (episodeId) updatedMovie.lastEps = episodeId;

            return [updatedMovie, ...filtered];
        });
    };

    const removeFromHistory = (id) => {
        setWatchHistory((prev) => prev.filter((m) => m.id !== id));
    };

    // ==========================================
    // 5. EXPORT
    // ==========================================
    return (
        <UserDataContext.Provider value={{ 
            watchlist, 
            watchHistory, 
            isLoaded,
            error,
            toggleWatchlist, 
            isInWatchlist,
            updateHistory,
            removeFromHistory
        }}>
            {children}
        </UserDataContext.Provider>
    );
}

export const useUserData = () => useContext(UserDataContext);