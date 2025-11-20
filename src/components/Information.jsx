"use client";

import React, { useState } from "react";

const questions = [
  {
    id: 1,
    q: "What is your return policy?",
    a: "We offer a 15–day return window for a full refund or exchange on unused items. Returns must include original packaging and proof of purchase for processing. Refunds are issued within 7 business days after we receive and inspect the product.",
  },
  {
    id: 2,
    q: "How do I track my order?",
    a: "Once your order ships, we will email you a tracking link. Click the link to open tracking on the carrier’s site and see latest status updates.",
  },
  {
    id: 3,
    q: "Do you offer international shipping?",
    a: "Yes — we ship to many countries. International shipping rates and delivery times vary by destination and will be calculated at checkout.",
  },
  {
    id: 4,
    q: "Can I modify my order after placing it?",
    a: "You can request a change within 1 hour of placing your order. After that time we may not be able to modify it because the order could be processed for shipping.",
  },
  {
    id: 5,
    q: "How can I contact support?",
    a: "You can reach our support team via the Contact page or email support@example.com. We respond within 24 hours on business days.",
  },
];

export default function Information() {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center py-20"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-end w-full">

        {/* FIXED SIZE GREEN BOX (NO SCROLLBAR) */}
        <div
          className="w-full lg:w-[550px] rounded-[22px] p-6 lg:p-8 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,120,83,1) 0%, rgba(26,104,70,1) 45%, rgba(7,54,38,1) 100%)",
            height: "480px",
            overflow: "hidden", // 🔥 prevents scrollbar
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-white text-xl lg:text-2xl font-semibold mb-1 leading-tight">
              What is your return policy?
            </h3>

            <p className="text-white/90 text-sm leading-relaxed">
              We answer the most common questions about shipping, returns and
              payments. Click any question to expand for more detail.
            </p>
          </div>

          {/* FAQ LIST - compact spacing */}
          <div className="space-y-2 mt-2 flex-1 overflow-hidden">

            {questions.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="text-white">
                  <button
                    className="w-full flex items-center justify-between py-2 px-2 rounded-md hover:bg-white/5 transition"
                    onClick={() => toggle(item.id)}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        isOpen ? "text-white" : "text-white/90"
                      }`}
                    >
                      {item.q}
                    </span>

                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6 8l4 4 4-4"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <p className="text-sm text-white/90 leading-relaxed px-2 pb-2">
                      {item.a}
                    </p>
                  )}

                  <div className="border-t border-white/10" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
