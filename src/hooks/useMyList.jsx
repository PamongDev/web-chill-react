import { createContext, useContext, useState, useEffect } from "react";

// Buat Context
const MyListContext = createContext();

// Provider untuk membungkus aplikasi
export function MyListProvider({ children }) {
    // 1. Ambil data dari localStorage saat aplikasi pertama kali dimuat
    const [myList, setMyList] = useState(() => {
        const savedList = localStorage.getItem("chill_mylist");
        return savedList ? JSON.parse(savedList) : [];
    });

    // 2. Setiap kali myList berubah, simpan otomatis ke localStorage
    useEffect(() => {
        localStorage.setItem("chill_mylist", JSON.stringify(myList));
    }, [myList]);

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