"use client";

interface JobSection {
  type: "heading" | "paragraph" | "section";
  text?: string;
  title?: string;
  items?: string[];
  titleStyle?: "heading" | "subheading"; // new property
}

export default function JobDescription() {
  const jobDescription: JobSection[] = [
    {
      type: "paragraph",
      text: "The Dental Surgeon is responsible for diagnosing, treating, and preventing diseases and conditions of the oral cavity, teeth, gums, and jaw. The role involves performing surgical and non-surgical dental procedures, ensuring patient safety and comfort, and upholding high clinical and ethical standards of dental practice.",
    },
    {
      type: "heading",
      text: "Key Responsibilities",
    },
    {
      type: "section",
      title: "Clinical Duties",
      titleStyle: "subheading",
      items: [
        "Examine, diagnose, and develop treatment plans for patients with oral health issues.",
        "Perform dental surgical procedures including extractions, implants, root canals, and corrective surgeries.",
        "Carry out preventive and restorative dental care (fillings, crowns, bridges, scaling, etc.).",
        "Administer anesthesia and pain management where required.",
        "Ensure strict adherence to infection prevention and control protocols.",
        "Monitor and follow up on patients’ recovery and oral health progress.",
      ],
    },
    {
      type: "section",
      title: "Patient Care",
      items: [
        "Provide comprehensive education and counseling to patients regarding oral hygiene and preventive care.",
        "Ensure a positive patient experience through empathy, professionalism, and effective communication.",
        "Respond promptly to dental emergencies and trauma cases.",
      ],
    },
    {
      type: "section",
      title: "Administrative & Supervisory Duties",
      items: [
        "Maintain accurate and confidential patient records.",
        "Supervise and mentor dental nurses, interns, and other support staff.",
        "Participate in audits, case reviews, and continuous professional development activities.",
        "Support procurement and inventory management of dental supplies and equipment.",
      ],
    },
    {
      type: "section",
      title: "Compliance & Professional Standards",
      items: [
        "Adhere to all local health regulations and ethical guidelines.",
        "Maintain valid licensure and professional registration with relevant dental council.",
        "Engage in continuing education to remain current with advances in dental technology and techniques.",
      ],
    },
    {
      type: "section",
      title: "Qualifications & Skills",
      titleStyle: "heading",
      items: [
        "Bachelor of Dental Surgery (BDS) or Doctor of Dental Surgery (DDS) from an accredited institution.",
        "Current license to practice dentistry with relevant dental council/regulatory authority.",
        "Minimum 6 years of clinical experience (post-qualification).",
        "Strong diagnostic and surgical skills.",
        "Excellent communication, interpersonal, and leadership skills.",
        "Ability to work calmly under pressure and handle dental emergencies.",
      ],
    },
    {
      type: "section",
      title: "Key Competencies",
      titleStyle: "heading",
      items: [
        "Clinical excellence and attention to detail.",
        "Ethical judgment and integrity.",
        "Patient-centered care.",
        "Teamwork and leadership.",
        "Commitment to continuous learning.",
        "Qualified Candidates should apply using the link below.",
      ],
    },
  ];

  return (
    <div className="py-4 dm-font text-[var(--black-white-900)] space-y-6 leading-[100%]">
      {jobDescription.map((section, idx) => {
        switch (section.type) {
          case "heading":
            return (
              <h2 key={idx} className="text-[14px] md:text-[16px] font-[600]">
                {section.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={idx}
                className="text-[14px] md:text-[16px] font-[400] leading-[1.5]"
              >
                {section.text}
              </p>
            );
          case "section":
            return (
              <div key={idx} className="space-y-2">
                <h3
                  className={
                    section.titleStyle === "heading"
                      ? "text-[14px] md:text-[16px] font-[600]"
                      : "text-[14px] md:text-[16px] font-[500]"
                  }
                >
                  {section.title}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-[14px] md:text-[16px]">
                  {section.items?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
