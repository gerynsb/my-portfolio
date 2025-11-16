import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { skillSchema } from '@/app/lib/validation/skill';
import { revalidateHomePage } from '@/app/lib/revalidate';

// GET - List all skills
export async function GET() {
  try {
    const db = await getDatabase();
    const skills = await db
      .collection(COLLECTIONS.SKILLS)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = skillSchema.parse(body);

    const db = await getDatabase();
    const skillData: any = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTIONS.SKILLS).insertOne(skillData);

    const skill = await db
      .collection(COLLECTIONS.SKILLS)
      .findOne({ _id: result.insertedId });

    // Auto-revalidate homepage for real-time updates
    revalidateHomePage();

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
