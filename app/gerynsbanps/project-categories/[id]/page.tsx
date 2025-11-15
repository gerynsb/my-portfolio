import CategoryForm from '@/app/components/admin/forms/ProjectCategoryForm';
import AdminHeader from '@/app/components/admin/AdminHeader';

export default async function EditProjectCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <AdminHeader title="Edit Project Category" />
      <div className="p-8">
        <CategoryForm
          id={id}
          apiEndpoint="/api/project-categories"
          redirectPath="/gerynsbanps/project-categories"
          title="Project Category"
        />
      </div>
    </div>
  );
}
