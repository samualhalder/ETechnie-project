"use client";

import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignInForm() {
  const navigaotor = useRouter();

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const user = await response.json();
      if (response.ok) {
        toast({
          description: String(user.message),
        });
        localStorage.setItem("access-token", user.token);

        navigaotor.push("/");
      } else {
        toast({
          variant: "destructive",
          description: String(user.message),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        className="w-full flex  flex-col gap-5"
        action={async (formData: FormData) => {
          await handleSubmit(formData);
        }}
      >
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

        <Button className="w-[95%]" type="submit" disabled={loading}>
          {loading ? "Processing request" : "Sign In"}
        </Button>
      </form>
    </>
  );
}
