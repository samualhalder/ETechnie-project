"use client";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(process.env.NEXT_SERVER_END_POINT);

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const user = await response.json();
      if (response.ok) {
        toast({
          description: "sign up successfully",
        });
        router.push("/signin");
      } else {
        toast({
          variant: "destructive",
          description: user.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="w-full flex  flex-col gap-5"
        action={(formData: FormData) => handleSubmit(formData)}
      >
        <div>
          <Label htmlFor="FirstName" className="text-gray-500 mb-3">
            Your First Name
          </Label>

          <Input className="w-[95%]" type="text" name="firstName" />
        </div>
        <div>
          <Label htmlFor="LastName" className="text-gray-500 mb-3">
            Your Last Name
          </Label>

          <Input className="w-[95%]" type="text" name="lastName" />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-500 mb-3">
            Your email address
          </Label>

          <Input
            className="w-[95%]"
            type="Email"
            name="email"
            autoComplete="current-email"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-500 mb-3">
            Your Password
          </Label>

          <Input
            className="w-[95%]"
            type="password"
            name="password"
            autoComplete="current-password"
          ></Input>
        </div>

        <Button className="w-[95%]" type="submit">
          Sign In
        </Button>
      </form>
    </>
  );
}
