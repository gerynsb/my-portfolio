import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { ObjectId } from 'mongodb';
import { categorySchema } from '@/app/lib/validation/category';
import { slugify } from '@/app/lib/slugify';

// GET - Get single article category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();
    const category = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .findOne({ _id: new ObjectId(id) });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PATCH - Update article category
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    const db = await getDatabase();
    const slug = slugify(validatedData.name);

    // Check if slug already exists (excluding current category)
    const existing = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .findOne({ slug, _id: { $ne: new ObjectId(id) } });

    if (existing) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 400 }
      );
    }

    const result = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...validatedData,
            slug,
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating category:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete article category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();

    // Check if category is being used by any articles
    const articlesCount = await db
      .collection(COLLECTIONS.ARTICLES)
      .countDocuments({ categoryId: id });

    if (articlesCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category. ${articlesCount} articles are using it.` },
        { status: 400 }
      );
    }

    const result = await db
      .collection(COLLECTIONS.ARTICLE_CATEGORIES)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
