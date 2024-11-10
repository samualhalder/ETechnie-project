"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function Modal({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access-token");
      setToken(accessToken);
    }
  }, []);
  const handleDelete = async () => {
    try {
      if (!token) {
        return toast({
          variant: "destructive",
          description: "sing in to delete a product",
        });
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/delete-product-by-id/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(response, data);

      toast({
        description: data.message,
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <form onSubmit={handleDelete}>
          <DialogTrigger className="bg-red-500 text-white p-2 rounded-md">
            DELETE
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete
                product {title} and remove your data from our servers.
              </DialogDescription>
              <Button onClick={handleDelete}>YES</Button>
            </DialogHeader>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
