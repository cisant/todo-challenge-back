module.exports = (app) => {
  const controller = app.controllers.todo;

  app.get('/todos', controller.getTodos);
  app.put('/todo', controller.addTodo);
  app.post('/todo', controller.changeStatus);
  app.post('/generate-todos', controller.generateTodos);
};
