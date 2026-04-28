const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['call', 'email', 'meeting', 'note', 'other'],
      default: 'note',
    },
    subject: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    address: { type: String, trim: true },
    status: {
      type: String,
      enum: ['active', 'inactive', 'churned'],
      default: 'active',
    },
    totalRevenue: { type: Number, default: 0 },
    notes: { type: String, trim: true },
    interactions: [interactionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
