import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import ProfileHeading from "../../components/profile/ProfileHeading";
import ProfileUserHeader from "../../components/profile/ProfileUserHeader";
import ProfileMembership from "../../components/profile/ProfileMembership";
import ProfileActions from "../../components/profile/ProfileActions";
import { useProfilePage } from "../../hooks/useProfilePage";
import "../../styles/ProfilePage.css";

export default function Profile() {
    const { user, handleLogout, userProfile } = useProfilePage();

    if (!user || !userProfile) return null;

    return (
        <div className="page-wrapper profile-page">
            <Header
                username={user.username}
                email={user.email}
                handleLogout={handleLogout}
            />

            <main className="profile-main">
                <div className="container profile-container">
                    <ProfileHeading />

                    <section className="profile-card">
                        <ProfileUserHeader userProfile={userProfile} />
                        <ProfileMembership userProfile={userProfile} />
                        <ProfileActions />

                        <div className="profile-card-footer">
                            <span>YOUR SPACE. YOUR STORIES.</span>
                            <span>CHILL MOVIES © 2026</span>
                        </div>
                    </section>
                </div>
            </main>

            <FooterHome />
        </div>
    );
}