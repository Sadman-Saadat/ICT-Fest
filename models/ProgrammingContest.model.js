const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: false,
    },
    institutename: {
        type: String,
        required: false,
    },
    total: {
        type: Number,
        required: false,
    },
    paid: {
        type: Number,
        required: false,
    },
    selected: {
        type: Boolean,
        required: false,
    },
    coachname: {
        type: String,
        required: false,
    },
    coachcontact: {
        type: String,
        required: false,
    },
    coachemail: {
        type: String,
        required: false,
    },
    tshirtcoach: {
        type: String,
        required: false,
    },

    teamleadername: {
        type: String,
        required: false,
    },
    teamleadercontact: {
        type: String,
        required: false,
    },
    teamleaderemail: {
        type: String,
        required: false,
    },
    tshirtteamleader: {
        type: String,
        required: false,
    },

    member1name: {
        type: String,
        required: false,
    },
    member1contact: {
        type: String,
        required: false,
    },
    member1email: {
        type: String,
        required: false,
    },
    tshirtmember1: {
        type: String,
        required: false,
    },

    member2name: {
        type: String,
        required: false,
    },
    member2contact: {
        type: String,
        required: false,
    },
    member2email: {
        type: String,
        required: false,
    },
    tshirtmember2: {
        type: String,
        required: false,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    confirmCode: {
        type: String,
        required: true
    }
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;