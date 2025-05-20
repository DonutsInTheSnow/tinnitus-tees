import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-lime-950 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p>Tinnitus Tees</p>
          <p>123 Main St, Poughkeepsie, NY 12601</p>
          <p>Email: contact@tinnitustees.com</p>
          <p>Phone: (845) 555-1234</p>
        </div>
        <div>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}