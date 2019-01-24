const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }],
    others: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
  }
);
attendanceSchema.virtual('total').get(function () {
  return this.visitors.length + this.others;
});

module.exports = mongoose.model('Attendance', attendanceSchema);