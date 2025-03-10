import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Project } from "@monorepo/api-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useProjectStore } from "../projects/useStore";
interface PreviewProjectProps {
	project: Project;
}

export default function PreviewProject({ project }: PreviewProjectProps) {

	const navigate = useNavigate();
	const { setProject } = useProjectStore();

	function handleNavigate() {
		setProject(project);
		navigate("/dashboard/project");
	}

	return (
		<Card className="w-56">
			<CardHeader>
				<CardTitle>
					{project.name}
				</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{"No description"}</p>
			</CardContent>
			<CardFooter>
				<Button 
					variant={"outline"}
					onClick={handleNavigate}
				>
					Open project
				</Button>
			</CardFooter>
		</Card>
	)
}