const { Schema, model } = require('mongoose');
const { compareSync, hashSync } = require('bcryptjs');

const MovieSchema = new Schema({
  imdbID: {
    type: String,
    default: null
  },
  Title: {
    type: String,
    default: null
  },
  Year: {
    type: String,
    default: null
  },
  Genre: {
    type: String,
    default: null
  },
  Plot: {
    type: String,
    default: null
  },
  Country: {
    type: String,
    default: null
  },
  Runtime: {
    type: String,
    default: null
  },
  imdbRating: {
    type: String,
    default: null
  }
});




const UserSchema = new Schema({
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    validate: {
      validator: email => User.doesNotExist({ email }),
      message: "Email already exists"
    }
  },
  password: {
    type: String,
    select: false
  },
  movies: [MovieSchema]
},{timestamps: true});



UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = model('User', UserSchema);

const create = async (user) => {
  try {
    const userModal = new User(user);
    const newUser = await userModal.save();
    return newUser;
  } catch(err) {
    throw new Error("User creation failed");
  }
};

const findByEmail = async (email) => {
  try {
    const result = await User.findOne({email}).select("+password");
    return result;
  } catch(err) {
    throw new Error({
      code: 500,
      message: "Couldn't find user by email"
    })
  }
};

const findByUsername = async username => {
  try {
    const result = await User.findOne({username}).select("+password");
    return result;
  } catch(err) {
    throw new Error({
      code: 500,
      message: "Couldn't find user by username"
    })
  }
  
};

const findById = async (userId) => {
  try {
    const result = await User.findOne({'_id': userId});
    return result;
  } catch(err) {
    throw new Error({
      code: 500,
      message: "Couldn't find user by email"
    })
  }
};

const addMovie = async (userId, movie) => {
  try {
    const updatedUser = await User.findOneAndUpdate({'_id': userId}, {$push: {movies: movie}}, {new: true});
    return updatedUser;
  } catch(err) {
    console.log(err);
    throw new Error("Failed to add movie");
  }
};

const getMovies = async (userId) => {
  try {
    const user = await User.findOne({'_id': userId});
    return user.movies;
  } catch(err) {
    console.log(err)
    throw new Error("Failed to get movies");
  }
};

module.exports = {
  Modal: User,
  create,
  findByEmail,
  findByUsername,
  findById,
  addMovie,
  getMovies
};
