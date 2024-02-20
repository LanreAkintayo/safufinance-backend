const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const basicDetailsSchema = new Schema({
  tokenAddress: { type: String },
  treasuryAddress: { type: String },
  description: { type: String },
  imageDataUrl: { type: String },
});

const profileDetailsSchema = new Schema({
  twitterHandle: { type: String },
  discordHandle: { type: String },
  telegramHandle: { type: String },
  websiteUrl: { type: String },
});

const metricsDetailsSchema = new Schema({
  minimumAmount: { type: String },
  maximumAmount: { type: String },
  insuranceFeePercentage: { type: Number },
  liquidityPercentage: { type: Number },
  penaltyPercentage: { type: Number },
  durations: [{ type: Number }],
  percentages: [{ type: Number }],
});

const projectsSchema = new Schema({
  basicDetails: basicDetailsSchema,
  profileDetails: profileDetailsSchema,
  metricsDetails: metricsDetailsSchema,
  uniqueId: { type: String, unique: true }, // tokenAddress
  owner: { type: String },
  status: { type: Number }, // 0 means pending, 1 means approved, 2 means disapproved, 3 means paused 
  entryDate: { type: Date, default: Date.now },
});

// // Pre-save middleware to increment uniqueId before saving
// projectsSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     // Only increment uniqueId for new documents
//     const lastProject = await this.constructor.findOne({}, {}, { sort: { uniqueId: -1 } });
//     this.uniqueId = lastProject ? lastProject.uniqueId + 1 : 1;
//   }
//   next();
// });

const Projects = mongoose.model("Projects", projectsSchema, "projects");

module.exports = { Projects };
