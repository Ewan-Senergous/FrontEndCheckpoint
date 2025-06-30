import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Checkpoint : frontend</h1>
        <Link to="/" className="text-xl hover:underline">
          Countries
        </Link>
      </div>
    </header>
  );
}
