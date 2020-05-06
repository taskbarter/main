const express = require('express');
const sgMail = require('@sendgrid/mail');

const sendEmail = async (subject, to_email, html, text = '') => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to_email,
    from: keys.taskBarterGmail,
    subject: subject,
    text: text,
    html: html,
  };
  sgMail.send(msg);
};

module.exports = {
  sendEmail,
};
