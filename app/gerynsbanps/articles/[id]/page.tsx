import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import ArticleForm from '@/app/components/admin/forms/ArticleForm';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDatabase();
  
  const article = await db
    .collection(COLLECTIONS.ARTICLES)
    .findOne({ _id: new ObjectId(id) });

  if (!article) {
    notFound();
  }

  const articleData = {
    ...article,
    _id: article._id.toString(),
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Edit Article</h1>
        <ArticleForm article={articleData} />
      </div>
    </div>
  );
}