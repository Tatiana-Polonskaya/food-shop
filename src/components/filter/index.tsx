import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Sorted } from "@/types/sorting";

type Props = {
    title: string;
    currentSort: Sorted;
    onClick: (typeSorting: Sorted) => void;
};

export default function Filter({ title, currentSort,  onClick }: Props) {

    const handleClick = () => {
        onClick(currentSort === Sorted.ABS ? Sorted.DESC : Sorted.ABS);
    };

    return (
        <Button onClick={handleClick}>
            {title}
            {currentSort ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
    );
}
