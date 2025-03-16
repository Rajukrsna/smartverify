import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box, Stack, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backImg.jpg"; 
import aiImage from "../assets/arti.jpg"; 
import videoConsentImage from "../assets/verification.jpg"; 
import blockchainImage from "../assets/blockchain.jpg"; 
import step1Image from "../assets/consentForm.jpg"; 
import step2Image from "../assets/video.jpg"; 
import step3Image from "../assets/Coer.jpg"; 
import step4Image from "../assets/approve.jpg"; 
import registrationImage from "../assets/path.jpg"; // Add your image in /src/assets

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
    
    <Box
  sx={{
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay
    backgroundBlendMode: "darken",
    textAlign: "center",
    color: "white",
    padding: 4,
  }}
>
  <Container>
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        color: "white",
        textShadow: "2px 2px 5px rgba(239, 233, 233, 0.9)", // Fixed property
        mb: 2,
      }}
    >
      Secure & Transparent Online Registration
    </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            A seamless, secure, and efficient way to register with AI verification, video consent, and blockchain security.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "20px", px: 4, py: 1 }} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
  variant="outlined"
  color="secondary"
  size="large"
  sx={{
    borderRadius: "20px",
    px: 4,
    py: 1,
    color: "#333", // Slightly lighter than black for better contrast
    borderColor: "#222", // Darker border for more depth
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle background to make it stand out
    transition: "0.3s ease-in-out",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", // Adds slight depth
    "&:hover": {
      backgroundColor: "rgba(236, 97, 97, 0.3)", // Brighter red overlay
      borderColor: "#e63946", // Lighter red border
      color: "#000", // Ensure text remains visible
      boxShadow: "2px 2px 15px rgba(236, 97, 97, 0.4)", // Glow effect on hover
    },
  }}
  onClick={() => navigate("/register/seller")}
>
  Register 
</Button>

          </Stack>
        </Container>
      </Box>
      
      {/* Why Choose Us Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
          Why Choose Our Registration System?
        </Typography>
        <Grid container spacing={3}>
          {[
            { img: aiImage, title: "AI-Based Verification", desc: "Ensures the seller's willingness using AI-powered sentiment analysis." },
            { img: videoConsentImage, title: "Video Consent Validation", desc: "Records Seller video consent and stores it securly for transparency." },
            { img: blockchainImage, title: "Blockchain Security", desc: "Uses blockchain to securely store and track registration data." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
                borderRadius: "15px",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}>
                <CardMedia component="img" height="200" image={feature.img} alt={feature.title} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body1">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={registrationImage}
            alt="Registration Department"
            sx={{ width: "100%", borderRadius: "10px", boxShadow: 3 }}
          />
        </Grid>
        
        {/* Right Side - Text */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Revolutionizing Online Registration
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform streamlines the registration process for departments, ensuring a secure,
            transparent, and user-friendly experience. With AI-powered verification and blockchain
            security, we guarantee data integrity and fraud prevention.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether it's handling large-scale registrations or verifying user identities with
            video consent, our system provides a seamless approach for departments to enhance efficiency.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
      {/* Registration Process Section */}
      <Box sx={{ backgroundColor: "#f1f1f1", py: 6 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
            How the Registration Works
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              { img: step1Image, step: "1", title: "Sign the Consent Documents", desc: "Provide your consent using Digital Signature, stored securely." },
              { img: step2Image, step: "2", title: "Video Consent", desc: "Record and stores your video statement, which cannot be modified Later." },
              { img: step3Image, step: "3", title: "AI Verification", desc: "Ensures no coercion in signing. Manual Verification is triggered in cases of coercion" },
              { img: step4Image, step: "4", title: "Final Approval", desc: "Get confirmation from officials post successfull verification from AI." },
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}>
                  <CardMedia component="img" height="180" image={step.img} alt={step.title} />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "blue", mb: 1 }}>
                      Step {step.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>{step.title}</Typography>
                    <Typography variant="body2">{step.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#000", color: "#fff", py: 3, textAlign: "center" }}>
        <Typography variant="body2">© 2024 Pravin Raju T M,  All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
