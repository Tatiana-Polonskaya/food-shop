import { getFoodById } from "@/api";
import MainLayout from "@/layouts/main-layout";
import { Food } from "@/types/food";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function FoodID() {
    const { query } = useRouter();

    let category: string = String(query.category);
    let id: number = Number(query.id);

    const { data: food } = useQuery<Food>({
        queryKey: [category, id],
        queryFn: () => getFoodById(category, id),
        enabled: !!category && !!id,
    });

    console.log(food);
    return (
        <MainLayout title="Food Shop | FoodID">
            <div>{food?.title}</div>
            <div>{food?.description}</div>
        </MainLayout>
    );
}
