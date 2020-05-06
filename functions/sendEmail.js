const express = require('express');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

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
    sgMail.send(msg);
  } catch (err) {
    console.log('EMAIL NOT SENT');
    console.log(err);
  }
};

module.exports = {
  sendEmail,
};
