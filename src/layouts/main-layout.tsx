import Head from "next/head";
import { ReactNode } from "react";

import { NavBar } from "@/components/navbar";

type Props = {
    children: ReactNode;
    title?: string;
};

export default function MainLayout({ children, title = "food-shop" }: Props) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="shop,food,food-shop,pizza" />
                <meta
                    name="description"
                    content="Food-shop with pizza and sushi"
                />
                <meta charSet="utf-8" />
            </Head>
            <NavBar />
            <main>{children}</main>
        </>
    );
}
