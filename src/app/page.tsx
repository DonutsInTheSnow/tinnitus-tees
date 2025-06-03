// From Chag 6/2/25
import Link from 'next/link';

export default function Home() {
  return (
      <main className="relative z-10 flex flex-col items-center justify-start h-full text-white px-4 pt-28 md:pt-10">
        <h1
          className="text-[48px] md:text-[100px] font-joti text-center"
          style={{ textShadow: '0 4px 4px #000000' }}
        >
          Tinnitus TEES
        </h1>
        <h2
          className="text-[28px] md:text-[58px] font-joti text-center"
          style={{
            WebkitTextStroke: '1px #D0C779',
            color: '#000000',
            WebkitTextFillColor: '#000000',
            textShadow: '0 3px 3px #000000'
          }}
        >
          Iconic rock band T-shirts
        </h2>
        {/* <p className="text-lg sm:text-xl mb-6 text-center"> */}
        <p className="text-[20px] md:text-[35px] mb-6 text-center text-yellow-200" style={{ textShadow: '0 2px 2px #000000' }}>
          Keeping time like the tides without the tie-dyeds.
        </p>
        <Link href="/products">
          <button className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-red-700 text-base sm:text-lg md:mt-5" style={{ boxShadow: '0 0 20px #000000' }}>
            Shop Now
          </button>
        </Link>
      </main>
  );
}
