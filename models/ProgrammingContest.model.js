const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
    },
    institutename: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    paid: {
        type: Number,
        required: true,
    },
    selected: {
        type: Boolean,
        required: true,
    },
    coachname: {
        type: String,
        required: true,
    },
    coachcontact: {
        type: String,
        required: true,
    },
    coachemail: {
        type: String,
        required: true,
    },
    tshirtcoach: {
        type: String,
        required: true,
    },

    teamleadername: {
        type: String,
        required: true,
    },
    teamleadercontact: {
        type: String,
        required: true,
    },
    teamleaderemail: {
        type: String,
        required: true,
    },
    tshirtteamleader: {
        type: String,
        required: true,
    },

    member1name: {
        type: String,
        required: true,
    },
    member1contact: {
        type: String,
        required: true,
    },
    member1email: {
        type: String,
        required: true,
    },
    tshirtmember1: {
        type: String,
        required: true,
    },

    member2name: {
        type: String,
        required: true,
    },
    member2contact: {
        type: String,
        required: true,
    },
    member2email: {
        type: String,
        required: true,
    },
    tshirtmember2: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;