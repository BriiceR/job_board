const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

companySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

companySchema.statics.login = async function (email, password) {
  const company = await this.findOne({ email });
  if (company) {
    const auth = await bcrypt.compare(password, company.password);
    if (auth) {
      return company;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Company", companySchema);
