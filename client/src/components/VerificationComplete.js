import React from "react";
import { Paper, Typography, Button, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VerificationComplete = ({ navigate }) => {
  const handleDownloadReceipt = () => alert("Downloading receipt...");

  return (
    <Fade in timeout={1000}>
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "#e3f2fd",
          borderRadius: "12px",
          maxWidth: "400px",
          mx: "auto",
          boxShadow: 3,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          Great!
        </Typography>
        <Typography>Your Registration Has been verified successfully.</Typography>

        <Button variant="contained" color="warning" sx={{ mt: 3, width: "80%", borderRadius: "20px" }} onClick={() => navigate("/seller-dashboard")}>
          Return to Dashboard
        </Button>

        <Button variant="outlined" color="primary" sx={{ mt: 2, width: "80%", borderRadius: "20px" }} onClick={handleDownloadReceipt}>
          Download Receipt
        </Button>
      </Paper>
    </Fade>
  );
};

export default VerificationComplete;
