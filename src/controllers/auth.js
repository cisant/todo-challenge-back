module.exports = (app) => {
  const repository = app.repositories.auth;
  return {
    async authorize(req, res) {
      try {
        res.json(
          await repository.authorize(req.body.password),
        );
      } catch (err) {
        throw err;
      }
    },
  };
};
