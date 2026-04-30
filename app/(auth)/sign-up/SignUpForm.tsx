"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { userSchema, UserSchema } from "@/app/lib/validators/userSchema";
import { createUser } from "@/app/lib/api";
import { FormField } from "@/app/components/ui/FormField";

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error("Error creating user", error);
    },
  });

  const onSubmit = (data: UserSchema) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField<UserSchema>
        label="Name"
        name="name"
        placeholder="Enter your name"
        register={register}
        errors={errors}
      />

      <FormField<UserSchema>
        label="Email"
        name="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
      />

      <FormField<UserSchema>
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        register={register}
        errors={errors}
      />

      <button type="submit">Sign Up</button>

      {mutation.isPending && <p>Submitting...</p>}
      {mutation.isSuccess && <p>Success!</p>}
      {mutation.isError && <p>Error!</p>}
    </form>
  );
};

export default SignUpForm;