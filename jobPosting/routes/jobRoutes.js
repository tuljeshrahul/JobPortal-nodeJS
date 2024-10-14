const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const job = new Job({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        salary: req.body.salary,
        company: req.body.company,
        experience: req.body.experience,
        skills: req.body.skills
    });

    try {
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
