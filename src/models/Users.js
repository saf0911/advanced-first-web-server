import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: String,

  lastName: String,
  address: String,
  occupation: String,
  phone: String,
  avatar: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', userSchema);
