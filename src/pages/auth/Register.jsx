import { Link } from "react-router-dom";
import '../../styles/auth.css';

function Register() {
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


                    <form
                        action="/register"
                        method="post"
                        className="login-form"
                    >

                        <div className="form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Choose a username"
                                autocomplete="off"
                                className="input"
                                required
                                
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                autocomplete="off"
                                className="input"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Create a password"
                                autocomplete="new-password"
                                className="input"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm_password"
                                placeholder="Repeat your password"
                                autocomplete="new-password"
                                className="input"
                                required
                            />

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