const Job = require("../models/Job");

// Add job
exports.addJob = async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, userId: req.user.id });
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { returnDocument: "after" },
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
