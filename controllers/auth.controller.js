import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../Models/user.model.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Verifică dacă userul există deja
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // 2. Hashează parola
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Creează userul
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 4. Creează token-ul JWT
        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN || "1h" }
        );

        // 5. Trimite răspuns
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: {
                token,
                user: newUser,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 400;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user,
            }
        });
    }
    catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    // la fel
};
