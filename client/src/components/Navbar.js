import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSelect from "../theme/ColorModeSelect";
import {  DashboardIcon, LoginIcon, RegisterIcon, LogoutIcon } from "../components/CustomIcons";
import { ReactComponent as SmartVerifyLogo } from '../logo.svg';


const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="absolute" // Allows it to float over the background
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparent white
        backdropFilter: "blur(6px)", // Cool glass effect
        boxShadow: "none", // No shadow
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Logo & Branding */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" sx={{ p: 1 }}>
            <SmartVerifyLogo sx={{ width: 35, height: 35, color: "black" }} />
          </IconButton>
          
        </Box>

        {/* Theme Toggle */}
        <ColorModeSelect />

        {/* Authentication Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/seller-dashboard")}
                startIcon={<DashboardIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                startIcon={<LoginIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/register/seller")}
                startIcon={<RegisterIcon />}
                sx={{ color: "black", fontWeight: "bold" }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
