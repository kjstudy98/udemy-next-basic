import Image from "next/image";
import React from "react";
export const dynamic = "force-dynamic";

export default async function SSRPage() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  const resJson = await res.json();
  const image = resJson.message;

  const timestamp = new Date().toISOString();

  return (
    <div>
      <h1>SSRPage</h1>
      毎回リロード：{timestamp}
      <Image src={image} width={400} height={400} alt="" />
    </div>
  );
}
