import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">Daan <br />Computer Reparatie</h1>
          <address>
            Sarphatistraat 32<br />
            Amsterdam, 1018
          </address>
          <p>Dagelijks Geopend van 9:00 tot 17:00 uur</p>
          <Link href="tel:+316198765" className="hover:underline">+31(0)6198765</Link>
        </div>
      </main>
    </div>
  );
}
