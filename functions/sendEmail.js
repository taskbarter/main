const express = require('express');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const nodemailer = require('nodemailer');
const generic_template = require('../emails/generic_email');

const sendEmail = async (subject, to_email, html, text = '') => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to_email,
      from: keys.taskBarterGmail,
      subject: subject,
      text: text,
      html: html,
    };
    console.log('sending email from ' + msg.from);
    sgMail
      .send(msg)
      .then(() => {
        console.log('Confirmation email sent');
      })
      .catch((error) => {
        console.log(error.response.body);
      });
  } catch (err) {
    console.log('EMAIL NOT SENT');
    console.log(err);
  }
};

const sendEmailUsingNode = async (subject, to_email, text, fname, lname) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
      },
    });

    var mailOptions = {
      from: keys.taskBarterGmail,
      to: to_email,
      subject: 'Taskbarter | ' + subject,
      text: text,
      html: generic_template(fname, lname, to_email, text),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ');
      }
    });
  } catch (err) {
    console.log('EMAIL NOT SENT');
    console.log(err);
  }
};

module.exports = {
  sendEmail,
  sendEmailUsingNode,
};
