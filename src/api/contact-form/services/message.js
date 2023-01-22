"use strict";

/**
 * contact-form service
 */

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const yup = require("yup");

module.exports = {
  validate(data) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .min(3, "Name should be at least 3 characters long")
        .max(50, "Name should be not longer than 50 characters long")
        .required(),
      email: yup
        .string()
        .email()
        .min(6, "E-mail should be at least 6 characters long")
        .max(60, "E-mail should be not longer than 60 characters long")
        .required(),
      phone: yup
        .string()
        .max(16, "Phone should be not longer than 16 characters long")
        .min(9, "Phone should be at least 9 characters long"),
      message: yup
        .string()
        .min(10, "Message should be at least 10 characters long")
        .max(5000, "Message should be maximum 5000 characters long")
        .required(),
    });

    return schema.validate(data, { abortEarly: false });
  },
  async getFormConfiguration() {
    return await strapi.entityService.findOne(
      "api::contact-form.contact-form",
      2,
      { populate: "receiveEmails" }
    );
  },

  async createTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_IS_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  },

  async sendEmail(transporter, formData, settings) {
    const data = JSON.parse(formData);
    const { name, email, message, phone } = data;
    const emails = settings.receiveEmails.map(
      (receiveEmail) => receiveEmail.receiveEmail
    );
    const template = handlebars.compile(settings.template);
    return await transporter.sendMail({
      from: `Formularz Kontaktowy <${process.env.SMTP_USER}>`, // sender address
      to: emails, // list of receivers
      subject: settings.subject,
      text: message,
      html: template({
        name,
        email,
        message,
        phone,
      }),
    });
  },
};
