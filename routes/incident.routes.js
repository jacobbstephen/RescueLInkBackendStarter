const express = require("express");
const router = express.Router();

const incidentModel = require("../models/incident.model");
const authMiddleware = require("../middlewares/auth");

router.post("/report", authMiddleware, async (req, res) => {
  try {
    const {user, file,longitude, latitude} = req.body;
    if(!user || !file || !longitude || !latitude){
        return res.status(400).json({
            message: 'Missing Data'
        });
    }

    const filePath = file.path;

    const incidentReport = await incidentModel.create({

    });
    //  Logic for reteriving users within the radius of user reporting the incident


    res.status(200).json({
        message: 'Incident reported Successfully'
    })
  } catch (err) {
    console.error("Error during user reporting:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
