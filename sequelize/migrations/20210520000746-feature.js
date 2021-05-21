module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'todo_item',
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
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
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('todo_item');
  },
};
