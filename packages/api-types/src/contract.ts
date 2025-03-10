import { initContract } from "@ts-rest/core";
import { authContract } from "./contracts/auth.contract";
import { organizationContract } from "./contracts/organization.contract";
import { userContract } from "./contracts/user.contract";
import { projectContract } from "./contracts/project.contract";

const c = initContract();

export const contract = c.router({
    auth: authContract,
    organization: organizationContract,
    user: userContract,
    project: projectContract
});