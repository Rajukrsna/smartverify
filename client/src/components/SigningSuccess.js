import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SigningSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("successfulSign", "true");

    setTimeout(() => {
      window.close(); // ✅ Close the signing tab
       // ✅ Redirect back to the main page
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "150px" }}>
      <h2>✅ Signature Completed Successfully!</h2>
      <p>Redirecting back to the application...</p>
    </div>
  );
};

export default SigningSuccess;
