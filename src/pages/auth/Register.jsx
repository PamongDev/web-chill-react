import RegisterWelcome from '../../components/auth/RegisterWelcome';
import RegisterForm from '../../components/auth/RegisterForm';
import { useRegister } from '../../hooks/useRegister';
import '../../styles/auth.css';

export default function Register() {
    const { 
        dataRegister, 
        message, 
        isSuccess,
        isLoading, 
        handleChange, 
        handleSubmit 
    } = useRegister();

    return (
        <div className='page'>
            <main className="auth-main">
                <section className="login-card">
                    <RegisterWelcome />
                    <RegisterForm 
                        dataRegister={dataRegister}
                        message={message}
                        isSuccess={isSuccess}
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