import { data, Link } from "react-router-dom";
import '../../styles/auth.css';
import { useState } from "react";




function Register() {

    const ErrorMessage = ({message}) =>{
        if (!message) return null;

        return (
            <span className="error-text">{message}</span>
        );
    }

    const database = [{
        username : "fahmi",
        email : "fahmi@gmail.com",
        password : "123",
        cpassword : "123"
    }];

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



    const handleChange = (e) =>{
        const { name, value } = e.target;
        setDataProfile({
            ...dataProfile,
            [name] : value
        })
        
        if (name === "username"){            
            if (database[0].username === value){
                setMessage({...message, username : "Username telah terdaftar, coba gunakan username lain"});
                console.log(value);
            }else{
                setMessage({...message, username : ""});
            }
        }
        if (name === "email"){
            if (database[0].email === value){
                setMessage({...message, email : "Email telah terdaftar, coba gunakan email lain"});
            }else{
                setMessage("");
            }
        }
        if (name === "cpassword"){
            if (value !== dataProfile.password){
                setMessage({...message, password : "Password tidak cocok"});
            }else {
                setMessage({...message, password : ""})
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validasi kosong

        if (!dataProfile.username || !dataProfile.email || !dataProfile.password || !dataProfile.cpassword){
            setMessage({...message, global : "Semua data wajib diisi"})
            return;
        }
        // validasi password cocok
        if (dataProfile.password !== dataProfile.cpassword){
            setMessage({...message, global : "data password tidak cocok"})
            return;
        }
        // username belum digunakan

        // berhasil
        setMessage({...message, global : "akun berhasil dibuat"})
        console.log("data akan dikirimkan ke database");
    }


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
                        <ErrorMessage message={message.global}/>
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