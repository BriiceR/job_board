const express = require("express");
const Job = require("../model/jobModel");
const Company = require("../model/companyModel");

module.exports.createJob = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Obtenir l'ID de la société (ou de l'utilisateur connecté) - vous devez implémenter cela selon votre logique d'authentification
        const companyId = req.company._id;

        // Créer une nouvelle annonce avec les données fournies et l'ID de la société
        const job = await Job.create({
            company: companyId,
            title,
            description,
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

