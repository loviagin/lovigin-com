import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['website', 'mobile', 'custom', 'support'],
  },
  websiteType: {
    type: String,
    enum: ['landing', 'corporate', 'shop', null],
  },
  mobilePlatforms: [{
    type: String,
    enum: ['ios', 'android'],
  }],
  customDescription: String,
  supportPeriod: {
    type: String,
    enum: ['month', 'half-year', 'year', null],
  },
  supportMonths: Number,
  options: {
    type: Map,
    of: Number,
  },
  extras: [String],
  brief: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  additionalInfo: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  files: [String],
  contact: {
    name: String,
    email: String,
    messenger: String,
    messengerType: {
      type: String,
      enum: ['telegram', 'whatsapp', 'viber'],
    },
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema); 