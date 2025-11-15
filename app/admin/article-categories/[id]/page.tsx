import CategoryForm from '@/app/components/admin/forms/ArticleCategoryForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default async function EditArticleCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <AdminHeader title="Edit Article Category" />
      <div className="p-8">
        <CategoryForm
          id={id}
          apiEndpoint="/api/article-categories"
          redirectPath="/admin/article-categories"
          title="Article Category"
        />
      </div>
    </div>
  );
}
