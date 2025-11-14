"use client"

import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black-white-100">
      <section className="mx-auto w-[1440px] px-[80px] py-[80px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-black-white-1100 text-[32px] font-semibold">Welcome to Health Linker</h1>
          <p className="text-black-white-900 text-[16px]">
            This is the homepage. Visit the About page to learn more about us.
          </p>
        </div>
      </section>
    </div>
  );
}
