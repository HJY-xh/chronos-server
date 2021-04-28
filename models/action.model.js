const mongoose = require('mongoose');

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

const Action = new mongoose.model("Action", actionSchema);

module.exports = Action;