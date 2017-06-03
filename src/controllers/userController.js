import User from '../models/Users';

const userController = {};

userController.list = (request, response, next) => {
  User.find({}).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return next(err);
  });
};

userController.show = (request, response, next) => {
  User.findById(request.params.id).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return next(err);
  });
};

userController.remove = (request, response, next) => {
  User.findByIdAndRemove(request.params.id).exec()
  .then(Users => {
    return response.json(Users);
  })
  .catch(err => {
    return next(err);
  });
};

userController.create = (request, response, next) => {
  const user = new User(request.body);

  user.save()
  .then(storedUser => {
    return response.json(storedUser);
  })
  .catch((err) => {
    return next(err);
  });
  return response.json(user);
};


export default userController;
