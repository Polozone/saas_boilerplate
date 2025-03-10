import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchUser() {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/auth/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        return Promise.reject(response);
    }

    return response.json();
}

export default function JoinOrganizationFromMagicLink() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: false, // Désactivé par défaut, on l’active après le login
    });

    useEffect(() => {
        async function fetchAccessToken() {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (!token) {
                console.error("Token manquant !");
                return;
            }

            try {
                const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
                const response = await fetch(`${baseUrl}/auth/magiclogin/joinorganization/callback`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });

                if (!response.ok) throw new Error("Erreur d'authentification");

                queryClient.invalidateQueries({ queryKey:["user"] });

                navigate("/dashboard");
            } catch (error) {
                console.error("Erreur :", error);
            }
        }

        fetchAccessToken();
    }, []);

    return <p>Connexion en cours...</p>;
}
