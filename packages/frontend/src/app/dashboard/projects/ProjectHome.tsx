import { useProjectStore } from "./useStore"

export default function ProjectHome(){
  
	const { project } = useProjectStore();

  return (
      <div>
          Project name : {project?.name}
      </div>
  )
}