const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  location: {
    city: String,
    province: String
  },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  organizer: {
    firstName: String,
    lastName: String
  },
  registrationLink: String
});

module.exports = mongoose.model('Event', EventSchema);
