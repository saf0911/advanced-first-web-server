// Your server code here...
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/Users';


mongoose.connect('mongodb://localhost/Scottsnewdatabase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected!');
});

const server = express();

const Port = 3000;

server.use(bodyParser.json());

// eslint-disable-next-line
server.use((err, request, response, next) => {
  console.log('this is not an error');
  return response.status(500).json({message: err.message});
});

// server.get('/', (request, response) => {
//   response.json({
//     Hello: 'World'
//   });
// });
//
// server.get('/ham', (request, response, next) => {
//   const error = new Error('This is canned ham');
//   return next(error);
// });

server.get('/users', (request, response) => {
  User.find({}).exec()
    .then(Users => {
      return response.json(Users);
    })
    .catch(err => {
      console.log(`Error! ${err}`);
    });
});

server.get('/users', (request, response) => {
  User.findById(request.params.is).exec()
    .then(Users => {
      return response.json(Users);
    })
    .catch(err => {
      console.log(`Error! ${err}`);
    });
});

server.post('/users', (request, response, next) => {
  User.create(request.body).exec()
  .then(() => {
    console.log('User was saved');
  })
  .catch(() => {
    console.log('user was not saved');
  });
  const users = new User(request.body);

  users.save()
  .then(storedUser => {
    console.log('User was saved');
    return response.json(storedUser);
  })
  .catch((err) => {
    return next(err);
  });

  return response.json(users);
});


server.get('/*', (request, response, next) => {
  // response.json({
  //   Its: 'Broke'
  // });
  console.log('what what what');
  next();
});




server.listen(Port, (err) => {
  if (err) {
    console.log('Server does not work', err);
  }
  console.log('It is alive');
});
