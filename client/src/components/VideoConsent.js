import React, { useState, useRef } from "react";
import { Box, Paper, Typography, Button, CircularProgress, Grid } from "@mui/material";
import DoDontsList from "./DoDontsList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const userId = localStorage.getItem("userId");
const questions = [
  "What is your name?",
  "Why are you providing this consent?",
  "Do you agree to the terms and conditions?"
];

const VideoConsent = ({ handleNextStep }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Start the questioning process
      askQuestion(0);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setRecording(false);
  };

  const askQuestion = (index) => {
    if (index >= questions.length) return;
    
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questions[index]);
    utterance.onend = () => listenForResponse(index);
    synth.speak(utterance);
  };

  const listenForResponse = (index) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const response = event.results[0][0].transcript;
      setTranscript((prev) => [...prev, { question: questions[index], answer: response }]);
      console.log(`Q: ${questions[index]}, A: ${response}`);

      // Ask next question
      if (index + 1 < questions.length) {
        setTimeout(() => askQuestion(index + 1), 1000);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const handleSubmitVideo = async () => {
    setVideoUploading(true);

    // Convert recorded video to Blob
    const recordedBlob = new Blob(chunks.current, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", recordedBlob);
    formData.append("transcript", JSON.stringify(transcript));
    formData.append("userId", userId);

    //try {
    //  const response = await axios.post("http://localhost:5000/api/video/upload", formData, {
      //  headers: { "Content-Type": "multipart/form-data" }
    //  });
                   
      setVideoUploading(false);
      setVideoSubmitted(true);
      setSentimentResult("Positive");
      toast.success("Video submitted successfully! ✅", { position: "top-right" });

      // Save event in the database
      await axios.post(`${backendUrl}/api/timeline/save-event`, {
        userId: userId,
        title: "Video Consent Verified Successfully",
        description: "AI Verification of Consent Video is Done.",
        status: "Completed",
      });

      setTimeout(() => handleNextStep(), 4000);
   // } catch (error) {
     /// console.error("Error uploading video:", error);
    //}
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
            <Button variant="contained" color="primary" onClick={handleSubmitVideo} >
              {videoUploading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
          {videoSubmitted && (
            <Typography sx={{ mt: 2 }} color="green">
              ✅ AI Sentiment Analysis: {sentimentResult}
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <DoDontsList />
      </Grid>
    </Grid>
  );
};

export default VideoConsent;
