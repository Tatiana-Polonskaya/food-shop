import { Categories } from "@/types/category";
import {
    AppBar,
    Box,
    Button,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
    categories: Categories;
};

export const NavBar = ({ categories }: Props) => {
    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    {small && (
                        <List>
                            <ListItem>
                                <Button
                                    onClick={handleClick}
                                    style={{ color: "white" }}
                                >
                                    <MenuIcon onClick={handleClick} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Button>
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    onClick={() => {
                                        console.log("logo clicked");
                                        setOpen(false);
                                    }}
                                >
                                    Geeks for Geeks
                                </Typography>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {categories.map((el) => (
                                        <ListItem key={el.id}>
                                            <ListItemText primary={el.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    )}

                    {full && (
                        <>
                            <Typography variant="h6" color="inherit">
                                Geeks for Geeks
                            </Typography>
                            {categories.map((el) => (
                                <Button key={el.id} color="inherit">
                                    {el.title}
                                </Button>
                            ))}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
