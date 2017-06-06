// import express from 'express';
import LocalStrategy from 'passport-local';
import User from '../models/Users';
import bcrypt from 'bcrypt';
import passport from 'passport';


const signInStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({username}).exec()
  .then(user => {
    if (!user) {
      return done(null, false);
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err, false);
      }
      if (isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
  .catch(err => done(err, false));
});


passport.use('signInStrategy', signInStrategy);
