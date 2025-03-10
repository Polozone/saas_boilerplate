import { api } from "@/ts-rest/tsr";
import { useAuth } from "@/auth/AuthContext";
import { useProjectStore } from "../projects/useStore";

export const useOrganization = () => {
  const { currentUser } = useAuth();
  const { project } = useProjectStore();

  if (!currentUser?.id || !project?.organizationId) {
    return {
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      status: 'success',
    }
  }

  return api.organization.get.useQuery({
    queryKey: ["organization", currentUser.id],
    queryData: {
      params: {
        id: project.organizationId
      }
    },
    enabled: !!project.organizationId,
    refetchOnMount:"always"
  })
}