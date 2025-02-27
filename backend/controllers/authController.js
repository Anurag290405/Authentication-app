const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const sendVerificationEmail = async (userEmail, token) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Email Verification",
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    });
};

exports.register = async (req, res) => {
    const { name, mobile, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const verificationToken = crypto.randomBytes(20).toString('hex');
        user = new User({ name, mobile, email, password, verificationToken });
        await user.save();

        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({ message: 'User registered. Check email for verification.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) return res.status(400).json({ message: 'Verify your email first' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
