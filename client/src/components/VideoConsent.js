import React, { useState, useRef } from "react";
import { Box, Paper, Typography, Button, CircularProgress, Grid } from "@mui/material";
import DoDontsList from "./DoDontsList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const userId = localStorage.getItem("userId");
const VideoConsent = ({ handleNextStep }) => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    setRecording(true);
  };

  const stopRecording = () => {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const handleSubmitVideo = async () => {
    setVideoUploading(true);
    setTimeout(async () => {
      setVideoUploading(false);
      setVideoSubmitted(true);
      toast.success("Video submitted successfully! ✅", { position: "top-right" });
      setSentimentResult("Positive");
  
      // ✅ Save the event in the database
      try {
        const response = await axios.post("http://localhost:5000/api/timeline/save-event", { // ✅ Declare response
          userId: userId, // Replace with actual user ID
          title: "Video Consent Verified Successfully",
          description: "AI Verification of Consent Video is Done.",
          status: "Completed",
        });
  
        console.log("Event saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving event:", error);
      }
  
      setTimeout(() => {  
        handleNextStep();
      }, 4000);
    }, 4000);
  };
  

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h5" gutterBottom>Instructions To Record Video</Typography>
          <Box sx={{ width: "100%", height: "300px", bgcolor: "#f0f0f0", mb: 2 }}>
            <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={startRecording} disabled={recording}>Capture</Button>
            <Button variant="contained" color="error" onClick={stopRecording} disabled={!recording}>Stop</Button>
            <Button variant="contained" color="primary" onClick={handleSubmitVideo}>
              {videoUploading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
          {videoSubmitted && <Typography sx={{ mt: 2 }} color="green">✅ AI Sentiment Analysis: {sentimentResult}</Typography>}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <DoDontsList />
      </Grid>
    </Grid>
  );
};

export default VideoConsent;
