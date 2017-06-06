import express from 'express';
import User from '../models/Users';
import bcrypt from 'bcrypt';


const AuthentificationRoutes = express.Router();


AuthentificationRoutes.post('/api/signup', (request, response, next) => {
  const {username, password} = request.body;
  if (!username || !password) {
    return response.status(422)
    .json({error: 'A username and password are required'});
  }

  User.findOne({username}).exec()
  .then((existingUser) => {
    if (existingUser) {
      console.log('hope this works');
      return response.status(422).json({error: 'Than username is taken'});
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({username, password: hashedPassword});
      user.save()
      .then( response.json(user));
    });
  })
    .catch(err => next(err));

});



export default AuthentificationRoutes;
