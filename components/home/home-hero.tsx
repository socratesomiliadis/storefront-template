export default function HomeHero() {
  return (
    <section className="sticky top-0 w-screen light-section h-screen z-[5]">
      <video
        poster="/static/images/heroVidThumb.png"
        src="/static/videos/heroVid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </section>
  );
}
