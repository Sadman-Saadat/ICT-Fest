const ProgrammingContest = require("../models/ProgrammingContest.model");

require("dotenv").config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const Email = process.env.Email;
const Password = process.env.Password;


const crypto = require('crypto');

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Email,
        pass: Password,
    },
})

const getPC = (req, res) => {
    res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
    const { teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2 } = req.body;

    console.log(req.body);




    const total = 300;
    const paid = 0;
    const selected = false;
    const confirmCode = crypto.randomBytes(20).toString('hex')

    let error = "";

    //if name & contact differs, only then we will store to database
    ProgrammingContest.findOne({ teamname: teamname, institutename: institutename }).then((participantteam) => {
        if (participantteam) {
            error = "Participant Team with same name and Institutes exists";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
        } else {
            const team = new ProgrammingContest({
                teamname: teamname,
                institutename: institutename,
                coachname: coachname,
                coachcontact: coachcontact,
                coachemail: coachemail,
                tshirtcoach: tshirtcoach,
                teamleadername: teamleadername,
                teamleadercontact: teamleadercontact,
                teamleaderemail: teamleaderemail,
                tshirtteamleader: tshirtteamleader,
                member1name: member1name,
                member1contact: member1contact,
                member1email: member1email,
                tshirtmember1: tshirtmember1,
                member2name: member2name,
                member2contact: member2contact,
                member2email: member2email,
                tshirtmember2: tshirtmember2,
                total: total,
                paid: paid,
                selected: selected,
                confirmCode: confirmCode,
            });
            team
                .save()
                .then(() => {
                    error = "Participant Team has been registered successfully!!";
                    req.flash("error", error);

                    const allEmail = [
                        { email: coachemail, name: coachname },
                        { email: teamleaderemail, name: teamleadername },
                        { email: member1email, name: member1name },
                        { email: member2email, name: member2name },
                    ]

                    allEmail.forEach((team) => {
                        const options = {
                            to: team.email,
                            from: Email,
                            subject: 'Registration is Successful!',
                            text: `Hello ${team.name},
                          You have successfully registered to programming contest as Team ${teamname} and your confirmation code is ${confirmCode}`,
                        }

                        transporter.sendMail(options, function (err, res) {
                            if (err) {
                                console.log(err)
                                return
                            }
                            console.log('Sent: ' + res.response)
                        })
                    })

                    res.redirect("/ProgrammingContest/register");
                })
                .catch((err) => {
                    error = "Kono error nai";
                    console.log(err)
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/register");
                });
        }
    });
};

const getPCList = (req, res) => {
    let participant_teams = [];
    let error = "";
    ProgrammingContest.find()
        .then((data) => {
            participant_teams = data;
            res.render("programming-contest/list.ejs", {
                error: req.flash("error"),
                teams: participant_teams,
            });
        })
        .catch(() => {
            error = "Failed to fetch participant teams";
            res.render("ProgrammingContest/list.ejs", {
                error: req.flash("error", error),
                teams: participant_teams,
            });
        });
};

const deletePC = (req, res) => {
    const id = req.params.id;
    //console.log(id);

    let error = "";
    ProgrammingContest.deleteOne({ _id: req.params.id })
        .then(() => {
            error = "Participant Team deleted successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
            error = "Failed to delete data!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

const selectPC = (req, res) => {
    const id = req.params.id;

    ProgrammingContest.findOne({ _id: id })
        .then((team) => {
            team.selected = true;
            team
                .save()
                .then(() => {
                    let error = "Team has been selected succesfully!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                })
                .catch(() => {
                    let error = "Data could not be updated";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                });
        })
        .catch(() => {
            let error = "Data could not be updated";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

const paymentDonePC = (req, res) => {
    const id = req.params.id;

    ProgrammingContest.findOne({ _id: id })
        .then((team) => {
            team.paid = team.total;
            team
                .save()
                .then(() => {
                    let error = "Payment completed succesfully!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                })
                .catch(() => {
                    let error = "Data could not be updated!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/list");
                });
        })
        .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        });
};

const getInfoPC = (req, res) => {
    const id = req.params.id;

    let info = [];
    let error = "";
    ProgrammingContest.findOne({ _id: id })
        .then((data) => {
            info = data;
            res.render("programming-contest/edit-participant.ejs", {
                error: req.flash("error"),
                team: info,
            });
        })
        .catch((e) => {
            console.log(e);
            error = "Failed to fetch team details";
            res.render("programming-contest/edit-participant.ejs", {
                error: req.flash("error", error),
                team: info,
            });
        });
};

const editPC = async (req, res) => {
    const id = req.params.id;
    const { teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2, total, paid, selected } = req.body;
    console.log(req.body);

    let error = "";

    ProgrammingContest.findOneAndUpdate(
        { _id: id },
        { teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2, total, paid, selected })
        .then((data) => {
            error = "Team updated successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
        })
        .catch((e) => {
            console.log(e);
            error = "Failed to update team details";
            res.redirect("/ProgrammingContest/list");
        });
};

module.exports = { getPC, postPC, getPCList, deletePC, selectPC, paymentDonePC, editPC, getInfoPC };
