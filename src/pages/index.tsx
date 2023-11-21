import MainLayout from "@/layouts/main-layout";

import { Categories, Category } from "@/types/category";
import CustomButton from "@/components/button";
import { useState } from "react";
import { ListFood } from "@/components/list-cards";
import { Foods } from "@/types/food";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

export default function Home() {

    const { data: categories } = useQuery<Categories>({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`http://localhost:4200/categories`).then((res) => res.json()),
    });

    const [activeCategory, setActiveCategory] = useState<Category>(
        categories![0]
    );

    const {
        data: foods,
    } = useQuery({
        queryKey: ["foods", activeCategory.link],
        queryFn: () =>
            fetch(`http://localhost:4200/${activeCategory.link}`).then((res) =>
                res.json()
            ),
        enabled: !!activeCategory,
    });

    return (
        <MainLayout title="Home Page">
            {categories &&
                categories.map((el) => (
                    <CustomButton
                        key={el.id}
                        title={el.title}
                        onClick={() => setActiveCategory(el)}
                    ></CustomButton>
                ))}

            <div className="p-4 sm:ml-64">
                <h1 className="text-3xl font-bold">
                    {activeCategory && activeCategory.title}
                </h1>
            </div>

            {foods && <ListFood foods={foods} />}
        </MainLayout>
    );
}

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    const categories = await queryClient.fetchQuery<Categories>({
        queryKey: ["categories"],
        queryFn: () =>
            fetch("http://localhost:4200/categories").then((res) => res.json()),
    });

    const first_categories = categories![0];

    if (first_categories)
        await queryClient.prefetchQuery({
            queryKey: ["foods", first_categories!.link],
            queryFn:  () =>
            fetch(`http://localhost:4200/${first_categories!.link}`).then((res) => res.json()),
        });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
