import { Link } from "react-router-dom";

// Helper component untuk Error
const ErrorMessage = ({ message }) => (
    <span className="error-text" aria-live="polite">
        {message || "\u00A0"}
    </span>
);

export default function LoginForm({ dataLogin, message, isLoading, onChange, onSubmit }) {
    return (
        <div className="login-form-panel">
            <div className="form-header">
                <h2>Sign in</h2>
                <p>Enter your account details to continue.</p>
            </div>
            
            <ErrorMessage message={message} />

            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        placeholder="Enter your username"
                        autoComplete="off"
                        value={dataLogin.username}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <div className="password-label">
                        <label htmlFor="password">Password</label>
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
                        value={dataLogin.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="button button-primary button-block"
                    disabled={isLoading}
                >
                    {isLoading ? "Memproses..." : "Login"}
                </button>

                <div className="form-divider">
                    <span>OR</span>
                </div>

                <Link 
                    to="https://accounts.google.com" 
                    className="button button-outline button-block" 
                    style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <span className="google-icon" style={{ marginRight: '8px' }}>G</span>
                    Continue with Google
                </Link>

                <p className="register-text">
                    Don't have an account? <Link to="/register">Create One</Link>
                </p>
            </form>
        </div>
    );
}