import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/auth/AuthContext";
import { useProjectStore } from "../projects/useStore";
import { useOrganization } from "./useStore";
import { User } from "@monorepo/api-types";
import Spinner from "@/components/ui/Spinner";
import SelectRole from "./SelectRole";
import DropdownTeamManager from "./DropdownTeamManager";
import { useNavigate } from "react-router-dom";

export default function TeamTable() {
    const { currentUser } = useAuth();
    const { project } = useProjectStore();
    const navigate = useNavigate();

    const { data: organization, isLoading, isError } = useOrganization();

    console.log(organization);

    if (!project) {
        navigate("/dashboard");
        return null;
    }

    if (!currentUser) return null;
    if (isLoading) return <div><Spinner /></div>;
    if (isError) return <p>Error downloading organization</p>;
    if (!organization || !organization.body) return <p className="transition-colors italic">No organization yet, invite a member to create one</p>;

    return (
        <Table>
            <TableCaption>Member(s) of {organization.body.name || "your organization"}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Manage</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {organization.body.users?.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                            <SelectRole 
                                user={user}
                            />
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownTeamManager selectedUser={user} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

