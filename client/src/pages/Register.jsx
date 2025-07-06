// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { sendRegisterOTP } from "../services/authService";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const res = await sendRegisterOTP({ email, password });

    if (res.success) {
      toast.success("OTP sent to your email");

      // ✅ DO NOT reset password here before navigation
      console.log("➡️ Navigating to verify-otp with:", { email, password });

      navigate("/verify-otp", {
        state: {
          email: email,
          password: password,
        },
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default Register;
