import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Modal from "@/components/client/Modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/get-product-by-id/${id}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const product = await fetchProduct();
  return (
    <div className="flex justify-center items-center p-5">
      <Card className="w-[700px] min-h-[700px]">
        <CardHeader>
          <CardContent>
            <Image src={product.image} height={500} width={500} alt="photo" />
          </CardContent>
          <CardTitle className="text-xl">{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div>
            <p className="line-through">₹{product.price}</p>
            <p>₹{product.price * ((100 - product.discount) / 100)}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/product/edit/${product.id}`}>
              <Button className="p-5 bg-yellow-500">EDIT</Button>
            </Link>
            <Modal id={id} title={product.title} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
