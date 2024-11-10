import ShowProducts from "@/components/client/ShowProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 ">
      <div>
        <Link href={"/add-product"}>
          <Button className="bg-green-500">Add Product</Button>
        </Link>
      </div>
      <ShowProducts />
    </div>
  );
}
