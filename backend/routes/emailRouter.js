var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');

emailRouter.route('/')
  .options(cors.cors, (req, res) => {
    console.log("Coming email here");
    res.sendStatus(200);
  })

  .post(cors.cors, (req, res, next) => {

    var transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: 'zohomail@zohomail.eu',//replace with your email
        pass: 'zohomail'//replace with your password
      }
    });

    var mailOptions = {
      from: 'serhii.chorpita@zohomail.eu',
      to: req.body.email,
      subject: `POST A JOB`,
      html: req.body.html
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send('error')
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully')
      }
    });
  })


module.exports = emailRouter;