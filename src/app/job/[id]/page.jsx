"use client";

import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { useState } from "react";

const primary = "#1C9D75";

export default function JobDetailsPage({ params }) {
  const jobId = params.id;

  // State for selected job card
  const [selectedJob, setSelectedJob] = useState(Number(jobId));

  return (
    <main className="w-full bg-white">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative w-full">
        <Image
          src="/About1.png"
          alt="Jobs hero"
          width={1920}
          height={600}
          className="w-full h-[350px] object-cover object-top"
        />
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto mt-[-52px] px-4 relative z-20">
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center gap-4">
          <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-5 py-4">
            <div className="text-sm font-semibold text-gray-800">
              Job Title, Keywords, or Company
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Enter job title, keywords, or company
            </div>
          </div>

          <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-5 py-4">
            <div className="text-sm font-semibold text-gray-800">Location</div>
            <div className="text-sm text-gray-500 mt-1">
              City, state, zip code, remote
            </div>
          </div>

          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1C9D75] hover:bg-[#178764] transition shadow-md">
            <Image src="/search.png" width={22} height={22} alt="search" />
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Job Location",
            "Industry",
            "Work Type",
            "Experience level",
            "Date Posted",
            "Remote Only",
            "Job Sector",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-xs rounded-full border border-gray-200 bg-white shadow-sm flex items-center gap-2"
            >
              {item}
              <Image src="/drop-down.png" width={10} height={10} alt="arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 mt-8 mb-20 flex gap-6">

        {/* LEFT SECTION — JOB DESCRIPTION */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          {/* Job Title + Company */}
          <h1 className="text-2xl font-bold text-gray-900">Dental Surgeon</h1>
          <p className="text-sm text-gray-500 mt-1">Healing Hands Hospital</p>

          {/* Location + Salary + Posted */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Image src="/location.png" width={15} height={15} alt="loc" />
              Mumbai, India
            </div>

            <div className="font-semibold text-gray-800">
              $50.00 – $70.00 / hr
            </div>

            <div className="text-gray-500">3 days ago</div>
          </div>

          {/* Apply Button */}
          <button className="mt-4 bg-[#1C9D75] text-white px-6 py-2 rounded-full shadow hover:bg-[#178764] transition">
            Apply →
          </button>

          {/* FULL DESCRIPTION BLOCK */}
          <div className="mt-6 text-sm text-gray-700 leading-6">

            <p>
              The Dental Surgeon is responsible for diagnosing, treating, and preventing diseases and conditions of the oral cavity, teeth, gums, and jaw. The role involves performing surgical and non-surgical dental procedures, ensuring patient safety and comfort, and upholding high clinical and ethical standards of dental practice.
            </p>

            <h2 className="text-lg font-semibold mt-6">Key Responsibilities</h2>

            <h3 className="font-semibold mt-4">• Clinical Duties</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Examine, diagnose, and develop treatment plans for patients with oral health issues.</li>
              <li>Perform dental surgical procedures including extractions, implants, root canals, and corrective surgeries.</li>
              <li>Carry out preventive and restorative dental care (fillings, crowns, bridges, scaling, etc.).</li>
              <li>Administer anesthesia and pain management where required.</li>
              <li>Ensure strict adherence to infection prevention and control protocols.</li>
              <li>Monitor and follow up on patients’ recovery and oral health progress.</li>
            </ul>

            <h3 className="font-semibold mt-4">• Patient Care</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Provide comprehensive education and counseling to patients regarding oral hygiene and preventive care.</li>
              <li>Ensure a positive patient experience through empathy, professionalism, and effective communication.</li>
              <li>Respond promptly to dental emergencies and trauma cases.</li>
            </ul>

            <h3 className="font-semibold mt-4">• Administrative & Supervisory Duties</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Maintain accurate and confidential patient records.</li>
              <li>Supervise and mentor dental nurses, interns, and other support staff.</li>
              <li>Participate in audits, case reviews, and continuous professional development activities.</li>
              <li>Support procurement and inventory management of dental supplies and equipment.</li>
            </ul>

            <h3 className="font-semibold mt-4">• Compliance & Professional Standards</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Adhere to all local health regulations and ethical guidelines.</li>
              <li>Maintain valid licensure and professional registration with [Dental Regulatory Body e.g., MDCN, GDC].</li>
              <li>Engage in continuing education to remain current with advances in dental technology and techniques.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">Qualifications & Skills</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Bachelor of Dental Surgery (BDS) or Doctor of Dental Surgery (DDS) from an accredited institution.</li>
              <li>Current license to practice dentistry with [relevant dental council/regulatory authority].</li>
              <li>Minimum [ 6 ] years of clinical experience (post-qualification).</li>
              <li>Strong diagnostic and surgical skills.</li>
              <li>Excellent communication, interpersonal, and leadership skills.</li>
              <li>Ability to work calmly under pressure and handle dental emergencies.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">Key Competencies</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Clinical excellence and attention to detail.</li>
              <li>Ethical judgment and integrity.</li>
              <li>Patient-centered care.</li>
              <li>Teamwork and leadership.</li>
              <li>Commitment to continuous learning.</li>
              <li>Qualified Candidates should apply using the link below</li>
            </ul>

          </div>
        </div>

        {/* RIGHT SECTION — RELATED JOBS */}
        <div className="w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Related Jobs</h3>

          {[1, 2, 3, 4, 5, 6].map((job) => (
            <Link
              key={job}
              href={`/job/${job}`}
              onClick={() => setSelectedJob(job)}
            >
              <div
                className={`
                  relative rounded-2xl p-4 mb-4 cursor-pointer transition-all
                  shadow-[0px_2px_10px_rgba(0,0,0,0.05)]
                  ${
                    selectedJob === job
                      ? "border-2 border-[#1C9D75] shadow-md"
                      : "border border-gray-200"
                  }
                `}
              >
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center">
                    <Image src="/wish.png" alt="save" width={18} height={18} />
                  </div>
                </div>

                <h4 className="text-base font-semibold">Dental Surgeon</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Reddington Multi Specialist Hospital
                </p>

                <div className="mt-3">
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(28,157,117,0.15)",
                      color: primary,
                    }}
                  >
                    Full-Time
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Image src="/location.png" width={16} height={16} alt="loc" />
                    Lagos
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="text-base font-bold text-black">
                  $50.00 – $70.00{" "}
                  <span className="text-sm text-gray-500 font-normal">per hour</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
