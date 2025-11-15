import CategoryForm from '@/app/components/admin/forms/ArticleCategoryForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function NewArticleCategoryPage() {
  return (
    <div>
      <AdminHeader title="New Article Category" />
      <div className="p-8">
        <CategoryForm
          apiEndpoint="/api/article-categories"
          redirectPath="/admin/article-categories"
          title="Article Category"
        />
      </div>
    </div>
  );
}
