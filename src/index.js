// Your server code here...
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/userRoutes';
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

server.use(router);

// eslint-disable-next-line
server.use((err, request, response, next) => {
  console.log('this is not an error');
  return response.status(500).json({message: err.message});
});


// server.get('/users', (request, response) => {
//   User.find({}).exec()
//     .then(Users => {
//       return response.json(Users);
//     })
//     .catch(err => {
//       console.log(`Error! ${err}`);
//     });
// });

// server.get('/users:id', (request, response) => {
//   User.findById(request.params.id).exec()
//     .then(Users => {
//       return response.json(Users);
//     })
//     .catch(err => {
//       console.log(`Error! ${err}`);
//     });
// });


// server.delete('/users:id', (request, response) => {
//   User.findByIdAndRemove(request.params.id).exec()
//   .then(Users => {
//     return response.json(Users);
//   })
//   .catch(err => {
//     console.log(`Error! ${err}`);
//   });
// });

server.post('/users', (request, response, next) => {
  const user = new User(request.body);

  user.save()
  .then(storedUser => {
    return response.json(storedUser);
  })
  .catch((err) => {
    return next(err);
  });

  return response.json(user);
});

//eslint-disable-next-line
server.get('/*', (err, request, response, next) => {
  console.log('what what what');
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
