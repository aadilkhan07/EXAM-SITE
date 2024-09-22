const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./db");
const { JWT_SECRET } = require("./auth.js");
const cors = require('cors');

const app = express();

// Allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Specify which methods are allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Database connection
mongoose.connect('mongodb+srv://admin:MgZg1dRTtY9d7bMP@cluster0.co2j6.mongodb.net/EXAM_SITE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.error("Database connection error:", err);
});

app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    await UserModel.create({
      email,
      password
    });
    res.json({ message: "YOU ARE SIGNED UP" });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
});

// Signin route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });

    if (user) {
      const token = jwt.sign(
        { id: user._id.toString() },
        JWT_SECRET
      );

      res.json({ token });
    } else {
      res.status(403).json({ message: "Incorrect credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during signin", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
