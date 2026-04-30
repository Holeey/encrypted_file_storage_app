"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";  
import { userSchema, UserSchema } from "@/app/lib/validators/userSchema";
import { FormField } from "@/app/components/ui/FormField";
import { getuser } from "@/app/lib/api";


const signInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: getuser,
    onSuccess: () => {  
      router.push("/pages/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },  
  });

  const onSubmit = (data: UserSchema) => {
    mutation.mutate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField<UserSchema>
          label="Name"
          name="name"
          placeholder="Enter your name"
          register={register}
          errors={formState.errors}
        />    
        <FormField<UserSchema>
          label="Email"
          name="email"  
          placeholder="Enter your email"
          register={register}
          errors={formState.errors}
        />
        <FormField<UserSchema>
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          register={register}
          errors={formState.errors}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default signInForm