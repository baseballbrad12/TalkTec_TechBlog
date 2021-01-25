const { User } = require('../../models');
const router = require('express').Router();

//User Login
router.post('/login', async (req, res) => {
  try {
    //Find email inputted from User within TalkTec_db
    const Login_db = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //Return status 400 and incorrect alert to user if no email found.
    if (!Login_db) {
      res
        .status(400)
        .json({ message: 'Incorrect Email or Password.' });
      return;
    }

    //Verify password
    const verifyPassword = await Login_db.checkPassword(req.body.password);

    //If password is innaccurate
    if (!verifyPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Email or Password.' });
      return;
    }

    // Set up the sessions variable 'loggedIn' when User is logged in.
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = Login_db.getDataValue('id');
      req.session.username = Login_db.getDataValue('username');
      res
        .status(200)
        .json({ user: Login_db, message: 'Welcome to Talk Tec!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User wants to logout
router.post('/logout', (req, res) => {
  // End session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const CreateUser_db = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(CreateUser_db);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
