// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import SpinnerCenteredFullscreen from "@/components/ui/SpinnerCenteredFullscreen";

export default function ProtectedRoute() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <SpinnerCenteredFullscreen />
        )
    }

    console.log(currentUser);

    return currentUser ? <Outlet /> : <Navigate to="/" replace />;
}
