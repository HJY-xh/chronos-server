const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: 1 // 0->完成, 1->未完成
    },
    actionIds: {
        type: Array,
        default: []
    }
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;