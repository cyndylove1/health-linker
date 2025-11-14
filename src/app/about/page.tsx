"use client"

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black-white-100">
      {/* Hero: exact Figma gradient, padding and typography */}
      <section className="relative w-[1440px] h-[571px] mx-auto">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
"url('/images/Hero%20Section.png')",
           
          }}
        />
        <div className="relative z-10 pt-[300px] px-[80px] pb-[30px] flex flex-col gap-[10px]">
          <p className="text-white text-[18px]">About Health Linker</p>
          <h1 className="text-white font-bold text-[48px]">
            Lorem ipsum dolor sit amet consectetur. Amet mauris
            vulputate et.
          </h1>
        </div>
      </section>

      {/* Mission Section: exact spacing & type, no card/shadow */}
      <section className="w-full">
        <div className="mx-auto w-[1440px] px-[80px] py-[50px]">
          <div className="flex items-start gap-[20px]">
            <div className="flex-1">
              <div className="flex flex-col gap-[10px]">
                <p className="text-black-white-1000 text-[18px]">Our Mission</p>
                <p className="text-black-white-1000 text-[24px] font-bold">Mission Statement</p>
              </div>
              <p className="text-black-white-1000 text-[16px] mt-[10px]">
                Lorem ipsum dolor sit amet consectetur. At gravida viverra aliquet
                proin venenatis odio. At sapien eget sed est nibh quis dictum velit
                gravida. Non id lorem quam rhoncus nibh. Ultrices congue et faucibus
                maecenas ultrices ipsum. Rutrum elit duis turpis est. Cras eu proin
                luctus quis nunc. Tincidunt ligula massa et adipiscing aenean porta.
              </p>
            </div>
            <div className="flex-shrink-0 w-[630px] h-[382px] rounded-[16px] overflow-hidden">
              <img
                src="/images/Property2.png"
                alt="Healthcare professional reviewing mission documents"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section: exact spacing & type, image left */}
      <section className="w-full">
        <div className="mx-auto w-[1440px] px-[80px] pb-[50px]">
          <div className="flex items-start gap-[20px]">
            <div className="flex-shrink-0 w-[630px] h-[382px] rounded-[16px] overflow-hidden">
              <img
                src="/images/Property.png"
                alt="Doctor smiling, representing our vision for care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-[10px]">
                <p className="text-black-white-1000 text-[18px]">Our Vision</p>
                <p className="text-black-white-1000 text-[24px] font-bold">Vision Statement</p>
              </div>
              <p className="text-black-white-1000 text-[16px] mt-[10px]">
                Lorem ipsum dolor sit amet consectetur. At gravida viverra aliquet proin
                venenatis odio. At sapien eget sed est nibh quis dictum velit gravida.
                Non id lorem quam rhoncus nibh. Ultrices congue et faucibus maecenas
                ultrices ipsum. Rutrum elit duis turpis est. Cras eu proin luctus quis
                nunc. Tincidunt ligula massa et adipiscing aenean porta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section: exact gradient and player dimensions */}
      <section className="w-full">
        <div
          className="mx-auto w-[1440px] px-[80px] py-[50px]"
          style={{
            backgroundImage:
              "url('/images/bg.png'), linear-gradient(180deg, #1c9d75 0%, #0a3729 100%)",
            backgroundPosition: "center, center",
            backgroundSize: "cover, cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col items-center gap-[10px]">
            <p className="text-white text-[48px] font-semibold leading-[62px]">YouTube videos</p>
            <p className="text-white text-[16px]">Lorem ipsum sit dolor amec avous.</p>
          </div>
          <div className="mt-[35px] mx-[109px] shadow-[100px_4px_164px_0px_#262728]">
            <div className="rounded-[20px] bg-white p-[14px_16px_20px_10px]">
              <div className="rounded-[16px] overflow-hidden">
                <iframe
                  title="HealthLinker video"
                  width="1027"
                  height="576"
                  src="https://www.youtube.com/embed/0PG1htoy0Gg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}