// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header className="bg-gray-800 text-white p-4">
//       <nav className="flex justify-between items-center max-w-6xl mx-auto">
//         <Link href="/" className="text-2xl font-bold">
//           Tinnitus Tees
//         </Link>
//         <div className="space-x-4">
//           <Link href="/" className="hover:underline">
//             Home
//           </Link>
//           <Link href="/products" className="hover:underline">
//             Products
//           </Link>
//           <Link href="/cart" className="hover:underline">
//             Cart
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }



// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header className="bg-amber-950 text-white p-4">
//       <nav className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto space-y-2 sm:space-y-0">
//         <Link href="/" className="text-xl sm:text-2xl font-bold">
//           Tinnitus Tees
//         </Link>
//         <div className="flex space-x-4">
//           <Link href="/" className="hover:underline text-sm sm:text-base">
//             Home
//           </Link>
//           <Link href="/products" className="hover:underline text-sm sm:text-base">
//             Products
//           </Link>
//           <Link href="/cart" className="hover:underline text-sm sm:text-base">
//             Cart
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }



import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-amber-950 text-white p-4">
      <nav className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto space-y-2 sm:space-y-0">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          Tinnitus Tees
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline text-sm sm:text-base">
            Home
          </Link>
          <Link href="/products" className="hover:underline text-sm sm:text-base">
            Products
          </Link>
          <Link href="/about" className="hover:underline text-sm sm:text-base">
            About
          </Link>
          <Link href="/cart" className="hover:underline text-sm sm:text-base">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}