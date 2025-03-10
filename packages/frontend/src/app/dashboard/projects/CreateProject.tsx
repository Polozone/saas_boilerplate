import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { api } from "@/ts-rest/tsr"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useProjectStore } from "./useStore"
import { useActionData, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/auth/AuthContext"

export default function CreateProject() {
  
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const createProjectMutation = api.project.create.useMutation();
  const { setProject } = useProjectStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await createProjectMutation.mutateAsync({
        body: {
          name: projectName,
        },
      });
      
      if (response.status === 201) {
        setProject(response.body);
        queryClient.invalidateQueries({queryKey: ["project", currentUser.id]})
        navigate("/dashboard/project")
      }
      
      setOpen(false);
      setProjectName("");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Create a new project to access all features
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="col-span-3"
                placeholder="My awesome project"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!projectName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}