const { register, login, registerCompany, loginCompany } = require("../controllers/authControllers");
const { checkUser, checkCompany } = require("../middlewares/authMiddleware");

const router = require("express").Router();

// users routes
router.post("/", checkUser); 
router.post("/register", register);
router.post("/loginUsers", login);

// companies routes
router.post("/companies", checkCompany);
router.post("/registerCompanies", registerCompany);
router.post("/loginCompanies", loginCompany);

module.exports = router;
