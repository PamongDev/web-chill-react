import { useMemo } from "react";
import { useAuth } from "./useAuth";

export function useProfilePage() {
    const { user, handleLogout } = useAuth();

    const userProfile = useMemo(() => {
        if (!user) return null;

        const displayName = user.username || "PamongDev";
        const email = user.email || "pamongdev@chill.id";
        const avatar =
            user.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                displayName
            )}&backgroundColor=1f1f1f`;

        return {
            name: displayName,
            email,
            avatar,
            plan: "Premium VIP",
            validUntil: "31 Desember 2026",
            quality: "Ultra HD (4K) + HDR",
            devices: "2 dari 4 perangkat",
            joinedDate: "Januari 2026",
        };
    }, [user]);

    return {
        user,
        handleLogout,
        userProfile,
    };
}