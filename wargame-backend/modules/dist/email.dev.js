"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nodemailer = require('nodemailer');

var pug = require('pug');

var htmlToText = require('html-to-text');

var config = require('./../config');

module.exports =
/*#__PURE__*/
function () {
  function Email(user, code) {
    _classCallCheck(this, Email);

    this.to = user.email;
    this.firstName = user.firstName;
    this.code = code;
    this.from = process.env.User_Email || config.email.user;
  }

  _createClass(Email, [{
    key: "newTransport",
    value: function newTransport() {
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        // true for 465, false for other ports
        auth: {
          user: process.env.User_Email || config.email.user,
          pass: process.env.User_Password || config.email.pass
        },
        tls: {
          rejectUnauthorized: false
        },
        logger: true,
        debug: false
      });
    } // send the actual email

  }, {
    key: "send",
    value: function send(template, subject) {
      var html, mailOptions;
      return regeneratorRuntime.async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 1) Render HTML based on pug template
              html = pug.renderFile("".concat(__dirname, "/../views/email/").concat(template, ".pug"), {
                firstName: this.firstName,
                code: this.code,
                subject: subject
              }); // 2) Define email options

              mailOptions = {
                from: this.from,
                to: this.to,
                subject: subject,
                html: html,
                text: htmlToText.fromString(html) // html:

              }; // 3) Create a tranport and send email

              _context.next = 4;
              return regeneratorRuntime.awrap(this.newTransport().sendMail(mailOptions, function (error, response) {
                if (error) {
                  console.log(error);
                } else {// console.log('Send', response.response);
                }
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendWelcome",
    value: function sendWelcome() {
      return regeneratorRuntime.async(function sendWelcome$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.send('welcome', 'Welcome to Wargames Family!'));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendPasswordReset",
    value: function sendPasswordReset() {
      return regeneratorRuntime.async(function sendPasswordReset$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.send('passwordReset', 'Your Password reset code'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Email;
}();