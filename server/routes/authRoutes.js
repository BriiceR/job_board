const { register, login, registerCompany, loginCompany, registerAdmin, loginAdmin, updateCompanyName } = require("../controllers/authControllers");
const { createJob, getAllJobs, getJobsByCompanyId, getJobById, deleteJob, updateJob } = require("../controllers/jobControllers");
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
router.put("/companies/:companyId/updateName", updateCompanyName); 


// admin routes
router.post("/admin", checkAdmin);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

// jobs routes
router.post("/createJob", checkCompanyId, createJob );
// Route pour obtenir tous les emplois
router.get("/jobs", getAllJobs);
// Route pour obtenir les emplois par ID de la société
router.get("/jobs/company/:companyId", checkCompanyId, getJobsByCompanyId);
// Route pour obtenir un emploi par ID
router.get("/jobs/:id", getJobById);
// Supprimer une annonce
router.delete('/deleteJob/:jobId', deleteJob);
// Modifier une annonce
router.put("/jobs/:id", updateJob);

module.exports = router;
