// UNCOMMENT TO USE EMAIL/PASSWORD AUTH

// import React, { useEffect, useState } from "react"
// import { useNavigate } from 'react-router-dom'
// import { useQuery } from "@tanstack/react-query";
// import Spinner from "../ui/Spinner";
// import { useMutation } from "@tanstack/react-query";
// import { useAuth } from "./AuthContext";
// import Providers from "./Provider";


// export default function Signin() {

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();
//   const { currentUser , loading } = useAuth();

//   useEffect(() =>{
//     if (user){
//       navigate("/dashboard") // if user is registered, navigate to dashboard
//     } 
//   }, []);

//   const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const fetchSignIn = async () => {
//     const response = await fetch("http://localhost:4000/auth/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ email, password }),
//     });
  
//     if (!response.ok) {
//       const error = new Error(`HTTP error! status: ${response.status}`);
//       (error as any).status = response.status;
//       throw error;
//     }

//     const res = await response.json();

//     if (res.success){
//       navigate("/dashboard");
//     }
//     return response.json();
//   };

//   const { data, error, refetch, isFetching } = useQuery({
//     queryKey: ["signin"],
//     queryFn: fetchSignIn,
//     enabled: false, // Empêche l'exécution automatique
//     retry: false, // Pas de retry automatique
//   });

//   function goToSignup() {
//     navigate("/signup")
//   }

//   // if (isLoading) return <h1>LOADING</h1>

//   // if (error) return <h1>ERROR</h1>

//   return (
//     <>
//       {/*
//           This example requires updating your template:
  
//           ```
//           <html class="h-full bg-white">
//           <body class="h-full">
//           ```
//         */}
//       <div className="flex h-screen flex-1">
//         <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
//           <div className="mx-auto w-full max-w-sm lg:w-96">
//             <div>
//               <img
//                 alt="Your Company"
//                 src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-10 w-auto"
//               />
//               <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
//               <p className="mt-2 text-sm/6 text-gray-500">
//                 Not a member?{' '}
//                 <a
//                   onClick={goToSignup}
//                   href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                   Sign up
//                 </a>
//               </p>
//             </div>

//             <div className="mt-10">
//               <div>
//                 <div className="space-y-2">
//                   <div>
//                     <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                       Email address
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         onChange={onEmailChange}
//                         id="email"
//                         name="email"
//                         type="email"
//                         required
//                         autoComplete="email"
//                         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//                       Password
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         onChange={onPasswordChange}
//                         id="password"
//                         name="password"
//                         type="password"
//                         required
//                         autoComplete="current-password"
//                         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex gap-3">
//                       <div className="flex h-6 shrink-0 items-center">
//                         <div className="group grid size-4 grid-cols-1">
//                           <svg
//                             fill="none"
//                             viewBox="0 0 14 14"
//                             className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                           >
//                             <path
//                               d="M3 8L6 11L11 3.5"
//                               strokeWidth={2}
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               className="opacity-0 group-has-[:checked]:opacity-100"
//                             />
//                             <path
//                               d="M3 7H11"
//                               strokeWidth={2}
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>

//                   </div>

//                   <div>
//                     <button
//                       onClick={() => refetch()}
//                       type="submit"
//                       className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Sign in
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="relative hidden w-0 flex-1 lg:block">
//           <img
//             alt=""
//             src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
//             className="absolute inset-0 size-full object-cover"
//           />
//         </div>
//       </div>
//     </>
//   )
// }
