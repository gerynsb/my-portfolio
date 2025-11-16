import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { settingsSchema } from '@/app/lib/validation/settings';
import { revalidateHomePage } from '@/app/lib/revalidate';

// GET - Fetch site settings
export async function GET() {
  try {
    const db = await getDatabase();
    const settings = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({});
    
    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        heroGreeting: "Hi, I'm",
        heroTitle: 'Welcome to My Portfolio',
        heroSubtitle: 'Full Stack Developer & Designer',
        aboutTitle: 'About Me',
        aboutBody: 'Add your about me content here...',
        contactEmail: 'your@email.com',
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update or create site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = settingsSchema.parse(body);

    const db = await getDatabase();
    const result = await db.collection(COLLECTIONS.SITE_SETTINGS).findOneAndUpdate(
      {},
      {
        $set: {
          ...validatedData,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );

    // Auto-revalidate for real-time updates
    revalidateHomePage();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating settings:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
