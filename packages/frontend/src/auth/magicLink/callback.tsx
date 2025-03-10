import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/ts-rest/tsr";
import SpinnerCenteredFullscreen from "@/components/ui/SpinnerCenteredFullscreen";

export default function MagicLinkCallback() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);

    const { mutate, data, error } = api.auth.signinMagicLinkCallback.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["user"] });
            navigate("/dashboard");
        },
        onError: () => {
            return <p>Erreur d'authentification</p>;
        }
    });

    useEffect( () => {
        if (!urlParams.get("token")) {
            return;
        }

        mutate({
            body: {
                token: urlParams.get("token") || ''
            }
        });
    }, [])

    if (data) {
        navigate("/dashboard");
    }

    if (error) {
        return <p>Invalid link</p>;
    }

    return <SpinnerCenteredFullscreen />;
}
