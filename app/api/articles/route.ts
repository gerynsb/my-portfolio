import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { articleSchema } from '@/app/lib/validation/article';
import { slugify } from '@/app/lib/slugify';

// GET - List all articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const published = searchParams.get('published');

    const db = await getDatabase();
    const query: any = {};

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (published === 'true') {
      query.published = true;
    }

    const articles = await db
      .collection(COLLECTIONS.ARTICLES)
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    // Populate category names
    const articlesWithCategories = await Promise.all(
      articles.map(async (article) => {
        const category = await db
          .collection(COLLECTIONS.ARTICLE_CATEGORIES)
          .findOne({ _id: article.categoryId });
        return {
          ...article,
          categoryName: category?.name || 'Uncategorized',
        };
      })
    );

    return NextResponse.json(articlesWithCategories);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = articleSchema.parse(body);

    const db = await getDatabase();
    const slug = slugify(validatedData.title);

    // Check if slug already exists
    const existing = await db
      .collection(COLLECTIONS.ARTICLES)
      .findOne({ slug });

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const articleData: any = {
      ...validatedData,
      slug: finalSlug,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Set publishedAt if published is true
    if (validatedData.published) {
      articleData.publishedAt = new Date();
    }

    const result = await db.collection(COLLECTIONS.ARTICLES).insertOne(articleData);

    const article = await db
      .collection(COLLECTIONS.ARTICLES)
      .findOne({ _id: result.insertedId });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
