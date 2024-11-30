const User = require("../models/userModels")
const Doctor = require("../models/doctorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


// register 
exports.registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({
                message: "User already exists",
                success: false
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
                message: "Error creating user",
                success: false, error
            });
    }
}


// login
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: "User not exists",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({
                    message: "password is incorrect",
                    success: false
                });
        } else {
            // generate token 
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            // console.log(token)
            res.status(200)
                .send({
                    message: "Login Successfull",
                    success: true,
                    token
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
                message: "Error creating user",
                success: false, error
            });
    }
}



// get user profile by id
exports.userProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "User does not exist", success: false
                });
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
                message: "Error in fetching user detail",
                success: false, error
            });
    }
}



exports.applyDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor({ ...req.body, status: "pending" });
        await newDoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName
            },
            onClickPath: "/admin/doctors"
        })
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(200).send({
            success: true,
            message: "Doctor account applied successfully",
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
                message: "Error applying doctor account",
                success: false, error
            });
    }
}


// mark all notification as seen
exports.markAllNotificationSeen = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
                message: "Error applying doctor account",
                success: false, error
            });
    }
}


// delete all notifications 
exports.deleteAllNotifications = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.seenNotifications = []
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error
        });
    }
}



