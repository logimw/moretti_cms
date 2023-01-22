"use strict";

/**
 * A set of functions called "actions" for `contact-form`
 */

const MessageService = require("../services/message");
const { ValidationError } = require("yup");

module.exports = {
  async submitContactForm(ctx) {
    try {
      const formData = ctx.request.body;
      const configuration = await MessageService.getFormConfiguration();
      const transporter = await MessageService.createTransporter();
      await MessageService.sendEmail(transporter, formData, configuration);

      ctx.response.status = 201;
      ctx.send({ message: configuration.messageOnSuccess });
    } catch (error) {
      if (error instanceof ValidationError) {
        ctx.send(error);
        return (ctx.response.status = 400);
      }
      ctx.send({ errors: "An error occurred while submitting the form" });
      return (ctx.response.status = 500);
    }
  },
};
