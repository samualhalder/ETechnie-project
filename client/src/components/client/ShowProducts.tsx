import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { productType } from "@/types";

export default async function ShowProducts() {
  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/product/get-all-products`,
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
  const products = await getProducts();

  return (
    <>
      <div className="flex gap-3 flex-wrap m-5 p-5">
        {products &&
          products.map((product: productType, ind: number) => (
            <Link key={ind} href={`/product/${product?.id}`}>
              <Card className="w-[300px]">
                <CardHeader>
                  <CardContent className="w-[200px] h-[200px] object-cover">
                    <img
                      src={product.image}
                      alt="photo"
                      className="object-cover"
                    />
                  </CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>
                    {product?.description?.slice(0, 34)}...
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div>
                    <p>
                      <span className="line-through">₹{product.price}</span>{" "}
                      <span className="text-blue-600">
                        {product.discount}% OFF
                      </span>
                    </p>
                    <p>
                      ₹
                      {(product?.price || 0) *
                        ((100 - (product?.discount || 0)) / 100)}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
}
