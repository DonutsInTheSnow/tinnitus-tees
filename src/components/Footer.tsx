import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#928271] text-black p-4 text-center md:w-[425px] md:h-[135px] md:rounded-[10px] md:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] md:mx-auto md:mb-7">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="font-semibold md:font-medium md:mx-auto">
          <p className="text-[19px] font-joti">Tinnitus TEES</p>
          <p>123 Main St, Poughkeepsie, NY 12601</p>
          <p>Email: contact@tinnitustees.com</p>
          <p>Phone: (845) 555-1234
            <span className="ml-4 text-sm text-black/70 hover:text-black">
              <Link href="/privacy-policy" className="hover:underline">
                | Privacy Policy
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}