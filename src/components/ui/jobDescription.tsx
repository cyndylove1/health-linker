"use client";

interface JobSection {
  type: "heading" | "paragraph" | "section";
  text?: string;
  title?: string;
  items?: string[];
  titleStyle?: "heading" | "subheading";
}

interface JobDescriptionProps {
  jobData: {
    description?: string;
    responsibilities?: string[];
    requirements?: string[];
    skills?: string[];
  } | null;
}

export default function JobDescription({ jobData }: JobDescriptionProps) {
  if (!jobData) return null;

  const jobDescription: JobSection[] = [
    {
      type: "paragraph",
      text: jobData.description || "No description available",
    },
    {
      type: "heading",
      text: "Key Responsibilities",
    },
    {
      type: "section",
      titleStyle: "subheading",
      items: jobData.responsibilities || ["Not provided"],
    },
    {
      type: "heading",
      text: "Requirements",
    },
    {
      type: "section",
      titleStyle: "heading",
      items: jobData.requirements || ["Not provided"],
    },
    {
      type: "heading",
      text: "Key Skills",
    },
    {
      type: "section",
      titleStyle: "heading",
      items: jobData.skills || ["Not provided"],
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
