"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userSchema, UserSchema } from "@/app/lib/validators/userSchema";
import { FormField } from "@/app/components/ui/FormField";
import { loginUser } from "@/app/lib/api";

const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

type LoginSchema = Pick<UserSchema, "email" | "password">;

const signInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (user: LoginSchema) => loginUser(user),
    onSuccess: () => {
      router.push("/pages/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField<LoginSchema>
          label="Email"
          name="email"
          placeholder="Enter your email"
          register={register}
          errors={formState.errors}
        />
        <FormField<LoginSchema>
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
        {mutation.isPending && <p>Logging in...</p>}
        {mutation.isSuccess && <p>{mutation.data.message}</p>}
        {mutation.isError && <p>Login failed: {mutation.error.message}</p>}
      </form>
      
    </div>
  );
};

export default signInForm;