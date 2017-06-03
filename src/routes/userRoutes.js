import express from 'express';
import User from '../models/Users';

const router = express.Router();

router.get('/users', (request, response) => {
  User.find({}).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return (err);
  });
});

router.get('/users/:id', (request, response, next) => {
  User.findById(request.params.id).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return next(err);
  });
});

router.delete('/users/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return next(err);
  });
});

module.exports = router;
