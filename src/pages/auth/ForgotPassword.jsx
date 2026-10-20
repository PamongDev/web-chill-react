import { Link } from "react-router-dom";
import '../../styles/auth.css';

function ForgotPassword(){
    return(
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
                            Reset password
                        </h2>

                        <p>
                            Enter the email associated with
                            your account.
                        </p>

                    </div>


                    <form
                        action="/forgot-password"
                        method="post"
                        className="login-form"
                    >

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input"
                                autocomplete="off"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="button button-primary button-block"
                        >
                            Send reset link
                        </button>

                        <p className="register-text">
                            Remember your password?
                            <Link to="/sign-in"> Back to login</Link>
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

export default ForgotPassword;