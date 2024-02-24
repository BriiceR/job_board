const express = require("express");
const Job = require("../model/jobModel");
const Company = require("../model/companyModel");

// Creer une nouvelle annonce
module.exports.createJob = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Obtenir l'ID de la société 
        const companyId = req.company._id;

        // Créer une nouvelle annonce avec les données fournies et l'ID de la société
        const job = await Job.create({
            company: companyId,
            title,
            description,
            createdAt: new Date(),
        });

        // Ajouter l'ID de la nouvelle annonce à la société
        await Company.findByIdAndUpdate(companyId, { $push: { jobs: job._id } });

        // Envoyer une réponse après la création réussie
        console.log("Job created successfully:", job);
        res.status(200).json({ success: true, job });
    } catch (error) {
        // Log l'erreur dans la console
        // console.error("Erreur lors de la création de l'annonce:", error);

        // // Envoyer une seule réponse en cas d'erreur
        // res.status(500).json({
        //     success: false,
        //     error: "Erreur lors de la création de l'annonce",
        // });
    }
};

// Récupérer tous les emplois
module.exports.getAllJobs = async (req, res) => {
    try {
        // Récupérer tous les emplois depuis la base de données
        const jobs = await Job.find().populate("company", "name");

        // Envoyer une réponse avec la liste des emplois
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        // Log l'erreur dans la console
        console.error("Erreur lors de la récupération des emplois:", error);

        // Envoyer une seule réponse en cas d'erreur
        res.status(500).json({
            success: false,
            error: "Erreur lors de la récupération des emplois",
        });
    }
};

// Récupérer tous les emplois par ID de l'entreprise
module.exports.getJobsByCompanyId = async (req, res) => {
    try {
        // Récupérer l'ID de l'entreprise à partir de la requête
        const companyId = req.params.companyId;

        // Récupérer tous les emplois liés à l'ID de l'entreprise depuis la base de données
        const jobs = await Job.find({ company: companyId });
        // console.log("Jobs retrieved successfully:", jobs);
        // Envoyer une réponse avec la liste des emplois
        res.status(200).json({ success: true, jobs });
        
    } catch (error) {
        // Log l'erreur dans la console
        // console.error("Erreur lors de la récupération des emplois par ID de l'entreprise:", error);

        // // Envoyer une réponse en cas d'erreur
        // res.status(500).json({
        //     success: false,
        //     error: "Erreur lors de la récupération des emplois par ID de l'entreprise",
        // });
    }
};

// Récupérer un emploi par ID
module.exports.getJobById = async (req, res) => {
    const jobId = req.params.id;

    // Votre logique pour vérifier si l'ID de l'emploi est valide (si nécessaire)

    try {
        // Trouver l'emploi par ID dans la base de données
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ success: false, error: "Aucun emploi trouvé avec cet ID" });
        }

        // L'emploi a été trouvé avec succès
        res.status(200).json({ success: true, job });
    } catch (error) {
        // Gérer les erreurs lors de la recherche de l'emploi
        console.error("Erreur lors de la recherche de l'emploi par ID:", error);
        res.status(500).json({ success: false, error: "Erreur lors de la recherche de l'emploi par ID" });
    }
};

module.exports.deleteJob = async (req, res) => {
    const { jobId } = req.params;
    
    try {
      // Recherche de l'annonce par ID et suppression
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
        return res.status(404).json({ success: false, message: "Annonce non trouvée" });
        }
      // Si l'annonce est supprimée avec succès
        res.status(200).json({ success: true, message: "Annonce supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'annonce :", error);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'annonce" });
    }
};

module.exports.updateJob = async (req, res) => {
    const { id } = req.params; // ID de l'annonce à mettre à jour
    const { title, description } = req.body; // Nouvelles données de l'annonce
    // console.log(id);
    // console.log(title, description);
    try {
        // Vérifie si l'annonce existe
        const job = await Job.findById(id);
        // console.log(job);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Annonce non trouvée'  });
        }

        // Met à jour les champs de l'annonce
        job.title = title;
        job.description = description;

        // Sauvegarde les modifications dans la base de données
        const updatedJob = await job.save();
        res.status(200).json({ success: true, message: "Annonce mis à jour avec succès", updatedJob });
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code d'erreur et un message
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'annonce" });
    }
};

module.exports.updateJobWithCandidature = async (req, res) => {
    const { id, candidatureId } = req.params; // ID de l'annonce à mettre à jour
    
    try {
      // Vérifie si l'annonce existe
        const job = await Job.findById(id);
        if (!job) {
        return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
        }
      // Vérifie si la candidature existe déjà dans la liste des candidatures de l'annonce
        if (job.applications.includes(candidatureId)) {
        return res.status(400).json({ success: false, message: 'La candidature existe déjà dans la liste des candidatures de cette annonce' });
        }
      // Ajoute l'ID de la candidature à la liste des candidatures de l'annonce
        job.applications.push(candidatureId);
      // Sauvegarde les modifications dans la base de données
        const updatedJob = await job.save();
        res.status(200).json({ success: true, message: "Annonce mise à jour avec succès avec l'ID de la candidature", updatedJob });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse avec le code d'erreur et un message
        console.error("Erreur lors de la mise à jour de l'annonce avec l'ID de la candidature:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'annonce avec l'ID de la candidature" });
    }
};