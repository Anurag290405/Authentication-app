import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../services/authService";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res.success) {
      toast.success("Login successful");
      localStorage.setItem("token", res.token);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
