import MainLayout from "@/layouts/main-layout";
import { Food } from "@/types/food";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Category() {
    const { query } = useRouter();
    console.log(query);
    return (
        <MainLayout title="Food Shop | Catalog">
            {" "}
            <div>Category {query.category}</div>
        </MainLayout>
    );
}
