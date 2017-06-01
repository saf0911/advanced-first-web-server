import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  occupation: String,
  phone: String,
  avatar: String,
});

export default mongoose.model('User', userSchema);
