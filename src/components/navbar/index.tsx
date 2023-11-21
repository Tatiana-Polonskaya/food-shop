import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Food Shop
                    </Typography>
                    <Button color="inherit">Go to Github</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
