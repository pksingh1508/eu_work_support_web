import Image from "next/image";
import {
  testimonialData,
  type TestimonialData,
} from "@/constant/testimonialData";
import { QuoteIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

const half = Math.ceil(testimonialData.length / 2);
const rows = [testimonialData.slice(0, half), testimonialData.slice(half)];

export function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-surface-tint py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.1),transparent)]"
      />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          layout="split"
          kicker="Real people, real moves"
          title="Support that travels with you."
          highlight={["travels"]}
          description="Practical guidance built around the questions people ask when planning work abroad."
        />
      </div>

      <div className="relative mt-12 space-y-5 lg:mt-16">
        {rows.map((row, rowIndex) => (
          <MarqueeRow
            key={rowIndex}
            items={row}
            reverse={rowIndex % 2 === 1}
            duration={rowIndex % 2 === 1 ? "64s" : "56s"}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: TestimonialData[];
  reverse: boolean;
  duration: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-viewport marquee-mask group no-scrollbar overflow-hidden">
      <div
        className="flex w-max animate-marquee gap-5 px-2.5 group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((testimonial, index) => (
          <article
            key={`${testimonial.imageUrl}-${index}`}
            aria-hidden={index >= items.length}
            className="flex w-[270px] shrink-0 flex-col rounded-[24px] border border-ink/[0.07] bg-white p-3 shadow-[0_14px_40px_-18px_rgba(16,29,54,0.18)] transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_rgba(57,121,232,0.35)] sm:w-[320px]"
          >
            <div className="skeleton relative aspect-[16/9] overflow-hidden rounded-[18px]">
              <Image
                src={testimonial.imageUrl}
                alt="Visa shared by an EU Work Support user"
                fill
                sizes="(max-width: 640px) 270px, 320px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
              <QuoteIcon className="h-5 w-5 text-brand/30" />
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
                {testimonial.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
