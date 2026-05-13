const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000
        });

        await sendEmail(email, otp);

        res.status(201).json({ message: "OTP sent to email", userId: user._id });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({ message: "Account verified & logged in", user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true
        });

        res.json({ message: "Login successful", user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGOUT
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};

// GET USER (for dashboard)
exports.getUser = async (req, res) => {
    res.json(req.user);
};