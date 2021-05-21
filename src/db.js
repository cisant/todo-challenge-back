// Load Sequelize Module
const Sequelize = require('sequelize');

// Load Path and FileSystem library
const path = require('path');
const fs = require('fs');

let sequelize = null;
module.exports = (app) => {
  // Singleton for instance of Sequelize
  if (!sequelize) {
    sequelize = new Sequelize(
      app.env === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME,
      app.env === 'test' ? process.env.DB_TEST_USERNAME : process.env.DB_USERNAME,
      app.env === 'test' ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD,
      {
        pool: {
          max: 25,
          min: 0,
          idle: 20000,
          acquire: 20000,
        },
        logging: JSON.parse(app.env === 'test' ? process.env.DB_TEST_LOGGING : process.env.DB_LOGGING),
        host: app.env === 'test' ? process.env.DB_TEST_HOST : process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
          underscored: true,
        },
      },
    );
  }

  // Database Object with the sequelize instance, sequelize module and all models in projet
  const db = {
    sequelize,
    Sequelize,
    models: {},
  };

  // Leitura das models do microserviço
  const modelsDir = path.join(__dirname, 'models');
  fs.readdirSync(modelsDir).forEach((file) => {
    const model = sequelize.import(path.join(modelsDir, file));
    db.models[model.name] = model;
  });

  // Read all associations in models
  Object.keys(db.models).forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models);
    }
  });

  // Função de Update ou Insert
  db.updateOrCreate = async (Model, where, object, transaction) => {
    try {
      const count = await Model.count({ where });
      if (count === 0) {
        return Model.create(object, { transaction });
      }
      return Model.update(object, { where, transaction });
    } catch (err) {
      throw err;
    }
  };

  return db;
};
