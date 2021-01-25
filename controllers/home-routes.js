const { Post, Comment, User } = require('../models');
const router = require('express').Router();

// Get posts for homepage
router.get('/', async (req, res) => {
  try {
    const SetPost_db = await Post.findAll();
    const posts = SetPost_db.map((post) =>
      post.get({ plain: true })
    );
    //Logged in session sent to homepage
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get dashboard posts
router.get('/dashboard', async (req,res) => {
  if(req.session.loggedIn)
  {
    try {
      const SetPost_db = await Post.findAll({
        where: {
          user_id: req.session.user_id
        }
      });
      
      const posts = SetPost_db.map((post) => {
        return post.get({ plain: true });
      });
      
      res.render('dashboard', { 
        posts, 
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log('ERROR: ' + err);
      res.status(500).json(err);
    }
  }else{
    // When user is not logged in
    res.redirect('/login');
  }
});

// Get a post from TalkTec_db
router.get('/post/:id', async (req, res) => {
  try {
    const SetPost_db = await Post.findByPk(req.params.id, 
      {
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'title',
              'date',
              'content',
              'user_id',
            ],
            },
        ],
      }
    );

    const posts = SetPost_db.get({ plain: true });

    //GET Comment Username and ID from TalkTec_db
    posts.comments.forEach(async element => {
        const CmntUserID = await User.findByPk(element.user_id);
        const CmntUser = CmntUserID.get({plain: true}).username;
  
        element.username = CmntUser;
    });

    //GET Post Username and ID from TalkTec_db
    const UsernamePost_db = await User.findByPk(posts.user_id);
    const Username = UsernamePost_db.get({plain: true}).username;
    const UserId = UsernamePost_db.get({plain: true}).id;

    let UserPost = false;

    if(req.session.user_id === UserId)
    {
      UserPost = true;
    }

    // Render the post handlebars to the 'loggedIn' session variable 
    res.render('posts', { posts, Username, loggedIn: req.session.loggedIn, UserPoster: UserPost});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route Sign Up Handlebars
//Sign in redirects to homepage if already logged in.
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// Route Login Handlebars
//Sign in redirects to homepage if already logged in.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;
