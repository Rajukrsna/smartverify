import React from "react";
import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FaFileUpload, FaUserEdit, FaPaperPlane, FaSignature, FaCheckCircle } from "react-icons/fa";

const steps = [
  { id: 1, icon: <FaFileUpload />, text: "Upload the document you want to sign." },
  { id: 2, icon: <FaUserEdit />, text: "Enter your name for the signature." },
  { id: 3, icon: <FaPaperPlane />, text: "Click 'Send for Signing' to initiate the signing process." },
  { id: 4, icon: <FaSignature />, text: "Click 'Sign Now' to open the signing window." },
  { id: 5, icon: <FaCheckCircle />, text: "Follow the instructions to complete the signing process." },
];

const GuideToUploadDigitalSign = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>📜 Guide to Upload Digital Sign</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {steps.map((step, index) => (
              <Box key={step.id} sx={{ display: "flex", alignItems: "center" }}>
                <Paper sx={{ p: 2, textAlign: "center", minWidth: 200, m: 1 }} elevation={3}>
                  <Typography variant="h6">Step {step.id}</Typography>
                  <Box sx={{ fontSize: 30, my: 1 }}>{step.icon}</Box>
                  <Typography>{step.text}</Typography>
                </Paper>
                {index < steps.length - 1 && (
                  <Typography sx={{ mx: 1, fontSize: 24 }}>➡️</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuideToUploadDigitalSign;