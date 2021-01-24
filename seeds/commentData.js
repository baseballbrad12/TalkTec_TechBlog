const { Comment } = require('../models');

const CommentData = [
  {
    title: "Heyo! Cool blog!",
    date: "01/24/21",
    content: "WOO!",
    post_id: "1",
    user_id: "1"
  },
  {
    title: "I agree^^^^ very cool!",
    date: "01/24/21",
    content: "WEE!",
    post_id: "1",
    user_id: "2"
  },
  {
    title: "I love tech!",
    date: "01/24/21",
    content: "Name a better electric car, than the Tesla Model 3!",
    post_id: "2",
    user_id: "2"
  },
  {
    title: "Facebook or Instagram?",
    date: "1/24/21",
    content: "Which do you use more?",
    post_id: "3",
    user_id: "1"
  },
  
];

const seedCommentData = () => Comment.bulkCreate(CommentData);

module.exports = seedCommentData;
