import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

type Props = {
    title: string;
    onClick: (sortedByAbs: boolean) => void;
};

export default function Filter({ title, onClick }: Props) {
    const [sortedByAbs, setSortedByAbs] = useState(true);

    const handleClick = () => {
        setSortedByAbs((prev) => !prev);
        onClick(sortedByAbs);
    };

    return (
        <Button onClick={handleClick}>
            {title}
            {sortedByAbs ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
    );
}
