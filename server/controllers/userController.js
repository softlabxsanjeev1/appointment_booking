const User = require("../models/userModels")
const bcrypt = require("bcryptjs")

exports.registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({
                message: "User already exists", success: false
            });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({
            message: "User created successfully",
            success: true                //success for client to show server response
        });

    } catch (error) {
        res
            .status(500)
            .send({
                message: "Error creating user", success: false, error
            });
    }
} 