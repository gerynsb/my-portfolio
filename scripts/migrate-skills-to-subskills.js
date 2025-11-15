// Script to migrate existing skills to new format with sub-skills
// Run with: node scripts/migrate-skills-to-subskills.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function migrateSkills() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME);
    const skillsCollection = db.collection('skills');
    
    // Get all skills
    const skills = await skillsCollection.find({}).toArray();
    console.log(`\nFound ${skills.length} skills to migrate`);
    
    let migratedCount = 0;
    
    for (const skill of skills) {
      // Skip if already has skills array
      if (skill.skills && skill.skills.length > 0) {
        console.log(`✓ "${skill.title}" already migrated`);
        continue;
      }
      
      // Convert old format to new format
      // Create a sub-skill from the title with the rating
      const subSkill = {
        name: skill.title,
        rating: skill.rating || 3
      };
      
      await skillsCollection.updateOne(
        { _id: skill._id },
        { 
          $set: { 
            skills: [subSkill],
            description: skill.description || ''
          } 
        }
      );
      
      migratedCount++;
      console.log(`✓ Migrated "${skill.title}" → [${subSkill.name}: ${subSkill.rating} stars]`);
    }
    
    console.log(`\n✅ Migration complete! Migrated ${migratedCount} skills`);
    
    // Show final state
    const updatedSkills = await skillsCollection.find({}).toArray();
    console.log('\n📋 Final Skills Structure:');
    updatedSkills.forEach(skill => {
      console.log(`\n  ${skill.title}:`);
      if (skill.skills && skill.skills.length > 0) {
        skill.skills.forEach(s => {
          console.log(`    - ${s.name}: ${'⭐'.repeat(s.rating)} (${s.rating}/5)`);
        });
      } else {
        console.log('    (no sub-skills)');
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

migrateSkills();
