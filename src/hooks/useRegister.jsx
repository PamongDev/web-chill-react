import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
    const navigate = useNavigate();
    const [dataRegister, setDataRegister] = useState({ 
        username: "", 
        email: "",
        password: "", 
        confirmPassword: "" 
    });
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataRegister(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSuccess(false);

        const { username, email, password, confirmPassword } = dataRegister;

        // 1. Validasi Input Kosong
        if (!username || !email || !password || !confirmPassword) {
            setMessage("Semua kolom wajib diisi");
            return;
        }

        // 2. Validasi Konfirmasi Password
        if (password !== confirmPassword) {
            setMessage("Password dan Konfirmasi Password tidak cocok");
            return;
        }

        setIsLoading(true);

        try {
            // 3. Ambil data dari JSON lokal untuk cek apakah user sudah ada
            const response = await fetch('/data/users.json');
            if (!response.ok) throw new Error("Gagal mengambil data pengguna");
            
            const database = await response.json();
            const userExists = database.some(user => user.username === username);

            if (userExists) {
                setMessage("Username sudah digunakan, silakan pilih yang lain.");
                setIsLoading(false);
                return;
            }

            // 4. Simulasi Sukses Register (Karena React tidak bisa nge-write JSON tanpa backend)
            setIsSuccess(true);
            setMessage("Registrasi berhasil! Mengalihkan ke Login...");
            
            // Redirect ke halaman login setelah 2 detik
            setTimeout(() => {
                navigate("/sign-in");
            }, 2000);

        } catch (error) {
            console.error("Gagal Terhubung ke Database Lokal", error);
            setMessage("Terjadi Kesalahan saat mengakses data");
        } finally {
            if (!isSuccess) setIsLoading(false);
        }
    };

    return {
        dataRegister,
        message,
        isSuccess,
        isLoading,
        handleChange,
        handleSubmit
    };
}