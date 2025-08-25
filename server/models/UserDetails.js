const mongoose = require('mongoose');

// Create a schema for user details
const userDetailsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, // Ensuring email is unique
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'] // Email format validation
  },
  address: { 
    type: String, 
    required: true 
  },
  school: { 
    type: String, 
    required: true 
  },
  studentClass: { 
    type: String, 
    required: true 
  },
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create and export the model
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;
