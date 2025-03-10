import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode, useRef } from "react";
import { api } from "@/ts-rest/tsr";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const [refreshingToken, setRefreshingToken] = useState(false);
  // Utilisation d'une ref pour compter les appels de refresh (la valeur persiste entre les rendus)
  const refreshCountRef = useRef(0);

  const refreshAuthToken = async () => {
    if (!refreshingToken) {
      try {
        setRefreshingToken(true);
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/auth/refreshtoken`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("invalid or missing refresh_token");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        // Vous pouvez ajouter une gestion supplémentaire ici si besoin
      } finally {
        setRefreshingToken(false);
      }
    }
  };

  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30000,
          retry: (failureCount, error) => {
            if (
              typeof error === "object" &&
              error !== null &&
              "status" in error &&
              (error.status === 400 || error.status === 401)
            ) {
              return false;
            }
            return failureCount <= 1;
          },
        },
      },
      queryCache: new QueryCache({
        onError: async (error, query) => {
          if (
            typeof error === "object" &&
            error !== null &&
            "status" in error &&
            (error.status === 400 || error.status === 401)
          ) {
            if (refreshCountRef.current < 3) {
              refreshCountRef.current++;
              await refreshAuthToken();
              // Réexécuter (invalider) la requête qui a échoué
              queryClient.invalidateQueries({ queryKey: query.queryKey });
            } else {
              console.error("Maximum token refresh attempts reached.");
            }
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: async (error, variables, _context, mutation) => {
          if (
            typeof error === "object" &&
            error !== null &&
            "status" in error &&
            (error.status === 400 || error.status === 401)
          )             if (refreshCountRef.current < 3) {
            refreshCountRef.current++;
            await refreshAuthToken();
            // Réexécuter (invalider) la requête qui a échoué
            mutation.execute(variables);
          } else {
            console.error("Maximum token refresh attempts reached.");
          }
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.ReactQueryProvider>
        {children}
      </api.ReactQueryProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
