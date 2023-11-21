
import { isNumber } from "@/consts/isnumber";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    id: string;
    label: string;
    initNumber: number;
    numberChanged: (num: number) => void;
};

export default function NumberInput({
    id,
    initNumber,
    label,
    numberChanged,
}: Props) {
    const [currentNumber, setCurrentNumber] = useState<number>(initNumber);
    const [isError, setIsError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const lengthNotNumber = (newValue.match(/[^0-9]/gi) || []).length;

        if (lengthNotNumber > 0) {
            setIsError(true);
        } else {
            setIsError(false);
            setCurrentNumber(+newValue);
        }
    };

    useEffect(() => {
        if (isNumber(currentNumber)) numberChanged(currentNumber);
    }, [currentNumber]);

    return (
        <TextField
            id={id}
            label={label}
            variant="outlined"
            size="small"
            type="text"
            value={currentNumber}
            onChange={handleChange}
            error={isError}
            helperText={isError && "Доступные значения: 0-9"}
            sx={{ width: "150px" }}
        />
    );
}
