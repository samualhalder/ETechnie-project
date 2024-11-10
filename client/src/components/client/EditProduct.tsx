"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { productType } from "@/types";

export default function EditProduct({ id }: { id: number }) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access-token");
      setToken(accessToken);
    }
  }, []);
  const [formData, setFormData] = useState<productType | null>();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/get-product-by-id/${id}`,
          {
            cache: "no-store",
          }
        );
        const data = await response.json();
        setFormData({
          title: data.title,
          category: data.category,
          price: data.price,
          image: data.image,
          discount: data.discount,
          description: data.description,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!token) {
        return toast({
          variant: "destructive",
          description: "sing in to edit a product",
        });
      }
      const editFun = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/edit-product/${id}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast({
            description: "product Edited successfully",
          });
        } else {
          toast({
            variant: "destructive",
            description: "some thing went wrong",
          });
        }
      };
      editFun();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Some thing went wrong",
      });
    }
  };
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Edit product</h1>
        <form
          className="w-[70%] flex  flex-col gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <Label htmlFor="title" className="text-gray-500 mb-3">
              Title of the product
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="title"
              value={formData?.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-500 mb-3">
              Description
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="description"
              value={formData?.description}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <div>
            <Label htmlFor="price" className="text-gray-500 mb-3">
              Price
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="price"
              value={formData?.price}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <div>
            <Label htmlFor="discount" className="text-gray-500 mb-3">
              Discount(%)
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="discount"
              value={formData?.discount}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <div className=" flex flex-col gap-5">
            <Label htmlFor="discount" className="text-gray-500 mb-3">
              Category
            </Label>

            <select
              name="category"
              value={formData?.category}
              onChange={(e) => handleChange(e)}
            >
              <option value="phone">Smart Phone</option>
              <option value="laptop">Laptop</option>
              <option value="dress">Dress</option>
              <option value="shoes">Shoe</option>
              <option value="other">Others</option>
            </select>
          </div>
          <div>
            <Label htmlFor="image" className="text-gray-500 mb-3">
              Image url
            </Label>

            <Input
              className="w-[95%]"
              type="text"
              name="image"
              value={formData?.image}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <Button className="w-[95%]" type="submit">
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
