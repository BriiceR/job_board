const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Modèle d'annonce
const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidature",
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
