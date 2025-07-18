const User = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

const signupUser = async (req, res) => {
    try {
        const userData = req.body;
        const plainPass = userData.password;

        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(plainPass, salt);

        const result = await User.create({ ...userData, password: hashedPass });

        if (result) {
            res.status(201).json({
                error: false,
                message: "User created successfully"
            });
        } else {
            res.status(400).json({
                error: true,
                message: "Error in signup",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in server" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                error: true,
                message: "Invalid email or password",
            });
        }

       const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                error: true,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(existingUser._id.toString());
        res.cookie("jwt_token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            error: false,
            message: "Login Successful",
            data: {
                User: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Error in server",
        });
    }
};

module.exports = {
    signupUser,
    loginUser,
};
