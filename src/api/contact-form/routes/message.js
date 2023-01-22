module.exports = {
  routes: [
    {
      method: "POST",
      path: "/message",
      handler: "message.submitContactForm",
      config: {
        auth: false,
      },
    },
  ],
};
