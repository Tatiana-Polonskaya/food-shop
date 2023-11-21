import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardMedia,
} from "@mui/material";

type Props = {
    title: string;
    price: string;
    imageLink: string;
    description: string;
};

export default function MyCard({
    title,
    price,
    imageLink,
    description,
}: Props) {
    const titleUpperFisrt = title[0].toUpperCase() + title.slice(1);

    return (
        <Card sx={{ borderRadius: "10px", maxWidth: "200px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={"auto"}
                    image={imageLink}
                    alt={title}
                    sx={{
                        width: "auto",
                        maxWidth: "200px",
                        maxHeight: "180px",
                        margin: "0 auto",
                    }}
                />
                <CardContent>
                    <Typography
                        variant="h6"
                        component="h2"
                        align="center"
                        color={"secondary"}
                    >
                        {price}
                    </Typography>
                    <Typography variant="h5" component="h2" align="center">
                        {titleUpperFisrt}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="center"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
