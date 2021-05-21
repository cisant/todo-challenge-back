const uuid = require('uuid/v4');
const axios = require('axios');

module.exports = (app) => {
  return {
    async getTodos() {
      const todos = await app.db.models.TodoItem.findAll({ order: [['updated_at', 'DESC']] });

      return {
        pending: todos.filter(todo => todo.status === 'Pending'),
        done: todos.filter(todo => todo.status === 'Done'),
      };
    },

    async addTodo(description, name, email) {
      const validateEmail = await axios.get(`http://apilayer.net/api/check?access_key=${process.env.MAILBOX_KEY}&email=${email}`);
      const { data } = validateEmail;

      const returnObject = {};

      if (!data.format_valid) {
        if (data.did_you_mean !== '') {
          returnObject.valid = false;
          returnObject.didYouMean = data.did_you_mean;
        }
        returnObject.valid = false;
      } else {
        await app.db.models.TodoItem.create(
          {
            id: uuid(),
            description,
            name,
            email,
          },
        );

        returnObject.valid = true;
      }

      app.repositories.todo.notifyUpdateTodoList();
      return returnObject;
    },

    async changeStatus(id) {
      const todo = await app.db.models.TodoItem.findOne({ where: { id } });
      const status = todo.status === 'Pending' ? 'Done' : 'Pending';
      let moves = todo.moves;

      if (status === 'Pending') {
        if (moves >= 2) {
          return false;
        }
        moves++;
      }

      await todo.update({ status, moves });

      app.repositories.todo.notifyUpdateTodoList();
      return true;
    },

    async generateTodos() {
      const response = await axios.get('https://cat-fact.herokuapp.com/facts');
      const { data } = response;

      const facts = [...data];
      const promises = [];

      for (let i = 0; i <= 2; i++) {
        if (facts.length > 0) {
          const position = Math.floor(Math.random() * (facts.length));
          promises.push(app.repositories.todo.addTodo(facts[position].text, process.env.TODO_GENERATED_NAME, process.env.TODO_GENERATED_EMAIL));

          facts.splice(position, 1);
        }
      }

      await Promise.all(promises);

      return true;
    },

    async notifyUpdateTodoList() {
      for (let i = 0; i < app.socket.clients.length; i++) {
        app.socket.clients[i].emit('UPDATE_TODO_LIST');
      }
    },
  };
};
