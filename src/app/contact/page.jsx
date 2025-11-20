"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

export default function ContactPage() {
  return (
    <main className="w-full">
      <Navbar />

      {/* MAIN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* LEFT IMAGE */}
        {/* LEFT IMAGE */}
<div className="rounded-lg overflow-hidden h-full">
  <Image
    src="/Contact.jpg"
    alt="Contact agent"
    width={700}
    height={900}    // increased height
    className="w-full h-full object-cover object-top rounded-lg"
  />
</div>


        {/* RIGHT SIDE FORM */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-sm text-gray-600 mb-8">
            We are here for you. How can we help?
          </p>

          {/* FORM */}
          <form className="space-y-5">

            {/* NAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
              />

              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
            />

            {/* MESSAGE */}
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
            />

            {/* CHECKBOX */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              You agree to our friendly privacy policy.
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-[#1C9D75] w-full text-white py-2 rounded-full hover:bg-[#178764] transition"
            >
              Submit
            </button>
          </form>

          {/* CONTACT ICON ROW */}
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <Image src="/location3.png" width={20} height={20} alt="loc" />
              <span>Address location here</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/call.png" width={20} height={20} alt="phone" />
              <span>Phone number here</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/mail.png" width={20} height={20} alt="email" />
              <span>hello@gmail.com</span>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
