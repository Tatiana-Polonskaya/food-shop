import { Foods } from "@/types/food";
import { Box } from "@mui/material";
import Card from "../card";

type ListFoodProps = {
    foods: Foods;
};

export function ListFood({ foods }: ListFoodProps) {
    console.log(foods);
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
