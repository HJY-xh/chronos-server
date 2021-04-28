const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: number,
        default: 1
    }
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;