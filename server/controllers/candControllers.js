const express = require("express");
const router = express.Router();
const Job = require("../model/jobModel");
const Cand = require("../model/candModel");

// Route pour la création d'une candidature
module.exports.handleApply = async (req, res) => {
    // console.log("req.body:", req.body);
    const { jobId } = req.body;
    const { userId } = req.body; 

    try {
    // Vérifier si l'emploi existe
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ success: false, message: "L'emploi n'existe pas" });
    }

    // Créer une nouvelle candidature
    const candidature = new Cand({
        user: userId,
        job: jobId
    });
    await candidature.save();

    res.status(201).json({ success: true, id: candidature._id });
    } catch (error) {
    console.error("Erreur lors de la création de la candidature :", error);
    res.status(500).json({ success: false, message: "Erreur serveur interne" });
    }
};

module.exports.getCandidatureStatus = async (req, res) => {
    const { jobId, userId } = req.params;

    try {
        // Recherche de la candidature correspondante
        const candidature = await Cand.findOne({ user: userId, job: jobId });
        
        if (!candidature) {
            // Au lieu de renvoyer un code d'état 404, renvoyer une réponse avec un message indiquant qu'aucune candidature n'a été trouvée
            return res.status(200).json({ success: false, message: "Aucune candidature trouvée pour cet utilisateur et cet emploi" });
        }

        // Renvoyer le statut de la candidature
        res.status(200).json({ success: true, status: candidature.status });
    } catch (error) {
        console.error("Erreur lors de la récupération du statut de la candidature :", error);
        res.status(500).json({ success: false, message: "Erreur serveur interne" });
    }
};

module.exports.getCandidature = async (req, res) => {
    const { candidatureId } = req.params;
    try {
        const candidature = await Cand.findById(candidatureId);
        if (!candidature) {
            return res.status(404).json({ success: false, message: "Candidature non trouvée" });
        }
        res.status(200).json({ success: true, candidature });
    } catch (error) {
        console.error("Erreur lors de la sélection de la candidature :", error);
        res.status(500).json({ success: false, message: "Erreur serveur interne" });
    }
};

module.exports.updateCandidature = async (req, res) => {
    const { candidatureId } = req.params;
    const { status } = req.body;

    try {
        const updatedCandidature = await Cand.findByIdAndUpdate(candidatureId, { status }, { new: true });

        if (!updatedCandidature) {
            return res.status(404).json({ success: false, message: "Candidature non trouvée" });
        }

        res.status(200).json({ success: true, candidature: updatedCandidature });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la candidature :", error);
        res.status(500).json({ success: false, message: "Erreur serveur interne" });
    }
};




