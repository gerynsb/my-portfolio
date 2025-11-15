import CategoryForm from '@/app/components/admin/forms/ProjectCategoryForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default function NewProjectCategoryPage() {
  return (
    <div>
      <AdminHeader title="New Project Category" />
      <div className="p-8">
        <CategoryForm
          apiEndpoint="/api/project-categories"
          redirectPath="/admin/project-categories"
          title="Project Category"
        />
      </div>
    </div>
  );
}
