import Link from "next/link";
import Head from "next/head";
import MainLayout from "@/layouts/main-layout";
import { NavBar } from "@/components/navbar";
import { Categories } from "@/types/category";
import CustomButton from "@/components/button";

type Props = {
    categories: Categories;
};

export default function Home({ categories }: Props) {
    return (
        <MainLayout title="Home Page">
            <NavBar categories={categories} />
            <CustomButton title="mybutton" onClick={()=>{}}></CustomButton>
            <div className="p-4 sm:ml-64">
                <Link href={"/about"}>
                    <p>About</p>
                </Link>

                <Link href={"/posts"}>
                    <p>Posts</p>
                </Link>
                <h1 className="text-3xl font-bold">Home</h1>
            </div>
        </MainLayout>
    );
}

export async function getServerSideProps() {
    const data = await fetch("http://localhost:4200/categories");
    const categories = await data.json();
    return { props: { categories } };
}
