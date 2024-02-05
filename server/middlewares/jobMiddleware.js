const User = require("../model/authModel");
const Company = require("../model/companyModel");
const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");


module.exports.checkCompanyId = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(
        token,
        "kishan sheth super secret key",
        async (err, decodedToken) => {
            if (err) {
            console.error("Error in checkCompanyId middleware:", err);
            res.json({ status: false });
            } else {
            const company = await Company.findById(decodedToken.id);
            if (company) {
                req.company = company;
                res.json({ status: true, company: company.email });
            } else {
                res.json({ status: false });
            }
            }
            next();
        }
        );
    } else {
        console.log("No token found");
        res.json({ status: false });
        next();
    }
};