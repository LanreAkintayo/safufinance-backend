const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

// id == 0 --> basic
// id == 1 --> profile
// id ==2 --> metrics
// uniqueId is the tokenAddress

router.post("/projects/:owner/:uniqueId/:id", async (req, res) => {
  const projects = schemas.Projects;

  const { id, uniqueId, owner } = req.params;

  if (id == 0) {
    // This is the basic details
    const { tokenAddress, treasuryAddress, description, imageDataUrl } =
      req.body;

    const basicData = {
      tokenAddress,
      treasuryAddress,
      description,
      imageDataUrl,
    };

    try {
      // Find and delete the existing project with the matching creator
      const result = await projects.findOneAndUpdate(
        { uniqueId: uniqueId, owner: owner },
        { $set: { basicDetails: basicData } },
        { new: true, upsert: true } // To return the updated document
      );

      res.status(200).json({
        message: "Basic details updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error storing/updating project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (id == 1) {
    // profile details
    const {
      creator,
      twitterHandle,
      telegramHandle,
      discordHandle,
      websiteUrl,
    } = req.body;

    const profileData = {
      creator,
      twitterHandle,
      discordHandle,
      telegramHandle,
      websiteUrl,
    };

    try {
      // Find and delete the existing project with the matching creator
      const result = await projects.findOneAndUpdate(
        { uniqueId: uniqueId, owner: owner },
        { $set: { profileDetails: profileData } },
        { new: true }, // To return the updated document
        { upsert: true }
      );

      res.status(200).json({
        message: "Basic details updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error storing/updating project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (id == 2) {
    // metric details
    // profile details
    const {
      minimumAmount,
      maximumAmount,
      insuranceFeePercentage,
      liquidityPercentage,
      penaltyPercentage,
      durations,
      percentages,
    } = req.body;

    const metricsData = {
      minimumAmount,
      maximumAmount,
      insuranceFeePercentage,
      liquidityPercentage,
      penaltyPercentage,
      durations,
      percentages,
    };

    try {
      // Find and delete the existing project with the matching creator
      const result = await projects.findOneAndUpdate(
        { uniqueId: uniqueId, owner: owner },
        { $set: { metricsDetails: metricsData } },
        { new: true }, // To return the updated document
        { upsert: true }
      );

      res.status(200).json({
        message: "Basic details updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error storing/updating project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Just create a new document having uniqueId = "new". That's all
    const newData = {
      uniqueId: `new${owner}`,
      owner: owner,
      status: -1,
      basicDetails: {},
      profileDetails: {},
      metricsDetails: {},
      
    };

    try {
      const result = await projects.findOneAndUpdate(
        { uniqueId: uniqueId, owner: owner }, 
        { $set: newData },
        { new: true, upsert: true } // To return the updated document
      );

      res.status(200).json({
        message: "New project created successfully",
        project: result,
      });
    } catch (error) {
      console.error("Error creating new project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.get("/projects/:owner/:uniqueId", async (req, res) => {
  // const creatorParam = req.params.creator;
  const { uniqueId, owner } = req.params;
  const projects = schemas.Projects;

  try {
    // Use Mongoose to find projects with the specified creator
    const projectData = await projects.find({
      uniqueId: uniqueId,
      owner: owner,
    });

    // if (projectData.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No project found for the specified creator." });
    // }

    res.status(200).json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/projects/:owner", async (req, res) => {
  const { owner } = req.params;

  const projects = schemas.Projects;

  try {
    // Use Mongoose to find projects with the specified creator
    const projectData = await projects.find({ owner: owner });

    // if (projectData.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No project found for the specified creator." });
    // }

    res.status(200).json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
