const { Post, Comment } = require('../../models');
const router = require('express').Router();

// Create comment into database.
router.post('/:post_id', async (req, res) => {
    if (req.session.loggedIn)
    {
        //Need to insert to database.
        try {
            const setcomment_db = await Comment.create({
                post_id: req.body.post_id,
                title: req.body.title,
                date: Date.now(),
                content: req.body.content,
                user_id: req.session.user_id
            });
            res.status(200).json(setcomment_db);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else
    {
        // Notify user to login.
        res.status(500).json("Please log in to your account.");
    }
});

module.exports = router;
