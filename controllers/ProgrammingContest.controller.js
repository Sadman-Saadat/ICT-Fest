const ProgrammingContest = require("../models/ProgrammingContest.model");

const getPC = (req, res) => {
    res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
    const { teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2 } = req.body;

    console.log(req.body);




    const total = 300;
    const paid = 0;
    const selected = false;

    let error = "";

    //if name & contact differs, only then we will store to database
    ProgrammingContest.findOne({ teamname: teamname, institutename: institutename }).then((participantteam) => {
        if (participantteam) {
            error = "Participant Team with same name and Institutes exists";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
        } else {
            const participantteam = new ProgrammingContest({
                teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2, total, paid, selected
            });
            participantteam
                .save()
                .then(() => {
                    error = "Participant Team has been registered successfully!!";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/register");
                })
                .catch(() => {
                    error = "Unexpected error";
                    req.flash("error", error);
                    res.redirect("/ProgrammingContest/register");
                });
        }
    });
};

const getPCList = (req, res) => {
    res.render("programming-contest/list.ejs");
};

const deletePC = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render("programming-contest/list.ejs");
};

module.exports = { getPC, postPC, getPCList, deletePC };
