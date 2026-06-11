import { FAQItem } from "@/lib/structured-data/types";

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = "Frequently Asked Questions" }: FAQSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
          {title}
        </h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <details
              key={index}
              className="rounded-xl border border-white/10 bg-dark-secondary/40 backdrop-blur-sm p-6 group"
            >
              <summary className="text-lg font-semibold text-[#f0f0f0] cursor-pointer">
                {item.question}
              </summary>
              <p className="mt-4 text-[#a0a0b0] leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
