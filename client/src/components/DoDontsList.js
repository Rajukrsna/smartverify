import React from "react";
import { Paper, Typography, Grid, Avatar, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Pic from "../assets/prof.png"; 
// ✅ Import images (Place images in "public/images/")
const dosImages = [
  "../assets/prof.png", // Example image for first DO
  "../assets/prof.png", // Example image for first DO
];

const dontsImages = [
  "/images/dont1.jpg", // Example image for first DONT
  "/images/dont2.jpg", // Example image for second DONT
  "/images/dont3.jpg", // Example image for third DONT
];

const dosList = [
  { text: "Face is well lit without any shadow and is in the center of the frame" },
  { text: "You are not wearing a cap and your glasses do not have glare" },
];

const dontsList = [
  { text: "There is a glare on your glasses" },
  { text: "Face is not well lit" },
  { text: "There is a shadow on your face." },
];

const DoDontsList = () => (
  <Box>
    {/* ✅ Do's Section */}
    <Paper sx={{ p: 2, mb: 2, bgcolor: "#e8f5e9" }} elevation={3}>
      <Typography variant="h6" sx={{ color: "green", display: "flex", alignItems: "center" }}>
        <CheckCircleIcon sx={{ mr: 1 }} /> Do's
      </Typography>
      <Grid container spacing={2}>
        {dosList.map((item, index) => (
          <Grid item xs={12} key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={Pic} alt="Do" sx={{ width: 50, height: 50, mr: 2 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>

    {/* ❌ Don'ts Section */}
    <Paper sx={{ p: 2, bgcolor: "#ffebee" }} elevation={3}>
      <Typography variant="h6" sx={{ color: "red", display: "flex", alignItems: "center" }}>
        <CancelIcon sx={{ mr: 1 }} /> Don'ts
      </Typography>
      <Grid container spacing={2}>
        {dontsList.map((item, index) => (
          <Grid item xs={12} key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={Pic} alt="Don't" sx={{ width: 50, height: 50, mr: 2 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Box>
);

export default DoDontsList;
