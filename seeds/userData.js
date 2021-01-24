const { User } = require('../models');

const UserData = [
  {
    username: "TomBrady",
    email: "BucCapt@gmail.com",
    password: "BillisSalty12"
  },
  {
    username: "AaronRodgers",
    email: "RodgerRodger@gmail.com",
    password: "IamJedi"
  },
  {
    username: "DavanteAdams",
    email: "TaeAdams@gmail.com",
    password: "BestWR17"
  },
];

const seedUsers = () => User.bulkCreate(UserData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
