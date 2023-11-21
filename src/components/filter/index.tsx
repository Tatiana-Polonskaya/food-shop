import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import NumberInput from "../number-input";
import { isNumber } from "@/consts/isnumber";

type Props = {
    minNumber: number;
    maxNumber: number;
    setInterval: (minValue: number, maxValue: number) => void;
};

export default function Filter({ minNumber, maxNumber, setInterval }: Props) {
    const [minPrice, setMinPrice] = useState<number>(minNumber);
    const [maxPrice, setMaxPrice] = useState<number>(maxNumber);

    useEffect(() => {
        if (isNumber(minPrice) && isNumber(maxNumber))
            setInterval(minPrice, maxPrice);
    }, [minPrice, maxPrice]);

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
        >
            <NumberInput
                id="min-price"
                label="от"
                initNumber={minPrice}
                numberChanged={(num: number) => setMinPrice(num)}
            />
            <Typography>{"-"}</Typography>
            <NumberInput
                id="max-price"
                label="до"
                initNumber={maxPrice}
                numberChanged={(num: number) => setMaxPrice(num)}
            />
        </Box>
    );
}
