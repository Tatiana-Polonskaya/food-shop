import { Categories } from "@/types/category";
import { Food, Foods } from "@/types/food";

export async function getCategories() {
    return (await fetch(`${process.env.API_URL}/categories`).then((res) =>
        res.json()
    )) as Categories;
}

export async function getFoods(nameFoods: string) {
    return (await fetch(`${process.env.API_URL}/${nameFoods}`).then((res) =>
        res.json()
    )) as Foods;
}

export async function getFoodById(nameFoods: string, id: number) {
    return (await fetch(`${process.env.API_URL}/${nameFoods}/${id}`).then(
        (res) => res.json()
    )) as Food;
}
