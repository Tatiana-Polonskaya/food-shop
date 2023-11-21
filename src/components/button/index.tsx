import { Button, Typography } from "@mui/material";

type Props = {
    title: string;
    onClick: () => void;
};

export default function CustomButton({ title, onClick }: Props) {
    return (
        <Button variant="outlined" onClick={onClick} size="medium">
            <Typography>{title}</Typography>
        </Button>
    );
}
