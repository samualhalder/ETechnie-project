"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function AddProductFrom() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access-token");
      setToken(accessToken);
    }
  }, []);
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title");
    const price = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const discount = formData.get("discount");
    const image = formData.get("image") as string;
    if (!token) {
      return toast({
        variant: "destructive",
        description: "sing in to add a product",
      });
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/create-product`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price,
            description,
            category,
            discount,
            image,
          }),
        }
      );
      const product = await response.json();
      console.log(response, product);

      if (response.ok) {
        toast({
          description: "product added successfully",
        });
      } else {
        toast({
          variant: "destructive",
          description: product.message,
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Some thing went wrong",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl">Add product</h1>
      <form
        className="w-[70%] flex  flex-col gap-5"
        action={async (formData: FormData) => {
          await handleSubmit(formData);
        }}
      >
        <div>
          <Label htmlFor="title" className="text-gray-500 mb-3">
            Title of the product
          </Label>

          <Input className="w-[95%]" type="text" name="title" />
        </div>

        <div>
          <Label htmlFor="description" className="text-gray-500 mb-3">
            Description
          </Label>

          <Input className="w-[95%]" type="text" name="description"></Input>
        </div>
        <div>
          <Label htmlFor="price" className="text-gray-500 mb-3">
            Price
          </Label>

          <Input className="w-[95%]" type="text" name="price"></Input>
        </div>
        <div>
          <Label htmlFor="discount" className="text-gray-500 mb-3">
            Discount(%)
          </Label>

          <Input className="w-[95%]" type="text" name="discount"></Input>
        </div>
        <div>
          <Label htmlFor="discount" className="text-gray-500 mb-3">
            Category
          </Label>

          <Select name="category">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Smart Phone</SelectItem>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="dress">Dress</SelectItem>
              <SelectItem value="shoes">Shoe</SelectItem>
              <SelectItem value="other">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image" className="text-gray-500 mb-3">
            Image url
          </Label>

          <Input className="w-[95%]" type="text" name="image"></Input>
        </div>
        <Button className="w-[95%]" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
