import { gql } from "@/__codegen__";
import FormInput from "@/components/FormInput.tsx";
import { toast } from "@/hooks/use-toast";
import { Tokens } from "@/lib/tokens";
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

const LoginMutation = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      me {
        userName
      }
      errors {
        __typename
        ... on Error {
          message
        }
      }
    }
  }
`);

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});
type LoginSchema = z.infer<typeof LoginSchema>;

const LoginPage: React.FC = () => {
  const [login, { loading }] = useMutation(LoginMutation);

  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    values: {
      email: "",
      password: "",
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onLogin = async (data: LoginSchema) => {
    await login({
      variables: {
        input: data,
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }

        if (data?.login.errors) {
          const message = data.login.errors[0]?.message!;
          toast({
            title: "Error",
            description: message,
          });
          return;
        }
        const userName = data.login.me!.userName;
        if (userName) {
          toast({
            title: "Logged in",
            description: `Welcome back, ${userName}!`,
          });

          Tokens.accessToken = data?.login?.accessToken!;
          Tokens.refreshToken = data?.login?.refreshToken!;

          cache.evict({
            id: "ROOT_QUERY",
            fieldName: "me",
          });

          navigate("/");
        }
      },
    });
  };

  return (
    <div
      className={"h-screen w-screen flex flex-col items-center justify-center"}>
      <Card
        as={"form"}
        onSubmit={form.handleSubmit(onLogin)}
        className='absolute z-10 m-4 w-[400px]'>
        <CardHeader className='text-2xl font-bold'>Log In</CardHeader>
        <CardBody className='flex flex-col gap-2'>
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
            endContent={
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
            }
            type={isVisible ? "text" : "password"}
          />
          <Button
            type={"submit"}
            className='w-full mt-2 bg-green-800'
            isLoading={loading}
            disabled={loading}>
            Sign In
          </Button>
          <Divider />
          <span className='flex items-center gap-2'>
            need to create an account ?{" "}
            <Link href='/register' className='text-green-800'>
              Sign Up
            </Link>
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
