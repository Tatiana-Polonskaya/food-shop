import Link from "next/link";
import Head from "next/head";
import MainLayout from "@/layouts/main-layout";

export default function Home() {
  return (
    <MainLayout title="Home Page">
      <Link href={"/about"}>
        <p>About</p>
      </Link>

      <Link href={"/posts"}>
        <p>Posts</p>
      </Link>
      <h1 className="text-3xl font-bold">Home</h1>
    </MainLayout>
  );
}
