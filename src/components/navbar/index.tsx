import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import Logo from "../logo";

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    background: "#fff",
                    color: "primary.main",
                    borderColor: "primary.main",
                    borderBottom: "1px solid",
                }}
            >
                <Toolbar>
                    <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="nowrap"
                        alignItems="center"
                        flexGrow={1}
                        padding={"0 20px"}
                        gap={2}
                    >
                        <Logo />
                        <Typography variant="h6" component="div">
                            Food Shop
                        </Typography>
                    </Box>

                    <Link
                        href={"https://github.com/Tatiana-Polonskaya/food-shop"}
                    >
                        <Button>Go to Github</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
