const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please Input UserName!"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please Input Email!"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("Please Provide a valid email address !");
        }
      },
    },
    role: {
      type: String,
      enum: ["admin", "owner"],
      default: "owner",
    },
    password: {
      type: String,
      required: [true, "Please Input Password!"],
      minlength: 7, //minimun 7 pass
      trim: true,
    },
    passwordComfirm: {
      type: String,
      trim: true,
      required: [true, "Please Input Password Comfirmation!"],
      validate(value) {
        if (this.password !== this.passwordComfirm) {
          return true;
        }
      },
    },
    tokens: [
      {
        token: { type: String },
      },
    ],
  },
  { timestamps: true }
);
// Generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "Frensia", {
    expiresIn: "1d", //waktu exp
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
// custom json convert
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.passwordComfirm;
  delete userObject.tokens;

  return userObject;
};
// Login cek
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("User Not Found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("Wrong Password");
  }
  // ini kalau benar
  return user;
};
// Hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if (user.isModified("passwordComfirm")) {
    user.passwordComfirm = await bcrypt.hash(user.passwordComfirm, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

