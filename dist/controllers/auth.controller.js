var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import "../load_envs";
const JWT_SECRET = process.env.JWT_SECRET_TOKEN || 'default_secret_key';
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = yield UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield UserModel.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Check the password
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Show token:", token);
        res.status(200).json({
            _id: user.id,
            usernmae: user.username,
            email: user.email,
            token: token
        });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear token on the client side (assuming you're using local storage)
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
