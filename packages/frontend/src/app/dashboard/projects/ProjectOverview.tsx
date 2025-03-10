import PreviewProject from "../team/PreviewProject";
import { api } from "@/ts-rest/tsr";
import CreateProject from "./CreateProject";
import { useAuth } from "@/auth/AuthContext";
import { Project } from "@monorepo/api-types";
import { useProjectStore } from "../projects/useStore";
import { useEffect } from "react";

export default function ProjectOverview() {
    const { currentUser } = useAuth();
    const { setProject } = useProjectStore();
    const { data: projects } = api.project.get.useQuery({queryKey: ["project", currentUser?.id]});

    useEffect(() => {
        setProject(null);
    }, []);

    return (
        <div>
            <CreateProject />
            <div className="flex flex-wrap gap-4 mt-4">
                {projects?.body?.map((project: Project) => (
                    <PreviewProject key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}