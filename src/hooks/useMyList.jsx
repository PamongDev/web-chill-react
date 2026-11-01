import { createContext, useContext, useState, useEffect } from "react";

// Buat Context
const MyListContext = createContext();

function getMyListStorageKey() {
    const sessionData = localStorage.getItem("userLoggedIn");

    try {
        const user = JSON.parse(sessionData || "null");
        if (typeof user?.username !== "string" || !user.username) {
            throw new Error("The logged-in user has no valid username.");
        }

        return `chill_mylist:${encodeURIComponent(user.username.toLowerCase())}`;
    } catch (error) {
        console.error("Failed to determine MyList storage key:", error);
        throw error;
    }
}

// Provider untuk membungkus aplikasi
export function MyListProvider({ children }) {
    const [storageKey] = useState(getMyListStorageKey);
    const [myList, setMyList] = useState(() => {
        try {
            const savedList = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            return Array.isArray(savedList) ? savedList : [];

        } catch (error) {
            console.error("Failed to load MyList:", error);
            return [];
        }
    });

    // 2. Setiap kali myList berubah, simpan otomatis ke localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(myList));
    }, [myList, storageKey]);

    // 3. Fungsi untuk mengecek apakah film sudah ada di list
    const isInList = (id) => {
        return myList.some((item) => item.id === id);
    };

    // 4. Fungsi saklar (Toggle): Tambah jika belum ada, Hapus jika sudah ada
    const toggleMyList = (movie) => {
        setMyList((prevList) => {
            if (prevList.some((m) => m.id === movie.id)) {
                // Hapus film dari daftar
                return prevList.filter((m) => m.id !== movie.id);
            } else {
                // Tambahkan film ke daftar (simpan data utuh agar gampang dirender di halaman My List nanti)
                return [...prevList, movie];
            }
        });
    };

    return (
        <MyListContext.Provider value={{ myList, toggleMyList, isInList }}>
            {children}
        </MyListContext.Provider>
    );
}

// Custom Hook agar gampang dipanggil di komponen mana pun
export const useMyList = () => {
    return useContext(MyListContext);
};