const express = require("express");
const User = require("../models/User")
const Router = express.Router();
Router.post("/submit", async(req,res)=>{
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
})
module.exports = Router