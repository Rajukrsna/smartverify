import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";

const AuthorityRegister = () => {
  const [authorityData, setAuthorityData] = useState({ name: "", email: "", password: "", department: "" });

  const handleChange = (e) => {
    setAuthorityData({ ...authorityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Authority Registration Data:", authorityData);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Government Authority Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Department" name="department" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default AuthorityRegister;
