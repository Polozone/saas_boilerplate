import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project } from "@monorepo/api-types";

interface ProjectStoreState {
	project: Project | null;
	setProject: (proj: Project | null) => void;
}

export const useProjectStore = create<ProjectStoreState>()(
	persist(
		(set) => ({
			project: null,
			setProject: (proj: Project | null) => set({ project: proj }),
		}),
		{ name: "project-storage" }
	)
);
  