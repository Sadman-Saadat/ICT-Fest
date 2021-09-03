"use strict";

var MathOlympiad = require("../models/MathOlympiad.model");

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

var getMO = function getMO(req, res) {
  res.render("math-olympiad/register.ejs", {
    error: req.flash("error")
  });
};

var postMO = function postMO(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      contact = _req$body.contact,
      email = _req$body.email,
      institution = _req$body.institution,
      tshirt = _req$body.tshirt;
  console.log(name);
  console.log(category);
  console.log(contact);
  console.log(email);
  console.log(institution);
  console.log(tshirt);
  var registrationFee = 0;

  if (category == "School") {
    registrationFee = 250;
  } else if (category == "College") {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }

  var total = registrationFee;
  var paid = 0;
  var selected = false;
  var confirmCode = crypto.randomBytes(20).toString('hex');
  var error = ""; //if name & contact differs, only then we will store to database

  MathOlympiad.findOne({
    name: name,
    contact: contact
  }).then(function (participant) {
    if (participant) {
      error = "Participant with same name and contact exists";
      req.flash("error", error);
      res.redirect("/MathOlympiad/register");
    } else {
      var _participant = new MathOlympiad({
        name: name,
        category: category,
        contact: contact,
        email: email,
        institution: institution,
        paid: paid,
        total: total,
        selected: selected,
        confirmCode: confirmCode,
        tshirt: tshirt
      });

      _participant.save().then(function () {
        error = "Participant has been registered successfully!!";
        req.flash("error", error);
        var options = {
          to: email,
          from: Email,
          subject: 'Registration is Successful!',
          text: "Hello ".concat(name, ",\n                        You have successfully registered to ").concat(category, " category and your confirmation code is ").concat(confirmCode)
        };
        transporter.sendMail(options, function (err, info) {
          if (err) {
            console.log(err);
            return;
          }

          console.log('Sent: ' + info.response);
        });
        res.redirect("/MathOlympiad/register");
      })["catch"](function () {
        error = "Unexpected error";
        req.flash("error", error);
        res.redirect("/MathOlympiad/register");
      });
    }
  }); // res.render("math-olympiad/register.ejs");
};

var getMOList = function getMOList(req, res) {
  var all_participant = [];
  var error = "";
  MathOlympiad.find().then(function (data) {
    all_participant = data;
    res.render('math-olympiad/list.ejs', {
      error: req.flash('error'),
      participants: all_participant
    });
  })["catch"](function () {
    error = "Failed to fetch data!";
    res.render('math-olympiad/list.ejs', {
      error: req.flash('error', error),
      participants: all_participant
    });
  });
};

var deleteMO = function deleteMO(req, res) {
  var id = req.params.id; //console.log(id);

  MathOlympiad.deleteOne({
    _id: req.params.id
  }).then(function () {
    var error = 'Data has been deleted successfully!';
    req.flash('error', error);
    res.redirect('/MathOlympiad/list');
  })["catch"](function () {
    var error = 'Failed to delete data!';
    req.flash('error', error);
    res.redirect('/MathOlympiad/list');
  });
};

var paymentDoneMO = function paymentDoneMO(req, res) {
  var id = req.params.id;
  MathOlympiad.findOne({
    _id: id
  }).then(function (participant) {
    participant.paid = participant.total;
    participant.save().then(function () {
      var error = "Payment completed succesfully!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    })["catch"](function () {
      var error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
  })["catch"](function () {
    var error = "Data could not be updated";
    req.flash("error", error);
    res.redirect("/MathOlympiad/list");
  });
};

var selectMO = function selectMO(req, res) {
  var id = req.params.id;
  MathOlympiad.findOne({
    _id: id
  }).then(function (participant) {
    participant.selected = true;
    participant.save().then(function () {
      var error = "Participant has been selected succesfully!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    })["catch"](function () {
      var error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
  })["catch"](function () {
    var error = "Data could not be updated!";
    req.flash("error", error);
    res.redirect("/MathOlympiad/list");
  });
};

var getEditMO = function getEditMO(req, res) {
  var id = req.params.id;
  var info = [];
  var error = "";
  MathOlympiad.findOne({
    _id: id
  }).then(function (data) {
    info = data;
    res.render("math-olympiad/edit-participant.ejs", {
      error: req.flash("error"),
      participant: info
    });
  })["catch"](function (e) {
    console.log(e);
    error = "Participant details could not be fetched!";
    res.render("math-olympiad/editParticipant.ejs", {
      error: req.flash("error", error),
      participant: info
    });
  });
};

var editMO = function editMO(req, res) {
  var id, _req$body2, name, category, contact, email, institution, tshirt, error;

  return regeneratorRuntime.async(function editMO$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, category = _req$body2.category, contact = _req$body2.contact, email = _req$body2.email, institution = _req$body2.institution, tshirt = _req$body2.tshirt; //console.log(req.body);

          error = "";
          MathOlympiad.findOneAndUpdate({
            _id: id
          }, {
            name: name,
            category: category,
            contact: contact,
            email: email,
            institution: institution,
            tshirt: tshirt
          }).then(function (data) {
            error = "Update infromation successful!";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
          })["catch"](function (e) {
            console.log(e);
            error = "Update information failed!";
            res.redirect("/MathOlympiad/list");
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getMO: getMO,
  postMO: postMO,
  getMOList: getMOList,
  deleteMO: deleteMO,
  paymentDoneMO: paymentDoneMO,
  selectMO: selectMO,
  editMO: editMO,
  getEditMO: getEditMO
};
//# sourceMappingURL=MathOlympiad.controller.dev.js.map
