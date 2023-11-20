import { Foods } from "@/types/food";
import Card from "../card";
import { Box } from "@mui/material";

type ListFoodProps = {
    foods: Foods;
};

export function ListFood({ foods }: ListFoodProps) {
    console.log(foods.forEach((el) => el.id));
    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={10}
        >
            {foods.map((food) => (
                <Card key={food.id} {...food} price={food.price + " р."}></Card>
            ))}
        </Box>
    );
}
