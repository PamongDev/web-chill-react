import '../../styles/auth.css';
import { Link } from "react-router-dom";

function Login(){
    return (
        <div className='page'>
            <main className="auth-main">
            <section className="login-card">

                <div className="login-welcome">
                    <div className="welcome-content">

                        <img
                            src="/assets/images/main/logo only no bg.png"
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
                        <h2>Sign in</h2>
                        <p>Enter your account details to continue.</p>
                    </div>


                    <form action="/login" method="post" className="login-form">

                        <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="input"
                                placeholder="Enter your username"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-label">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link to="/forgot-password" className="forgot-link">
                                Forgot Password?
                                </Link>
                            </div>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="button button-primary button-block"
                        >
                            Login
                        </button>

                        <div className="form-divider">
                            <span>OR</span>
                        </div>

                        <button
                            type="button"
                            className="button button-outline button-block"
                        >

                        <Link to="https://accounts.google.com">
                        <span className="google-icon">G</span>
                            Continue with Google</Link>
                        </button>

                        <p className="register-text">
                            Don't have an account?
                            <Link to="/register"> Create One</Link>
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
    );
}

export default Login;