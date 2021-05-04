const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    startTime: {
        type: Date,
        default: new Date()
    },
    endTime: {
        type: Date,
        default: new Date()
    },
    remark: {
        type: String
    }
});

const goalSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        index: true,
        unique: true
    },
    status: {
        type: Number,
        default: 1 // 0->完成, 1->未完成
    },
    actions: [actionSchema]
});

const Action = mongoose.model("Action", actionSchema);
const Goal = mongoose.model("Goal", goalSchema);


module.exports = {
    Action,
    Goal
};