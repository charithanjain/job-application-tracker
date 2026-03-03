const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Applied",
    },

    followUpDate: { type: Date },

    notes: { type: String },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
