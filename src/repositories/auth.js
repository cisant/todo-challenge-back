module.exports = () => {
  return {
    async authorize(password) {
      return password === process.env.TODO_PASSWORD;
    },
  };
};
