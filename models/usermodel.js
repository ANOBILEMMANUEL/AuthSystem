const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,

  },

  username: {          // 1. ADD THIS FIELD
    type: String,
    required: true // Set to true if it's mandatory during signup
  }

});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);

