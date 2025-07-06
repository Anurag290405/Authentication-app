// src/pages/VerifyOTP.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { verifyOTP } from "../services/authService";
import { toast } from "react-hot-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    // Debug log
    console.log("📦 location state:", state);
    console.log("🚀 Sending verifyOTP request:", {
      email: state?.email,
      password: state?.password,
      otp,
    });

    if (!state?.email || !state?.password || !otp) {
      toast.error("Missing email, password, or OTP");
      return;
    }
if (!state?.password) {
  toast.error("Session expired, please register again");
  navigate("/register");
  return null;
}
    const res = await verifyOTP({
      email: state.email,
      password: state.password,
      otp: otp.trim(),
    });

    if (res.success) {
      toast.success("Verified successfully");
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleVerify}>
        <Input
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button>Verify</Button>
      </form>
    </div>
  );
};

export default VerifyOTP;
