const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProposalSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
    },
    status: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
    points: {
      type: Number,
      default: -1,
    },
  },
  { timestamps: true }
);
module.exports = Task = mongoose.model('proposals', ProposalSchema);
