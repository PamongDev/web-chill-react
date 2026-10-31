import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataLogin(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!dataLogin.username || !dataLogin.password) {
            setMessage("Username dan Password wajib diisi");
            return;
        }

        setIsLoading(true);

        try {
            // Karena menggunakan data statis di folder public
            const response = await fetch('/data/users.json');
            if (!response.ok) throw new Error("Gagal mengambil data pengguna");
            
            const database = await response.json();
            const foundUser = database.find(user => user.username === dataLogin.username);

            if (!foundUser) {
                setMessage("Username belum terdaftar");
                setIsLoading(false);
                return;
            }

            if (foundUser.password !== dataLogin.password) {
                setMessage("Username & Password salah");
                setIsLoading(false);
                return;
            }

            // Login Berhasils
            const userSession = {
                username: foundUser.username,
                email: foundUser.email
            };
            
            localStorage.setItem("userLoggedIn", JSON.stringify(userSession));
            navigate("/");

        } catch (error) {
            console.error("Gagal Terhubung ke Database Lokal", error);
            setMessage("Terjadi Kesalahan saat mengakses data");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        dataLogin,
        message,
        isLoading,
        handleChange,
        handleSubmit
    };
}