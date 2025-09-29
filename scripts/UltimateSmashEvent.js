const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Event = require('../models/Event');

const addEvent = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const ultimateSmash = new Event({
      title: "Ultimate Smash - Doubles Badminton Tournament 🏸",
      description: "Exciting doubles badminton tournament featuring Men’s, Women’s & Mixed Doubles. Trophies, giveaways, and surprising cash rewards! Play, win, and network with fellow badminton enthusiasts.",
      startDate: new Date("2025-10-04"),
      endDate: new Date("2025-10-05"),
      location: { city: "Mississauga", province: "ON", address: "Smash Sports" },
      status: "upcoming",
      categories: ["Men’s Doubles", "Women’s Doubles", "Mixed Doubles"],
      registrationFee: {
        firstEvent: 40,
        additionalEvents: 20,
        currency: "CAD"
      },
      registrationDeadline: new Date("2025-09-26"),
      registrationLink: "https://form.jotform.com/smash_sports/ultimate-smash--badmintontournament",
      contact: "DM on Instagram for queries",
      sponsorshipContact: "647-713-3773",
      organizer: null // or set to a User ObjectId if available
    });

    await ultimateSmash.save();
    console.log("Ultimate Smash event added with full details!");

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

addEvent();
