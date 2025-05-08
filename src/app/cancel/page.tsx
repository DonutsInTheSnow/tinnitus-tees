import Link from 'next/link';

export default function Cancel() {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-bold">Payment Canceled</h1>
        <p>Your payment was canceled. Return to the products page and try again.</p>
        <Link href="/">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Back to Products Page
          </button>
        </Link>
      </main>
    );
  }