import { Button, ButtonProps, Typography, styled } from "@mui/material";
import { purple, grey, orange } from "@mui/material/colors";

type Props = {
    title: string;
    onClick: () => void;
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: orange[500],
    backgroundColor: "white",
    borderColor: orange[500],
    "&:hover": {
        backgroundColor: "#ffff",
        borderColor: orange[500],
    },
}));

export default function CustomButton({ title, onClick }: Props) {
    return (
        <ColorButton
            variant="outlined"
            onClick={onClick}
            size="medium"
        >
            <Typography>{title}</Typography>
        </ColorButton>
    );
}
