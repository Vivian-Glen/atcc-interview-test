const mongoose = require('mongoose');
const Business = require('../models/Business');

mongoose.connect('mongodb://localhost:27017/atcc-website')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const sampleBusinesses = [
    {
        businessName: "Tamil Spice Restaurant",
        ownerName: { firstName: "Raj", lastName: "Kumar" },
        contactInfo: { phone: "416-555-0123", email: "info@tamilspice.ca", website: "https://tamilspice.ca" },
        location: { address: "123 Main Street", city: "Toronto", province: "Ontario", postalCode: "M5V 3A8" },
        category: "restaurant",
        description: "Authentic Tamil cuisine",
        services: ["Dine-in", "Takeout", "Catering"],
        isActive: true
    },
    {
        businessName: "TechTamil Solutions",
        ownerName: { firstName: "Priya", lastName: "Sharma" },
        contactInfo: { phone: "604-555-0456", email: "contact@techtamil.ca", website: "https://techtamil.ca" },
        location: { address: "456 Tech Drive", city: "Vancouver", province: "British Columbia", postalCode: "V6B 1A1" },
        category: "technology",
        description: "IT consulting and software development",
        services: ["Web Development", "Mobile Apps"],
        isActive: true
    }
];

async function seed() {
    try {
        await Business.deleteMany({});
        await Business.insertMany(sampleBusinesses);
        console.log('Sample businesses added!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
}

seed();
