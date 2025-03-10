import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./AuthContext";
import ChooseMailRedirection from "./magicLink/ChooseMailRedirection";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";
import { api } from "@/ts-rest/tsr";
import { Button } from "@/components/ui/button";

export default function Signup() {

  const [email, setEmail] = useState<string>("");
  const [modalGmailRedirection, setModalGmailRedirection] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
  }, [currentUser]);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const { mutate } = api.auth.signinMagicLink.useMutation({
    onSuccess: (data) => {
        setModalGmailRedirection(true);
        toast({
            variant: "default",
            title: "Email successfuly sent at " + email,
            description: "Check your inbox"
        })
    },
    onError: (error) => {
        toast({
            variant: "default",
            title: "Oops, error sending email",
        })
    }
})

const sendLinkIfValidEmail = () => {
    if (!isValidEmail(email)){
        toast({
            variant:"default",
            title: "Oops, invalid email" 
        })
        return;
    }
    mutate({
        body: {
            destination: email
        }
    })
}

const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
        sendLinkIfValidEmail();
    }
};

  function goToSignin() {
    navigate("/signin")
  }

  return (
    <>
      <div className="flex h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Signup to Waboostr</h2>

              {
                modalGmailRedirection ? null :
                  <p className="mt-2 text-sm/6 text-gray-500">
                    Already member?{' '}
                    <Button
                      variant={"link"}
                      onClick={goToSignin}>
                      Sign in
                    </Button>
                  </p>
              }
            </div>
            {
              modalGmailRedirection ?
                <div className="mt-4">
                  <ChooseMailRedirection />
                </div>
                :

                <div className="mt-10">
                  <div>
                    <div className="space-y-2">
                      <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            onKeyDown={handleKeyDown}
                            onChange={onEmailChange}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div>
                        <Button
                          variant={"default"}
                          onClick={sendLinkIfValidEmail}
                          className="w-full"
                          type="submit"
                                            >
                                                    Send me a magic link
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  )
}
