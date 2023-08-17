import HelpCTA from "components/help-cta";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full bg-offWhite pt-64 rounded-b-lg">
      <section className="flex flex-col items-center gap-24 justify-center text-darkGray w-screen">
        <h1 className="font-medium text-8xl">About our company</h1>
        <p className="font-medium text-2xl text-center w-1/3">
          Our company is built on the pillars of convenience, reliability, and
          customer satisfaction.
          <br />
          <br />
          We take pride in the seamless user experience we offer, ensuring that
          navigating our e-shop is a breeze for every visitor.
        </p>
      </section>
      <section className="mt-32 pb-64 flex flex-col w-full">
        <div className="row-1 w-full flex flex-row items-center justify-around">
          <div className="aspect-square w-1/6 bg-accentGray h-auto flex items-center justify-center">
            <Image
              src="/static/images/masonry/1.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
          <div className="aspect-[568/490] w-1/4 bg-softGray h-auto flex items-center justify-center -mt-[10%]">
            <Image
              src="/static/images/masonry/2.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
          <div className="aspect-[500/652] w-1/4 bg-accentGray h-auto flex items-center justify-center">
            <Image
              src="/static/images/masonry/3.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
        </div>
        <p className="text-darkGray text-4xl font-medium w-1/3 ml-[6%]">
          At our store, we take immense pride in presenting our customers with
          an unparalleled range of premium perfume products.
        </p>
        <div className="row-2 mt-24 w-full flex flex-row items-start justify-around">
          <div className="aspect-[692/500] w-1/3 bg-softGray h-auto flex items-center justify-center">
            <Image
              src="/static/images/masonry/4.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
          <div className="aspect-square mr-[15%] w-1/6 bg-softGray h-auto flex items-center justify-center">
            <Image
              src="/static/images/masonry/5.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
        </div>
        <div className="row-3 mt-24 w-full flex flex-row items-start justify-around">
          <div className="ml-[3%] mt-[5%] aspect-square w-1/4 bg-accentGray h-auto flex items-center justify-center">
            <Image
              src="/static/images/masonry/6.png"
              alt=""
              width={600}
              height={600}
              className="w-1/2 h-2/3 object-contain"
            />
          </div>
          <p className="text-darkGray text-4xl font-medium w-1/2">
            We&apos;ve curated a collection that embodies sophistication and
            elegance, ensuring you find the perfect scent to complement your
            unique style.
          </p>
        </div>
        <p className="text-darkGray text-4xl font-medium w-1/3 ml-[6%] mt-32">
          Our commitment to providing the best prices is unwavering. Experience
          the joy of indulging in top-notch fragrances without breaking the
          bank.
        </p>
      </section>
      <HelpCTA />
    </div>
  );
}
