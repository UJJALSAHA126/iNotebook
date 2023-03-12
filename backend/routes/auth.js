const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'IamNil';

const fetchuser = require('../middleware/fetchuser');

const router = express.Router();


// Route 1: Create a User using : POST "/api/auth/createuser/"
router.post("/createuser",
    [
        body("name", 'Enter a valid name !').isLength({ min: 3 }),
        body('email', 'Enter a valid email !').isEmail(),
        body('password', 'Password in Invalid :(').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, status: "false", errors: errors.array() })
        }

        try {

            // Check wheather this email already exists in the database
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ success, status: "false", error: 'Sorry this email is already taken' });
            }

            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt);

            // Creating a new User in the database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({
                success,
                status: 'true',
                message: 'User Successfuly created',
                user: user,
                authToken
            });

        } catch (error) {
            res.status(500).json({ success, error: error.message });
        }

    });


// Route 2: Logging in an existing user
router.post('/login',
    [
        body('email', 'Enter a valid email !').isEmail(),
        body('password', 'Password cannot be blank !').exists()
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        const { email, password } = req.body;
        try {

            // Check wheather this email already exists in the database
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ success, error: 'Credentials are not matced !' });
            }

            const passwordCompare = bcrypt.compareSync(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: 'Credentials are not matced !' });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({
                success,
                message: 'Log in successfull',
                userId: user.id,
                authToken
            });

        }
        catch (error) {
            res.status(500).json({ success, error: error.message });
        }
    });



// Router 3: Get logged in user details
router.post('/getuser', fetchuser,
    async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');

            res.json(user);

        }
        catch (error) {
            res.status(500).json(error.message);
        }
    }
)

module.exports = router;
