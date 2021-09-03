"use strict";

var ProgrammingContest = require("../models/ProgrammingContest.model");

require("dotenv").config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var Email = process.env.Email;
var Password = process.env.Password;

var crypto = require('crypto');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email,
    pass: Password
  }
});

var getPC = function getPC(req, res) {
  res.render("programming-contest/register.ejs", {
    error: req.flash("error")
  });
};

var postPC = function postPC(req, res) {
  var _req$body = req.body,
      teamname = _req$body.teamname,
      institutename = _req$body.institutename,
      coachname = _req$body.coachname,
      coachcontact = _req$body.coachcontact,
      coachemail = _req$body.coachemail,
      tshirtcoach = _req$body.tshirtcoach,
      teamleadername = _req$body.teamleadername,
      teamleadercontact = _req$body.teamleadercontact,
      teamleaderemail = _req$body.teamleaderemail,
      tshirtteamleader = _req$body.tshirtteamleader,
      member1name = _req$body.member1name,
      member1contact = _req$body.member1contact,
      member1email = _req$body.member1email,
      tshirtmember1 = _req$body.tshirtmember1,
      member2name = _req$body.member2name,
      member2contact = _req$body.member2contact,
      member2email = _req$body.member2email,
      tshirtmember2 = _req$body.tshirtmember2;
  console.log(req.body);
  var total = 300;
  var paid = 0;
  var selected = false;
  var confirmCode = crypto.randomBytes(20).toString('hex');
  var error = ""; //if name & contact differs, only then we will store to database

  ProgrammingContest.findOne({
    teamname: teamname,
    institutename: institutename
  }).then(function (participantteam) {
    if (participantteam) {
      error = "Participant Team with same name and Institutes exists";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/register");
    } else {
      var team = new ProgrammingContest({
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
        confirmCode: confirmCode
      });
      team.save().then(function () {
        error = "Participant Team has been registered successfully!!";
        req.flash("error", error);
        var allEmail = [{
          email: coachemail,
          name: coachname
        }, {
          email: teamleaderemail,
          name: teamleadername
        }, {
          email: member1email,
          name: member1name
        }, {
          email: member2email,
          name: member2name
        }];
        allEmail.forEach(function (team) {
          var options = {
            to: team.email,
            from: Email,
            subject: 'Registration is Successful!',
            text: "Hello ".concat(team.name, ",\n                          You have successfully registered to programming contest as Team ").concat(teamname, " and your confirmation code is ").concat(confirmCode)
          };
          transporter.sendMail(options, function (err, res) {
            if (err) {
              console.log(err);
              return;
            }

            console.log('Sent: ' + res.response);
          });
        });
        res.redirect("/ProgrammingContest/register");
      })["catch"](function (err) {
        error = "Kono error nai";
        console.log(err);
        req.flash("error", error);
        res.redirect("/ProgrammingContest/register");
      });
    }
  });
};

var getPCList = function getPCList(req, res) {
  var participant_teams = [];
  var error = "";
  ProgrammingContest.find().then(function (data) {
    participant_teams = data;
    res.render("programming-contest/list.ejs", {
      error: req.flash("error"),
      teams: participant_teams
    });
  })["catch"](function () {
    error = "Failed to fetch participant teams";
    res.render("ProgrammingContest/list.ejs", {
      error: req.flash("error", error),
      teams: participant_teams
    });
  });
};

var deletePC = function deletePC(req, res) {
  var id = req.params.id; //console.log(id);

  var error = "";
  ProgrammingContest.deleteOne({
    _id: req.params.id
  }).then(function () {
    error = "Participant Team deleted successfully!";
    req.flash("error", error);
    res.redirect("/ProgrammingContest/list");
  })["catch"](function () {
    error = "Failed to delete data!";
    req.flash("error", error);
    res.redirect("/ProgrammingContest/list");
  });
};

var selectPC = function selectPC(req, res) {
  var id = req.params.id;
  ProgrammingContest.findOne({
    _id: id
  }).then(function (team) {
    team.selected = true;
    team.save().then(function () {
      var error = "Team has been selected succesfully!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    })["catch"](function () {
      var error = "Data could not be updated";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
  })["catch"](function () {
    var error = "Data could not be updated";
    req.flash("error", error);
    res.redirect("/ProgrammingContest/list");
  });
};

var paymentDonePC = function paymentDonePC(req, res) {
  var id = req.params.id;
  ProgrammingContest.findOne({
    _id: id
  }).then(function (team) {
    team.paid = team.total;
    team.save().then(function () {
      var error = "Payment completed succesfully!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    })["catch"](function () {
      var error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });
  })["catch"](function () {
    var error = "Data could not be updated!";
    req.flash("error", error);
    res.redirect("/ProgrammingContest/list");
  });
};

var getInfoPC = function getInfoPC(req, res) {
  var id = req.params.id;
  var info = [];
  var error = "";
  ProgrammingContest.findOne({
    _id: id
  }).then(function (data) {
    info = data;
    res.render("programming-contest/edit-participant.ejs", {
      error: req.flash("error"),
      team: info
    });
  })["catch"](function (e) {
    console.log(e);
    error = "Failed to fetch team details";
    res.render("programming-contest/edit-participant.ejs", {
      error: req.flash("error", error),
      team: info
    });
  });
};

var editPC = function editPC(req, res) {
  var id, _req$body2, teamname, institutename, coachname, coachcontact, coachemail, tshirtcoach, teamleadername, teamleadercontact, teamleaderemail, tshirtteamleader, member1name, member1contact, member1email, tshirtmember1, member2name, member2contact, member2email, tshirtmember2, total, paid, selected, error;

  return regeneratorRuntime.async(function editPC$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, teamname = _req$body2.teamname, institutename = _req$body2.institutename, coachname = _req$body2.coachname, coachcontact = _req$body2.coachcontact, coachemail = _req$body2.coachemail, tshirtcoach = _req$body2.tshirtcoach, teamleadername = _req$body2.teamleadername, teamleadercontact = _req$body2.teamleadercontact, teamleaderemail = _req$body2.teamleaderemail, tshirtteamleader = _req$body2.tshirtteamleader, member1name = _req$body2.member1name, member1contact = _req$body2.member1contact, member1email = _req$body2.member1email, tshirtmember1 = _req$body2.tshirtmember1, member2name = _req$body2.member2name, member2contact = _req$body2.member2contact, member2email = _req$body2.member2email, tshirtmember2 = _req$body2.tshirtmember2, total = _req$body2.total, paid = _req$body2.paid, selected = _req$body2.selected;
          console.log(req.body);
          error = "";
          ProgrammingContest.findOneAndUpdate({
            _id: id
          }, {
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
            selected: selected
          }).then(function (data) {
            error = "Team updated successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
          })["catch"](function (e) {
            console.log(e);
            error = "Failed to update team details";
            res.redirect("/ProgrammingContest/list");
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getPC: getPC,
  postPC: postPC,
  getPCList: getPCList,
  deletePC: deletePC,
  selectPC: selectPC,
  paymentDonePC: paymentDonePC,
  editPC: editPC,
  getInfoPC: getInfoPC
};
//# sourceMappingURL=ProgrammingContest.controller.dev.js.map
