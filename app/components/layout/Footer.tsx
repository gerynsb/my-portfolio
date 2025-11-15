export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {currentYear} My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
