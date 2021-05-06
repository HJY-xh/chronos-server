const mongoose = require("mongoose");
const Config = require('./config');
const colors = require("colors");

const dbUrl = `mongodb://${Config.DB.url}:${Config.DB.port}/${Config.DB.name}`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("\n", colors.green(`MongoDB connection succeeded`));

    } catch (error) {
        console.log("\n", colors.red(error));
    }
}

module.exports = connectDB;