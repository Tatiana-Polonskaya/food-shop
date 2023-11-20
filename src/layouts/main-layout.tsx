import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?:string;
};

export default function MainLayout({ children, title="food-shop" }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="shop,food,food-shop,pizza" />
        <meta name="description" content="Food-shop with pizza and sushi" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/posts"}>Posts</Link>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          right: 0;
          top: 0;
          background: darkblue;
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #fff;
        }

        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
