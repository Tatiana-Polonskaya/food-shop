import Card from "@/shared/ui/card/card";
import { Foods } from "../../types";

type ListFoodProps = {
    foods: Foods;
};

export function ListFood({ foods }: ListFoodProps) {
    console.log(foods.forEach((el) => el.id));
    return (
        <div className="flex flex-wrap flex-row shrink justify-self-center place-content-center content-center gap-10">
            {/* <pre>{JSON.stringify(foods)}</pre> */}
            {foods.map((food) => (
                <Card key={food.id} {...food} price={food.price + ' р.'}></Card>
            ))}
        </div>
    );
}
