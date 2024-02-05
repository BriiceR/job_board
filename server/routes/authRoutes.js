const { register, login, registerCompany, loginCompany, registerAdmin, loginAdmin } = require("../controllers/authControllers");
const { createJob } = require("../controllers/jobControllers");
const { checkUser, checkCompany, checkAdmin } = require("../middlewares/authMiddleware");
const { checkCompanyId } = require("../middlewares/jobMiddleware");

const router = require("express").Router();

// users routes
router.post("/", checkUser); 
router.post("/register", register);
router.post("/loginUsers", login);

// companies routes
router.post("/companies", checkCompany);
router.post("/registerCompanies", registerCompany);
router.post("/loginCompanies", loginCompany);

// admin routes
router.post("/admin", checkAdmin);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

// jobs routes
router.post("/createJob", checkCompanyId, createJob );
module.exports = router;
