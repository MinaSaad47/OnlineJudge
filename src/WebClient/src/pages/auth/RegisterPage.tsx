import { gql } from "@/__codegen__";
import FormInput from "@/components/FormInput.tsx";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const RegisterMutation = gql(`
mutation Register($input: RegisterInput!) {
  register(input: $input) {
me {
    email
}
accessToken
refreshToken
errors {
    __typename
    ... on Error {
        message
    }
}
    }
}
    `);

const RegisterSchema = z
  .object({
    userName: z.string().min(1, { message: "Username is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterSchema = z.infer<typeof RegisterSchema>;

const RegisterPage: React.FC = () => {
  const [register, { loading }] = useMutation(RegisterMutation);

  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    values: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = async (data: RegisterSchema) => {
    await register({
      variables: {
        input: data,
      },
      onCompleted(data) {
        if (data?.register?.errors) {
          toast({
            title: "Error",
            content: data?.register?.errors[0]?.message,
          });
          return;
        }
        const email = data.register.me!.email;
        if (email) {
          toast({
            title: "Registered",
            description: `Please check your email, ${email}`,
          });
          navigate("/");
        }
      },
    });
  };

  const passwordEndContent = (
    <button
      className='focus:outline-none'
      type='button'
      onClick={toggleVisibility}
      aria-label='toggle password visibility'>
      {isVisible ? (
        <EyeOffIcon className='text-2xl pointer-events-none text-default-400' />
      ) : (
        <EyeIcon className='text-2xl pointer-events-none text-default-400' />
      )}
    </button>
  );

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <Card
        as={"form"}
        onSubmit={form.handleSubmit(onSubmit)}
        className='m-4 w-[400px]'>
        <CardHeader className='text-2xl font-bold'>Register</CardHeader>
        <CardBody className='flex flex-col gap-2'>
          <FormInput
            control={form.control}
            name={"userName"}
            placeholder='Enter your username'
            label='Username'
          />
          <FormInput
            control={form.control}
            name={"email"}
            placeholder='Enter your email'
            label='Email Address'
          />
          <FormInput
            control={form.control}
            name={"password"}
            placeholder='Enter your password'
            label='Password'
            endContent={passwordEndContent}
            type={isVisible ? "text" : "password"}
          />
          <FormInput
            control={form.control}
            name={"confirmPassword"}
            placeholder='Confirm your password'
            label='Confirm Password'
            endContent={passwordEndContent}
            type={isVisible ? "text" : "password"}
          />
          <Button
            type={"submit"}
            className='w-full mt-2 bg-green-800'
            disabled={loading}
            isLoading={loading}>
            Sign Up
          </Button>
          <Divider />
          <span className='flex items-center gap-2'>
            need to create an account ?{" "}
            <Link href='/login' className='text-green-800'>
              Sign In
            </Link>
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterPage;
