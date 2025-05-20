import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="relative h-screen w-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-[-10]"
        >
          <source src="/videos/sea-drone-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/50 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
            Welcome to Tinnitus Tees
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-center">
            Iconic rock band T-shirts! Keeping time like the tides, but no tie-dyeds.
          </p>
          <Link href="/products">
            <button className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-red-700 text-base sm:text-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}