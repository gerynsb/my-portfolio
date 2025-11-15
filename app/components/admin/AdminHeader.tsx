export default function AdminHeader({ title }: { title: string }) {
  return (
    <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
