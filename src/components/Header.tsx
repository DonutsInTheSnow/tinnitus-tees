import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Tinnitus Tees
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}