import Link from "next/link";

export default function HelpCTA() {
  return (
    <section className="w-full px-4 lg:px-32 py-64 relative z-10 bg-offWhite rounded-b-lg">
      <div className="w-full py-32 lg:py-0 lg:h-[70vh] font-medium lg:gap-4 text-offWhite flex flex-col items-center justify-center rounded-2xl bg-darkGray">
        <p className="text-base lg:text-4xl font-normal">
          Need more help deciding?
        </p>
        <p className="text-3xl text-center lg:text-8xl">
          We&apos;d love to help!
        </p>
        <Link
          href="/contact"
          className="py-4 mt-10 px-24 rounded-md text-xl bg-offWhite text-darkGray"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
