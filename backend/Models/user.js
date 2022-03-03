const mongoose = require("mongoose");
var uuid = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    salt: String,
    encrypted_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.encrypted_password = this.securePassword(password);
  });

userSchema.methods = {
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha512", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (password) {
    return this.securePassword(password) === this.encrypted_password;
  },
};

module.exports = mongoose.model("User", userSchema);
