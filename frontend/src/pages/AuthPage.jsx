import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <InputField label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />}
          {!isLogin && <InputField label="Mobile No." type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" />}
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          {!isLogin && <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />}
          
          <Button text={isLogin ? "Login" : "Sign Up"} />
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-semibold ml-2 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
