// Script to add default ratings to existing skills
// Run with: node scripts/add-skill-ratings.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function addRatings() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME);
    const skillsCollection = db.collection('skills');
    
    // Update all skills without rating field
    const result = await skillsCollection.updateMany(
      { rating: { $exists: false } },
      { $set: { rating: 3 } }
    );
    
    console.log(`Updated ${result.modifiedCount} skills with default rating of 3`);
    
    // Show all skills with their ratings
    const skills = await skillsCollection.find({}).toArray();
    console.log('\nAll skills:');
    skills.forEach(skill => {
      console.log(`- ${skill.title}: ${skill.rating || 'no rating'} stars`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

addRatings();
