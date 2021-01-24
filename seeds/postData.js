const { Post } = require('../models');

const postData = [
  {
    title: "First Post!",
    date: "1/23/21",
    content: "Hello! Welcome to Talk Tec!",
    user_id: "1",
  },
  {
    title: "Transportation",
    date: "1/23/21",
    content: "Do you think Elon Musk's SpaceX projects will take off?? LOL",
    user_id: "2",
  },
  {
    title: "Which is more useful in growning a brand, Twitter or Instagram?",
    date: "1/4/21",
    content: "I personally think Twitter is important to share a voice, but promoting good THATS INSTA!",
    user_id: "3",
  },

];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
