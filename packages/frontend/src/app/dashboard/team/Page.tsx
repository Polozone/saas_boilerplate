import TeamTable from "./TeamTable";
import InviteToTeam from "./InviteToTeam";

export default function Page() {
    return (
        <div className="w-full">
            <InviteToTeam />
            <TeamTable />
        </div>
    )
}