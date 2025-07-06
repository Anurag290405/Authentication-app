const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendEmail");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp });
    await sendOTP(email, otp);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    console.log("📥 Incoming verifyOtp request:", req.body);

    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const emailTrimmed = email.trim();
    const otpTrimmed = otp.trim();

    const otpEntry = await Otp.findOne({ email: emailTrimmed }).sort({ createdAt: -1 });
    console.log("🔍 OTP entry from DB:", otpEntry);

    if (!otpEntry) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Manual expiration check (if you removed TTL from schema)
    const isExpired = Date.now() - new Date(otpEntry.createdAt).getTime() > 10 * 60 * 1000;
    if (isExpired) {
      console.log("⏱️ OTP expired");
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (otpEntry.otp !== otpTrimmed) {
      console.log("❌ OTP mismatch:", otpEntry.otp, otpTrimmed);
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    const existingUser = await User.findOne({ email: emailTrimmed });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email: emailTrimmed, password: hashedPassword });
    await Otp.deleteMany({ email: emailTrimmed });

    console.log("✅ User registered successfully");
    return res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("❗ verifyOtp ERROR:", err);
    return res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
