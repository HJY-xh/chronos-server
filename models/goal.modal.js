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
    },
    actions: [actionSchema]
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;