import { Link } from "react-router-dom";

const ErrorMessage = ({ message, isSuccess }) => (
    <span className={`error-text ${isSuccess ? "success-text" : ""}`} aria-live="polite" style={{ color: isSuccess ? "#4ade80" : "" }}>
        {message || "\u00A0"}
    </span>
);

export default function RegisterForm({ dataRegister, message, isSuccess, isLoading, onChange, onSubmit }) {
    // 🔥 Pengecekan Real-Time: bernilai true JIKA confirmPassword sudah diisi TAPI tidak sama dengan password
    const isMismatch = dataRegister.confirmPassword.length > 0 && dataRegister.password !== dataRegister.confirmPassword;

    return (
        <div className="login-form-panel">
            <div className="form-header">
                <h2>Sign up</h2>
                <p>Create your account to continue.</p>
            </div>
            
            <ErrorMessage message={message} isSuccess={isSuccess} />

            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        placeholder="Choose a username"
                        autoComplete="off"
                        value={dataRegister.username}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={dataRegister.email}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password (min. 6 chars)"
                        autoComplete="new-password"
                        className="input"
                        value={dataRegister.password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>

                {/* 🔥 BAGIAN VALIDASI CONFIRM PASSWORD REAL-TIME */}
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        // Jika isMismatch true, tambahkan class error (misal border merah)
                        className={`input ${isMismatch ? "input-error" : ""}`} 
                        value={dataRegister.confirmPassword}
                        onChange={onChange}
                        required
                    />
                    {/* Pesan error real-time muncul langsung di bawah input */}
                    {isMismatch && (
                        <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                            * Password tidak cocok
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="button button-primary button-block"
                    // Tombol didisable jika loading, success, atau password belum cocok
                    disabled={isLoading || isSuccess || isMismatch} 
                >
                    {isLoading ? "Memproses..." : "Register"}
                </button>

                <div className="form-divider">
                    <span>OR</span>
                </div>

                <p className="register-text">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </p>
            </form>
        </div>
    );
}