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