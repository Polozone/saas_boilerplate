import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/ts-rest/tsr";
import { useProjectStore } from "../projects/useStore";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "@/lib/utils";

export default function InviteToTeam() {

  const [email, setEmail] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { project } = useProjectStore();
  const navigate = useNavigate();

  const { mutate } = api.organization.invite.useMutation({
    onSuccess: (newOrganization) => {
      // queryClient.setQueryData(["organization", currentUser.id], newOrganization);
      // queryClient.invalidateQueries({
      //   queryKey: ['organization', currentUser.id]
      // });
      toast({
        variant: "default",
        title: "Email successfully sent to " + email,
        description: "Invitation is valid for 1h",
      });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        variant: "default",
        title: "Oops, invalid email",
      });
    },
  })


  function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!project) return;
    if (event.key === "Enter") {
      if (!isValidEmail(email)) {
        toast({
          variant: "default",
          title: "Oops, invalid email",
        });
        return;
      }
      mutate({
        body: {
          email,
          organizationId: project.organizationId
        }
      });
    }
  };

  if (!project) {
    navigate("/dashboard");
    return null;
  };

  return (
    <div className="flex space-x-4 pb-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Invite Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite a new member</DialogTitle>
            <DialogDescription>
              The invited member will receive an email to join your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                onKeyDown={handleKeyDown}
                onChange={onEmailChange}
                id="name"
                placeholder="email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => mutate({
              body: {
                email,
                organizationId: project.organizationId
              }
            })} type="submit">
              Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
