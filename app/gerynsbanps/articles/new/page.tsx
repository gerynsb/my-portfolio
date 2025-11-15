import ArticleForm from '@/app/components/admin/forms/ArticleForm';

export default function NewArticlePage() {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Create New Article</h1>
        <ArticleForm />
      </div>
    </div>
  );
}