export default function AdminHeader({ title }: { title: string }) {
  return (
    <div className="bg-white border-b px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
