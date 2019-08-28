const jwt = require('jsonwebtoken');

const Auth = require('../authentication/authDb.js');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass' });
        //token is invalid
      } else {
        req.user = { username: decodedToken.username };
        next();
        //token is good
      }
    });
  } else {
    res.status(400).json({ message: 'no token for you' });
  }

  //   if (username && password) {
  //     Auth.findbyFilter({ username })
  //       .first()
  //       .then(user => {
  //         if (user && bcrypt.compareSync(password, user.password)) {
  //           next();
  //         } else {
  //           res.status(401).json({ message: 'Invalid Credentials' });
  //         }
  //       });
  //   } else {
  //     res.status(400).json({ message: 'No Credentials Provided' });
  //   }
};
