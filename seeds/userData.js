const { User } = require('../models');

const userdata = [
  {
    username: "Tom Brady",
    email: "John.Doe@gmail.com",
    password: "password123"
  },
  {
    username: "Jane Doe",
    email: "Jane.Doe456@gmail.com",
    password: "secretPassword123"
  },
  {
    username: "Nancy Jay",
    email: "NJay@gmail.com",
    password: "EvenBetterPassword"
  },
];

const seedUsers = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
