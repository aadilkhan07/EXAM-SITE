require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const z = require('zod');
const { Student } = require('../db'); 
const bcrypt = require('bcrypt');


const signupBody = z.object({
    username: z.string(),
    emailId: z.string().email(),
    rollNo: z.number().positive(),
    password: z.string()
});

router.post("/signup", async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect Inputs",
            error: error.errors
        });
    }

    const existingStudent = await Student.findOne({ rollNo: req.body.rollNo });
    if (existingStudent) {
        return res.status(409).json({ message: "Roll number already taken" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 11);

    
    const student = await Student.create({
        username: req.body.username,
        emailId: req.body.emailId,
        password: hashedPassword,
        rollNo: req.body.rollNo
    });

    const studentId = student._id;

    const token = jwt.sign({ studentId }, process.env.JWT_SECRET);

    res.status(200).json({
        message: "Student created successfully",
        token: token
    });
});


const signinBody = z.object({
    emailId: z.string().email(),
    rollNo: z.number().positive(),
    password: z.string()
});

router.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs",
            error: error.errors
        });
    }

    const { emailId, rollNo, password } = req.body;

    try {
        
        const student = await Student.findOne({ emailId, rollNo });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, student.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }


        const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET);

        
        res.status(200).json({
            message: "Sign-in successful",
            token: token,
            redirectTo: "/dashboard" 
        });

    } catch (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({
            message: "An error occurred during sign-in"
        });
    }
});

module.exports = router; 
