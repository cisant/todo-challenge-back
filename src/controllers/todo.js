module.exports = (app) => {
  const repository = app.repositories.todo;
  return {
    async getTodos(req, res) {
      try {
        res.json(
          await repository.getTodos(),
        );
      } catch (err) {
        throw err;
      }
    },

    async addTodo(req, res) {
      try {
        res.json(
          await repository.addTodo(
            req.headers['current-socket-id'],
            req.body.description,
            req.body.name,
            req.body.email,
            true,
          ),
        );
      } catch (err) {
        throw err;
      }
    },

    async changeStatus(req, res) {
      try {
        res.json(
          await repository.changeStatus(
            req.headers['current-socket-id'],
            req.body.id,
          ),
        );
      } catch (err) {
        throw err;
      }
    },

    async generateTodos(req, res) {
      try {
        res.json(
          await repository.generateTodos(
            req.headers['current-socket-id'],
          ),
        );
      } catch (err) {
        throw err;
      }
    },
  };
};
