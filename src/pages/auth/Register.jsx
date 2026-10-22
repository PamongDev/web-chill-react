import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styles/auth.css';




function Register() {
    const navigate = useNavigate();
    const ErrorMessage = ({ message }) => {
    return (
        <span className="error-text" aria-live="polite">
            {message || "\u00A0"}
        </span>
    );
    };

    const apiKey = "http://localhost:3000/users";

    const [dataProfile, setDataProfile] = useState(
        {
            username : "",
            email : "",
            password : "",
            cpassword : ""
        }
    );

    const [message, setMessage] = useState({
        username : "",
        email : "",
        password : "",
        global : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // 1. Update data form
        setDataProfile({
            ...dataProfile,
            [name]: value
        });
        
        // 2. Siapkan wadah untuk pesan baru agar tidak bentrok
        let newMessages = { ...message, global: "" };

        // 3. Validasi Real-time HANYA untuk Password & Hapus error saat ngetik
        if (name === "username") newMessages.username = "";
        if (name === "email") newMessages.email = "";
        
        if (name === "cpassword" || name === "password") {
            const currentPass = name === "password" ? value : dataProfile.password;
            const currentCPass = name === "cpassword" ? value : dataProfile.cpassword;
            
            if (currentCPass !== "" && currentPass !== currentCPass) {
                newMessages.password = "Password tidak cocok";
            } else {
                newMessages.password = "";
            }
        }

        setMessage(newMessages);
        };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validasi Kosong (Pengecekan awal)
        if (!dataProfile.username || !dataProfile.email || !dataProfile.password || !dataProfile.cpassword) {
            setMessage({ ...message, global: "Semua data wajib diisi" });
            return; // Stop fungsi di sini
        }

        // 2. Validasi Password Cocok
        if (dataProfile.password !== dataProfile.cpassword) {
            setMessage({ ...message, password: "Password tidak cocok" });
            return; // Stop fungsi di sini
        }

        // 3. Cek ke json-server (GET) apakah username/email sudah terdaftar
        fetch(apiKey)
            .then((response) => response.json())
            .then((database) => {
                // Mengecek ke seluruh data (bukan cuma index [0])
                const isUsernameExist = database.some((user) => user.username === dataProfile.username);
                const isEmailExist = database.some((user) => user.email === dataProfile.email);

                if (isUsernameExist) {
                    setMessage({ ...message, username: "Username telah terdaftar, coba yang lain." });
                    return; // Stop fungsi di sini
                }

                if (isEmailExist) {
                    setMessage({ ...message, email: "Email telah terdaftar, coba yang lain." });
                    return; // Stop fungsi di sini
                }

                // 4. Jika semua validasi LOLOS, simpan data ke json-server (POST)
                const newUser = {
                    username: dataProfile.username,
                    email: dataProfile.email,
                    password: dataProfile.password
                    // cpassword tidak usah disimpan ke database
                };

                fetch(apiKey, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                .then((response) => {
                    if (response.ok) {
                        alert("Registrasi Berhasil! Data sudah masuk ke users.json");
                        
                        // Kosongkan form
                        setDataProfile({ username: "", email: "", password: "", cpassword: "" });
                        setMessage({ username: "", email: "", password: "", global: "" });
                        
                        // Di sini kamu bisa pakai useNavigate dari react-router-dom untuk redirect ke /login
                        navigate("/sign-in");
                    }
                })
                .catch((error) => console.error("Gagal POST data:", error));

            })
            .catch((error) => {
                console.error("Gagal GET data:", error);
                setMessage({ ...message, global: "Gagal terhubung ke server." });
            });
    };


    return (
        <div className="page">

        <main className="auth-main">
            <section className="login-card">

                <div className="login-welcome">
                    <div className="welcome-content">
                        <img
                            src="assets/images/main/logo only no bg.png"
                            alt="Chill"
                            className="welcome-logo"
                        />
                        <h1>
                            Welcome to
                            <span>Your Cinema</span>
                        </h1>
                        <p>
                            Your place to relax, discover,
                            and enjoy your favorite content.
                        </p>
                    </div>
                    <div className="welcome-footer">
                        <span>Relax. Watch. Enjoy.</span>
                    </div>

                </div>

                <div className="login-form-panel">
                    <div className="form-header">
                        <h2>
                            Create account
                        </h2>
                        <p>
                            Fill in your information to get started.
                        </p>
                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                autoComplete="off"
                                className="input"
                                value={dataProfile.username}
                                onChange={handleChange}
                                required
                            />
                            <ErrorMessage message={message.username}/>
                        </div>

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="input"
                                value={dataProfile.email}
                                onChange={handleChange}
                                required
                            />
                            <ErrorMessage message={message.email}/>

                        </div>

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="input"
                                value={dataProfile.password}
                                onChange={handleChange}
                                required
                            />
                            <ErrorMessage message={message.password}/>

                        </div>

                        <div className="form-group">

                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="cpassword"
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                                className="input"
                                value={dataProfile.cpassword}
                                onChange={handleChange}
                                required
                            />
                            <ErrorMessage message={message.password}/>

                        </div>
                        <button
                            type="submit"
                            className="button button-primary button-block"
                        >
                            Create account
                        </button>

                        <p className="register-text">

                            Already have an account?

                            <Link to="/sign-in">Sign in</Link>

                        </p>

                    </form>

                </div>

            </section>
        </main>

        <footer className="auth-footer">

            <p>
                &copy; 2026 Chill. All rights reserved.
            </p>

        </footer>
    </div>
    )
}

export default Register;