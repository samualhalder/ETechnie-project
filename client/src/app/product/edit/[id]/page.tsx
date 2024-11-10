import EditProduct from "@/components/client/EditProduct";

import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <>
      {" "}
      <EditProduct id={id} />
    </>
  );
}
