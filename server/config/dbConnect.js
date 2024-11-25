const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Appointment_Booking",
        })
        console.log("DB connected successfully ............")
    } catch (error) {
        console.log("DB Connection failed", error.message);
    }
};

dbConnect();