export default function RegisterWelcome() {
    return (
        <div className="login-welcome">
            <div className="welcome-content">
                <img
                    src="/assets/images/main/logo only no bg.png"
                    alt="Chill Logo"
                    className="welcome-logo"
                />
                <h1>
                    Join <span>Your Cinema</span>
                </h1>
                <p>
                    Create an account to start saving your favorite movies and series.
                </p>
            </div>
            <div className="welcome-footer">
                <span>Relax. Watch. Enjoy.</span>
            </div>
        </div>
    );
}