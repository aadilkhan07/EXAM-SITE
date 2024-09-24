const express = require('express');
const bcrypt = require('bcrypt'); 
const router = express.Router();
const { Admin } = require('../db'); 

router.post('/signup', async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  
  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newAdmin = new Admin({
      name,
      password: hashedPassword
    });

    await newAdmin.save();

    
    res.status(201).json({ 
      message: 'Admin created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.post('/signin', async (req, res) => {
  const { uniqueId, password } = req.body;

  
  if (!uniqueId || !password) {
    return res.status(400).json({ error: 'Unique ID and password are required to sign in' });
  }

  try {
    
    const admin = await Admin.findById(uniqueId);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid unique ID or password' });
    }


    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid unique ID or password' });
    }

    
    res.json({ message: 'Admin signed in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;