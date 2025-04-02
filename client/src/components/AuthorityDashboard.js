import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AuthorityDashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await axios.get(`${backendUrl}/api/registrations`);
      setRegistrations(res.data);
    };
    fetchRegistrations();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "5vh" }}>
      <Typography variant="h4">Government Authority Dashboard</Typography>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {registrations.map((reg) => (
          <Grid item xs={12} sm={6} key={reg._id}>
            <Paper elevation={3} style={{ padding: "15px" }}>
              <Typography variant="h6">Seller ID: {reg.userId}</Typography>
              <Typography>Sentiment: {reg.sentimentAnalysis.result}</Typography>
              <Typography>Status: {reg.verified ? "Verified" : "Pending"}</Typography>
              <Button variant="contained" color="success" style={{ marginRight: "10px" }}>
                Approve
              </Button>
              <Button variant="contained" color="error">
                Reject
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AuthorityDashboard;
