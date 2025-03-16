import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField, Grid, Card, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, CardContent, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import GuideToDigitalSignature from "../components/GuideToDigitalSignature";

const pdfPath = process.env.PUBLIC_URL + "/consform.pdf"; 

const DigitalSignature = ({ handleNextStep }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const [id, setId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [email, setEmail] = useState(""); 
  const [consentChecked, setConsentChecked] = useState(false); // Checkbox state
  const userId = localStorage.getItem("userId");

  // ✅ Check if signing was successful on component mount
  useEffect(() => {
    const checkSuccess = () => {
      if (localStorage.getItem("successfulSign") === "true") {
        setModalOpen(true);
        toast.success("Signature Completed Successfully! 🎉", { position: "top-right" });
        localStorage.removeItem("successfulSign");
      }
    };
    checkSuccess();

    const handleStorageChange = (event) => {
      if (event.key === "successfulSign" && event.newValue === "true") {
        checkSuccess();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🔹 Upload Consent Form Automatically When Checkbox is Checked
  const handleCheckboxChange = async (event) => {
    setConsentChecked(event.target.checked);

    if (event.target.checked) {
      setLoading(true);
      
      const response = await fetch("/consform.pdf");
      console.log(response)
      const blob = await response.blob(); // Convert to binary data

      // ✅ Create a File object from the Blob
      const file = new File([blob], "consform.pdf", { type: "application/pdf" });

      // ✅ Append to FormData
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/api/signnow/upload-document", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setId(response.data.documentId);
        toast.success("Consent Form Verified and Uploaded ✅", { position: "top-right" });
      } catch (error) {
        console.error("Error uploading document:", error);
        toast.error("Failed to upload document. ❌", { position: "top-right" });
      }
      setLoading(false);
    }
  };

  // 🔹 Send Signature Request
  const sendSignatureRequest = async () => {
    if (!name) {
      toast.warn("Please enter your name. ✏️", { position: "top-right" });
      return;
    }
    if (!consentChecked) {
      toast.warn("Please verify the consent form before proceeding.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/signnow/send-signature-request", {
        signerEmail: email,
        signerName: name,
        documentId: id,
      });

      setInviteId(response.data.inviteId);
      toast.success("Signature request sent successfully! 📩", { position: "top-right" });
    } catch (error) {
      console.error("Error sending signature request:", error);
      toast.error("Failed to send signature request. ❌", { position: "top-right" });
    }
    setLoading(false);
  };

  // 🔹 Get Signing URL
  const getSigningUrl = async () => {
    if (!inviteId) {
      toast.warn("No invite ID found. Please send the signature request first.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/signnow/get-signing-url", { inviteId, documentId: id });
      window.open(response.data.signingUrl, "_blank", "width=800,height=600");


// ✅ Save the event in the database
await axios.post("http://localhost:5000/api/timeline/save-event", {
  userId: userId, // Replace with actual user ID
  title: "Digital Signature Completed",
  description: " successfully Signed the document.",
  status: "Completed",
});



    } catch (error) {
      console.error("Error generating signing URL:", error);
      toast.error("Failed to generate signing URL. ❌", { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <ToastContainer /> 
      <Typography variant="h5" gutterBottom>Sign Consent Form</Typography>
      <Grid container spacing={3}>
        
        {/* PDF Preview */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "left", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Preview Document</Typography>
              <div style={{ border: "1px solid #ccc", height: "400px", overflowY: "auto" }}>
                <iframe src={pdfPath} width="100%" height="100%" style={{ border: "none" }}></iframe>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Signature Input */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "left", height: "100%" }}>
            <CardContent>
              
              {/* Checkbox for Consent Verification */}
              <FormControlLabel
                control={<Checkbox checked={consentChecked} onChange={handleCheckboxChange} />}
                label="I have read and verified the consent preview"
              />

              <Typography variant="h6" gutterBottom>Add Signature</Typography>
              <Tooltip title="This NAME will be used to verify your credentials." arrow>
                <TextField fullWidth label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ my: 2 }} />
              </Tooltip>

              <Tooltip title="You will get notified in this email after a successful signature." arrow>
                <TextField fullWidth label="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ my: 2 }} />
              </Tooltip>  

              <Button variant="contained" color="success" onClick={sendSignatureRequest} disabled={!consentChecked || loading} sx={{ mr: 2 }}>
                {loading ? <CircularProgress size={24} /> : "Send for Signing"}
              </Button>

              <Button color="primary" onClick={getSigningUrl} disabled={!inviteId || loading}>
                {loading ? <CircularProgress size={24} /> : "Sign Now"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Guide Section */}
        <Grid item xs={12}>
          <Button onClick={() => setModalOpen1(true)} variant="contained" color="primary" sx={{ mt: 2 }}>View Guide</Button>
          <GuideToDigitalSignature isOpen={modalOpen1} onClose={() => setModalOpen1(false)} />
        </Grid>
      </Grid>

      {/* ✅ Success Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>✅ Signature Completed</DialogTitle>
        <DialogContent>
          <Typography>Your document has been signed successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setModalOpen(false); handleNextStep(); }} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DigitalSignature;
