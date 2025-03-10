import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@monorepo/api-types";

// Contexte pour l'authentification
const AuthContext = createContext<{ currentUser: User; loading: boolean, error: boolean }>({ 
    currentUser: {
        id: "",
        email: "",
        name: null,
        role: "Member",
    }, 
    loading: true, 
    error: false, 
});

async function fetchUser() {
    // Utiliser la variable d'environnement pour l'URL de l'API
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/auth/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        return Promise.reject(response);
    }

    return response.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Utilisation de useQuery pour récupérer l'utilisateur
    const { data: currentUser, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    return (
        <AuthContext.Provider value={{ currentUser, loading: isLoading, error: isError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
