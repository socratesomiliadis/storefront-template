import Link from "next/link";

export default function HelpCTA() {
  return (
    <section className="w-full px-4 lg:px-32 py-64 relative z-10 bg-offWhite rounded-b-lg">
      <div className="w-full py-32 lg:py-0 lg:h-[70vh] font-medium lg:gap-4 text-offWhite flex flex-col items-center justify-center rounded-2xl bg-darkGray">
        <p className="text-base lg:text-3xl font-normal">
          Need more help deciding?
        </p>
        <p className="text-3xl text-center lg:text-7xl">
          We&apos;d love to help!
        </p>
        <Link
          href="/contact"
          className="group relative overflow-hidden px-20 rounded-md py-3 bg-offWhite text-darkGray mt-16 flex flex-row items-center"
        >
          <span className="text-xl group-hover:translate-y-[-130%] transition-transform duration-200 ease-out">
            Contact us
          </span>
          <span className="text-xl absolute translate-y-[130%] group-hover:translate-y-0 transition-transform duration-200 ease-out">
            Contact us
          </span>
        </Link>
      </div>
    </section>
  );
}
