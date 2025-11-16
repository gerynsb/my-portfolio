import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { experienceSchema } from '@/app/lib/validation/experience';
import { revalidateHomePage } from '@/app/lib/revalidate';

// GET - List all experiences
export async function GET() {
  try {
    const db = await getDatabase();
    const experiences = await db
      .collection(COLLECTIONS.EXPERIENCES)
      .find({})
      .sort({ order: 1, startDate: -1 })
      .toArray();

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = experienceSchema.parse(body);

    const db = await getDatabase();
    const result = await db.collection(COLLECTIONS.EXPERIENCES).insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const experience = await db
      .collection(COLLECTIONS.EXPERIENCES)
      .findOne({ _id: result.insertedId });

    // Auto-revalidate homepage for real-time updates
    revalidateHomePage();

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
