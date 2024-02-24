const User = require("../model/authModel");
const Company = require("../model/companyModel");
const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.registerCompany = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const company = await Company.create({ email, password });
    const token = createToken(company._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ company: company._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.login(email, password);
    const token = createToken(company._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ company: company._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.updateCompanyName = async (req, res) => {
  const { name } = req.body;
  const { companyId } = req.params;
  // console.log(name, companyId);
  try {
    const company = await Company.findByIdAndUpdate(companyId, { name });
    res.status(200).json({ company: company._id, status: true, success: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
}

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.create({ email, password });
    const token = createToken(admin._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ admin: admin._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ admin: admin._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.updateUser = async (req, res) => {
  const { firstName, lastName, diploma } = req.body;
  const { userId } = req.params;
  // console.log(firstName, lastName, diploma, userId);
  try {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, diploma });
    res.status(200).json({ user: user._id, status: true, success: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
}

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  try {
    const user = await User.findById(userId);
    res.status(200).json({ status: true, success: true, firstName: user.firstName, lastName: user.lastName, diploma: user.diploma });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
}