const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create a User using : POST "/api/auth/"
router.post("/createuser", [
    body("name", 'Enter a valid name !').isLength({ min: 3 }),
    body('email', 'Enter a valid email !').isEmail(),
    body('password', 'Password in Invalid :(').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // Check wheather this email already exists in the database
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: 'Sorry this email is already taken' });
        }

        // Creating a new User in the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        res.json({
            status: 'Successful',
            message: 'User Successfuly created',
            user: user
        });

    } catch (error) {
        res.status(400).json(error.message);
    }

});

module.exports = router;
