import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { categorySchema } from '@/app/lib/validation/category';
import { slugify } from '@/app/lib/slugify';

// GET - List all article categories
export async function GET() {
  try {
    const db = await getDatabase();
    const categories = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .find({})
      .sort({ order: 1, name: 1 })
      .toArray();

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching article categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new article category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    const db = await getDatabase();
    const slug = slugify(validatedData.name);

    // Check if slug already exists
    const existing = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .findOne({ slug });

    if (existing) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 400 }
      );
    }

    const result = await db.collection(COLLECTIONS.ARTICLE_CATEGORIES).insertOne({
      ...validatedData,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const category = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .findOne({ _id: result.insertedId });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating article category:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
