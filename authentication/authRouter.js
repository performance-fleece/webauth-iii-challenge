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
    const token = generateToken(newUser);
    res.status(201).json({ message: `Welcome ${user.username}`, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});
router.get('/users', restricted, async (req, res) => {
  const users = await Auth.findbyFilter(req.department);
  res.status(200).json(users);
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
    username: user.username,
    department: user.department //sub
  };

  const options = {
    expiresIn: '5m'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
