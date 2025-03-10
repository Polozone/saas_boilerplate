import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { useAuth } from "@/auth/AuthContext";
import { User} from "@monorepo/api-types";  
import { RoleUser } from "@monorepo/api-types";
import { api } from "@/ts-rest/tsr";
import { useOrganization } from "./useStore";
import { useProjectStore } from "../projects/useStore";

interface SelectRoleProps {
  user: User;
}

export default function SelectRole({ user }: SelectRoleProps) {
  const { currentUser } = useAuth();

  // const { setOrganization, updateUserRole } = useOrganizationStore();
  const { data: organization } = useOrganization();
  const { project } = useProjectStore();
  const updateOrganizationMutation = api.organization.updateUserRole.useMutation();

  if (
    user.role === "Owner" || 
    currentUser.role === "Member" || 
    currentUser.id === user.id || (user.role === "Admin" && currentUser.role === "Admin" )) {
    return (
      <div className="w-[180px] px-3 py-2 border rounded-md">
        {user.role}
      </div>
    );
  }

  const handleRoleChange = async (newRole: RoleUser) => {
    if (!project) return;
    try {
      await updateOrganizationMutation.mutateAsync({
        body: {
          id: project.organizationId,
          ownerId: project.ownerId,
          users: [{
            operation: "update",
            email: user.email,
            data: { role: newRole }
          }]
        }
      });
    } catch (error) {
      // Rollback en cas d'erreur
      // setOrganization(organization.body);
      console.error("Failed to update user role:", error);
    }
  };

  return (
    <Select onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={user.role} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Member">Member</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
