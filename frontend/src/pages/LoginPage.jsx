import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegistering && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const url = isRegistering
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';
      
      const { data } = await axios.post(url, formData);
      toast.success(data.message || "Success");
      
      if (!isRegistering) {
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or home page could be added here
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-2 border-blue-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{isRegistering ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-gray-600 mt-2">{isRegistering ? "Join our community today" : "Login to your account"}</p>
        </div>
        
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">+91</span>
                  <input 
                    id="mobile"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                    type="text" 
                    name="mobile" 
                    placeholder="9876543210" 
                    pattern="^[6-9]\d{9}$" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Indian format (10 digits starting with 6-9)</p>
              </div>
            </>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
              type="email" 
              name="email" 
              placeholder="your@email.com" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input 
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                type="password" 
                name="confirmPassword" 
                placeholder="••••••••" 
                onChange={handleChange} 
                required 
              />
            </div>
          )}
          
          {!isRegistering && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Forgot Password?
              </button>
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegistering ? "Creating Account..." : "Logging in..."}
              </span>
            ) : (
              <>{isRegistering ? "Create Account" : "Login"}</>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition" 
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
        
        {isRegistering && (
          <p className="text-xs text-center text-gray-500 mt-8">
            By creating an account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;