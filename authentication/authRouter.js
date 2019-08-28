const express = require('express');

const router = express.Router();

const Auth = require('./authDb.js');
const restricted = require('../authentication/restricted-middleware.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newUser = await Auth.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});
router.get('/users', restricted, async (req, res) => {
  const users = await Auth.find();
  res.status(200).json({ users, loggedInUser: req.user.username });
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  try {
    Auth.findbyFilter({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username //sub
  };

  const options = {
    expiresIn: '5m'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
