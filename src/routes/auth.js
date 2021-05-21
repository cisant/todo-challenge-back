module.exports = (app) => {
  const controller = app.controllers.auth;

  app.post('/authorize', controller.authorize);
};
