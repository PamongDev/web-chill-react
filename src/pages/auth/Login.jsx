import LoginWelcome from '../../components/auth/LoginWelcome';
import LoginForm from '../../components/auth/LoginForm';
import { useLogin } from '../../hooks/useLogin'
import '../../styles/auth.css';

export default function Login() {
    const { dataLogin, message, isLoading, handleChange, handleSubmit } = useLogin();

    return (
        <div className='page'>
            <main className="auth-main">
                <section className="login-card">
                    <LoginWelcome />
                    <LoginForm 
                        dataLogin={dataLogin}
                        message={message}
                        isLoading={isLoading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </section>
            </main>

            <footer className="auth-footer">
                <p>&copy; 2026 Chill. All rights reserved.</p>
            </footer>
        </div>
    );
}