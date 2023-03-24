const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, "username bắt buộc phải có"],
      trim: true,
    },
    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      required: [true, "email bắt buộc phải có"],
      validate: [validator.isEmail, " vui lòng nhập email đúng định dạng"],
    },
    password: {
      type: String,
      required: [true, "password bắt buộc phải có"],
      minlength: 6,
      select: false,
    },
    confirmpassword: {
      type: String,
      required: [true, "confirmpassword bắt buộc phải có"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "xác nhận mật khẩu không chính xác",
      },
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
User.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// User.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password")) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();
// });
// User.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
module.exports = mongoose.model("User", User);
