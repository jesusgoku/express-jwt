const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const users = [
  { id: 1, username: 'jesusgoku', password: 'angelito' },
  { id: 2, username: 'angelito', password: 'jesusgoku' },
];

const PORT = process.env.POST || 3000;
const SECRET = process.env.SECRET || 'angelito';

// const checkJWT = expressJWT({ secret: SECRET });
const checkJWT = (req, res, next) => {
  let accessToken = null;

  const authorizationHeader = req.headers.authorization && req.headers.authorization.split(' ');
  if (authorizationHeader && Array.isArray(authorizationHeader) && authorizationHeader[0] === 'Bearer') {
    accessToken = authorizationHeader[1];
  } else if (req.query && req.query.access_token) {
    accessToken = req.query.access_token;
  }

  if (!accessToken) {
    return res
      .status(401)
      .json({ code: 401, message: 'Error, access-token not provided' })
    ;
  }

  try {
    const payload = jwt.verify(accessToken, SECRET);
    req.user = payload;
  } catch(e) {
    return res
      .status(401)
      .json({ code: 401, message: 'Error, access-token not valid' })
    ;
  }

  next();
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ code: 400, message: 'Error, enter the correct username and password' })
    ;
    return;
  }

  const username = req.body.username;
  const user = users.find(u => u.username === username);

  if (!user) {
    res
      .status(401)
      .json({ code: 401, message: 'Error, user not found' })
    ;
    return;
  }

  const password = req.body.password;
  if (user.password !== password) {
    res
      .status(401)
      .json({ code: 401, message: 'Error, password is not correct' })
    ;
    return;
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username },
    SECRET,
    { expiresIn: '3 hours' },
  );

  res
    .status(200)
    .json({ access_token: token })
  ;
});

app.get('/time', checkJWT, (req, res) => {
  const time = (new Date()).toLocaleTimeString();
  res
    .json({ time, user: req.user })
  ;
});

app.get('/', (req, res) => {
  res
    .json({ ping: 'pong' })
  ;
});

app.listen(PORT, () => console.log(`Listen on: http://localhost:${PORT}`));
