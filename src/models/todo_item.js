module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('TodoItem', {
    id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Done'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    moves: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'todo_item',
  });

  model.associate = (models) => {
  };

  return model;
};
