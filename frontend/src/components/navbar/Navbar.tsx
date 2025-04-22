import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Avatar, Stack } from "@mui/material";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Joke Generator
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/joke">
                            Get Joke
                        </Button>
                        <Button color="inherit" component={Link} to="/joke/create-joke">
                            Create Joke
                        </Button>
                        <Button color="inherit" component={Link} to="/joke/list-jokes">
                            All jokes
                        </Button>

                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ cursor: "pointer" }} onClick={toggleDropdown} />
                            {dropdownOpen && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "100%",
                                        right: 10,
                                        backgroundColor: "white",
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        zIndex: 10,
                                    }}
                                >
                                    <Button fullWidth>
                                        <Link to="/profile"> Profile </Link>
                                    </Button>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>
    );
}

export default Navbar;
