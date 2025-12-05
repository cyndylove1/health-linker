"use client";

import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section className="w-full relative">
        <Image
          src="/About1.png"
          alt="About Hero"
          width={1920}
          height={900}
          className="w-full h-[420px] object-cover object-left"
        />

        {/* FIXED TEXT POSITION LIKE 1st IMAGE */}
        <div className="absolute left-10 top-24 md:top-32 max-w-[480px] text-white">
          <p className="text-sm opacity-90 mb-2">About HealthLinker</p>

          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Connecting Healthcare Professionals with Opportunities
          </h1>
        </div>
      </section>

      {/* MISSION SECTION — fixed cropping + real spacing */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">Our Mission</p>

          <h3 className="text-xl font-semibold mb-4">Empowering Healthcare Careers</h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            HealthLinker is dedicated to connecting qualified healthcare professionals with rewarding career opportunities. We understand the unique challenges healthcare workers face in finding the right positions that match their expertise, values, and career goals. Our mission is to streamline the job search process for nurses, doctors, therapists, technicians, and other healthcare professionals, making it easier to find positions that make a real difference in people's lives.
          </p>
        </div>

        {/* CROPPED LIKE YOUR REFERENCE */}
        <Image
          src="/About2.jpg"
          alt="Mission"
          width={600}
          height={400}
          className="rounded-lg object-cover object-center h-[340px]"
        />
      </section>

      {/* VISION SECTION — fixed cropping + text */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <Image
          src="/About3.jpg"
          alt="Vision"
          width={600}
          height={400}
          className="rounded-lg object-cover object-top h-[340px]"
        />

        <div>
          <p className="text-sm text-gray-500 mb-1">Our Vision</p>

          <h3 className="text-xl font-semibold mb-4">Building the Future of Healthcare Recruitment</h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            We envision a world where healthcare professionals can easily discover meaningful employment opportunities that align with their skills and aspirations. By leveraging technology and deep industry knowledge, HealthLinker aims to be the leading platform for healthcare workforce solutions, bridging the gap between talented professionals and organizations that need them.
          </p>
        </div>
      </section>


      {/* YOUTUBE SECTION */}
      <section
  className="w-full py-18 text-center bg-cover bg-center"
  style={{
    background:
      "linear-gradient(180deg, #1C9D75 0%, #0A7160 45%, #054037 100%)",
  }}
>
  <h2 className="text-white text-3xl md:text-5xl font-semibold mb-2">
    Why Choose HealthLinker?
  </h2>

  <p className="text-white/80 text-m mb-[-50px]">
    Learn why thousands of healthcare professionals trust HealthLinker for their career growth.
  </p>

  <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[20_100px_300px_rgba(0,0,0,0.15)]">
    <Image
      src="/Player.png"
      alt="YouTube Video Thumbnail"
      width={1600}
      height={900}
      className="w-full h-auto object-contain"
    />
  </div>
</section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
