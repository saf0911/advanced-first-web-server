// Your server code here...
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/userRoutes';
import authRouter from './routes/AuthenticationRoutes';
import passport from 'passport';

require('dotenv').config();

mongoose.connect('mongodb://localhost/Scottsnewdatabase');

console.log('error2');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected!');
});

const server = express();

const Port = process.env.Port || 3000;

const authStrategy = passport.authenticate('authStrategy', {session: false});

server.use(bodyParser.json());

server.use(router);

server.use(authRouter);
console.log('error1');

// eslint-disable-next-line
server.get('/api/secret', authStrategy, (request, response, next) => {
  response.send(`The current user is ${request.user.username}`);
});

// eslint-disable-next-line
server.use((err, request, response, next) => {
  return response.status(500).json({message: err.message});
});


//eslint-disable-next-line
server.get('/*', (err, request, response, next) => {
  return response.status(400).json({
    message: err.message
  });
});




server.listen(Port, (err) => {
  if (err) {
    console.log('Server does not work', err);
  }
  console.log('It is alive');
});
