import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="w-screen light-section h-screen relative z-10">
      <Image
        src="/static/images/heroRetina.png"
        alt=""
        width={2560}
        height={1440}
        priority={true}
        className="object-cover object-center w-full h-full absolute z-0 inset-0"
      />
    </section>
  );
}
