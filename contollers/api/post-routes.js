const { Post } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    if (req.session.loggedIn)
    {
        try {
            const SetPost_db = await Post.create({
                title: req.body.title,
                date: Date.now(),
                content: req.body.content,
                user_id: req.session.user_id
            });
            res.status(200).json(SetPost_db);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else
    {
        // Notify user to log in.
        res.status(500).json("Please log in to your account.");
    }
});

router.put('/:id', async (req,res) => {
    if(req.session.loggedIn)
    {
        try {
            const updateValues = {
                title: req.body.title,
                date: Date.now(),
                content: req.body.content
            }
            const PostUpdate_db = await Post.update(updateValues, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else
    {
        res.status(500).json("Please log in to your account.");
    }
});

module.exports = router;
