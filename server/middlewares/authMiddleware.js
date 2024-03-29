const User = require("../model/authModel");
const Company = require("../model/companyModel");
const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "kishan sheth super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName, diploma: user.diploma });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports.checkCompany = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "kishan sheth super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const company = await Company.findById(decodedToken.id);
          // console.log("Company found:");
          if (company) {
            req.company = company;
            res.json({ status: true, company: company.email, id: company._id, name: company.name });
            // console.log("ok company")
          } else {
            res.json({ status: false });
          }

        next();
        }
      }
    );
  } else {
    console.log("No token found");
    res.json({ status: false });
    next();
  }
};

module.exports.checkAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "kishan sheth super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const admin = await Admin.findById(decodedToken.id);

          if (admin) {
            res.json({ status: true, admin: admin.email });
          } else {
            res.json({ status: false });
          }

          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};

