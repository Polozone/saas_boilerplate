import { useAuth } from "@/auth/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { User } from "@monorepo/api-types";
import { api } from "@/ts-rest/tsr";
import { useQueryClient } from "@tanstack/react-query";
import { useOrganization } from "./useStore";
import { useToast } from "@/hooks/use-toast";
import { useProjectStore } from "../projects/useStore";

interface DropdownTeamManagerProps {
    selectedUser: User;
}

type ApiError = {
    status: number;
    body: {
        message: string;
    };
};

export default function DropdownTeamManager({ selectedUser }: DropdownTeamManagerProps) {
    const { currentUser } = useAuth();
    const { data: organization } = useOrganization();
    const queryClient = useQueryClient();
    const { project } = useProjectStore();
    const { toast } = useToast();

    const organizationMutation = api.organization.update.useMutation({
      onMutate: async (newOrganization) => {
        if (!organization || !currentUser.id) return;

        await queryClient.cancelQueries({
          queryKey: ['organization', currentUser.id]
        });

        const previousOrganization = queryClient.getQueryData(['organization', currentUser.id]);

        // Optimistic update - remove user from the list
        queryClient.setQueryData(
          ['organization', currentUser.id],
          {
            ...organization,
            body: {
              ...organization.body,
              users: organization.body.users?.filter(u => u.id !== selectedUser.id)
            }
          }
        );

        return { previousOrganization };
      },
      onError: (error, newOrganization, context) => {
        if (context?.previousOrganization && currentUser.id) {
          queryClient.setQueryData(
            ['organization', currentUser.id],
            context.previousOrganization
          );
          toast({
            variant: "destructive",
            title: "Failed to kick user",
            description: "Please try again",
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['organization', currentUser.id] 
        });
      },
    });

    const handleKickUser = async (userToKick: User) => {
      if (!project) return;

      organizationMutation.mutate({
        body: {
          id: project.organizationId,
          ownerId: project.ownerId,
          users: [{ 
            operation: "disconnect", 
            email: userToKick.email 
          }]
        }
      });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {currentUser.id !== selectedUser.id ?
                    <EllipsisVertical strokeWidth={1} /> : null
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleKickUser(selectedUser)}>
                    Kick
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}