export default function About() {
  return (
    <>
      <div className="pt-14 md:p-8 max-w-6xl mx-auto text-white">
        <h1 className="text-[24px] font-joti" style={{ textShadow: '0 2px 2px #000000' }}>About</h1>
        <h2 className="text-[42px] font-joti mb-3" style={{ textShadow: '0 4px 4px #000000' }}>Tinnitus TEES</h2>

        <div className="w-11 h-1 rounded-full bg-[#B30707] mx-auto my-4"></div>

        <section className="mx-auto max-w-[750px] grid grid-cols-1 gap-8 px-4 text-white">
            <div className="w-full md:max-w-[450px]">
              <h2 className="text-2xl font-semibold mb-4 text-center md:text-left" style={{ textShadow: '0 3px 3px #000000' }}>
                Our Mission
              </h2>
              <p className="text-[19px] font-medium text-left text-yellow-200" style={{ textShadow: '0 2px 2px #000000' }}>
                Now listen here—at Tinnitus Tees, we&apos;ve got a hankerin&apos; for two things: good music and shirts that don&apos;t itch. We aim to tip our hats to the legends of sound by turnin&apos; out T-shirts so soft and fine, you&apos;ll forget you&apos;re wearin&apos; anything at all—except maybe your pride for that band you still holler about.
              </p>
            </div>

            <div className="w-full md:max-w-[375px] md:ml-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center md:text-right" style={{ textShadow: '0 3px 3px #000000' }}>
                Our Story
              </h2>
              <p className="text-[19px] font-medium text-left md:text-right text-yellow-200" style={{ textShadow: '0 2px 2px #000000' }}>
                Back in the year 2025, in the humble town of Poughkeepsie, Tinnitus Tees sprang up like a fiddle tune at a campfire. Now we&apos;re a gathering place for the music-loving, shirt-wearing crowd who recall when rock ROCKED.
              </p>
            </div>
          </section>

      </div>
    </>
  );
}
