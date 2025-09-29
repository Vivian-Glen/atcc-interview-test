require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/atcc-website';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const seedBlogs = async () => {
    await connectDB();

    // Find or create admin user
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
        admin = new User({
            firstName: 'ATCC',
            lastName: 'Admin',
            username: 'admin',
            email: 'admin@atcccanada.org',
            password: 'password123', // You can hash it if auth is required
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created');
    }
    const blogsData = [
        {
            title: 'BBQ & Networking Event in Mississauga',
            slug: 'bbq-networking-event-mississauga',
            excerpt: 'Join us for an unforgettable BBQ and networking event hosted by ATCC! Enjoy food, drinks, games, and music while connecting with our community.',
            content: `Enjoy complimentary food, drinks, dance and fun-filled ice-breaking games with music in the park while connecting with fellow community members.\n\nLocation: Mississauga Valley Park\nDate: June 15 (Saturday)\nTime: 12pm to 7pm\nLunch time: 1pm to 3pm\nTicket price: $20 (includes complimentary food and drinks)\nFree ticket for kids below 10 (ID required)\nMore details at Ticket Booking Website\nEnquiry for sponsorship - DM or contact +16477133773 (Ajay) or reachatcc@gmail.com`,
            category: 'events',
            tags: ['BBQ', 'Networking', 'Community', 'ATCC'],
            status: 'published',
            featuredImage: '/img/bbq-event.jpg',
            author: admin._id
        },
        {
            title: 'Tamil Cultural Dance Workshop',
            slug: 'tamil-cultural-dance-workshop',
            excerpt: 'Learn traditional Tamil dance moves with experienced instructors in our community workshop.',
            content: `Join us for a day of dance and cultural immersion. Open to all ages and experience levels.\n\nLocation: Community Hall, Mississauga\nDate: July 10, 2025\nTime: 10am to 4pm`,
            category: 'culture',
            tags: ['Dance', 'Tamil', 'Workshop', 'Culture'],
            status: 'published',
            featuredImage: '/img/dance-workshop.jpg',
            author: admin._id
        },
        {
            title: 'Volunteer Opportunities in Tamil Community',
            slug: 'volunteer-opportunities-tamil-community',
            excerpt: 'Get involved with ATCC and make a difference in the Tamil Canadian community.',
            content: `ATCC is seeking volunteers for upcoming events and projects. Gain experience, network, and contribute to the community.\n\nContact: volunteer@atcccanada.org`,
            category: 'community',
            tags: ['Volunteer', 'Community', 'ATCC'],
            status: 'published',
            featuredImage: '/img/volunteer.jpg',
            author: admin._id
        }
    ];

    for (const blogData of blogsData) {
        const existing = await Blog.findOne({ slug: blogData.slug });
        if (!existing) {
            const blog = new Blog(blogData);
            await blog.save();
            console.log(`Blog created: ${blog.title}`);
        } else {
            console.log(`Blog already exists: ${existing.title}`);
        }
    }

    console.log('Seeding completed');
    mongoose.connection.close();
};

seedBlogs();
