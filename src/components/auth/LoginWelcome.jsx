export default function LoginWelcome() {
    return (
        <div className="login-welcome">
            <div className="welcome-content">
                <img
                    src="/assets/images/main/logo only no bg.png"
                    alt="Chill Logo"
                    className="welcome-logo"
                />
                <h1>
                    Welcome to <span>Your Cinema</span>
                </h1>
                <p>
                    Your place to relax, discover, and enjoy your favorite content.
                </p>
            </div>
            <div className="welcome-footer">
                <span>Relax. Watch. Enjoy.</span>
            </div>
        </div>
    );
}