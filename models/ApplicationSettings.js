const mongoose = require("mongoose");

const ApplicationAPISettingsSchema = new mongoose.Schema(
  {
    fetchCronJobEnabled: { type: Boolean },
    fetchDate: { type: String },
    fetchDay: { type: String },
    fetchHour: { type: String },
    fetchMinute: { type: String },
    fetchFrequency: { type: String, enum: ["dayly", "weekly", "monthly"] },
    isFetching: { type: Boolean },

    availableCronjobEnabled: { type: Boolean },
    availableDate: { type: String },
    availableDay: { type: String },
    availableHour: { type: String },
    availableMinute: { type: String },
    availableFrequency: { type: String, enum: ["dayly", "weekly", "monthly"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ApplicationAPISettings",
  ApplicationAPISettingsSchema
);
