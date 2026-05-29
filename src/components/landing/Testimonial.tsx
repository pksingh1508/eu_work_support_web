import Image from "next/image";
import { testimonialData } from "@/constant/testimonialData";

const marqueeItems = [...testimonialData, ...testimonialData];

export function Testimonial() {
  return (
    <section className="bg-[#f6f8fc] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[#0069c9]">
            User stories
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl text-slate-950">
            Stories from our users.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/35 bg-[#c0d4f0] py-6">
          <div className="testimonial-marquee-track flex w-max gap-6">
            {marqueeItems.map((testimonial, index) => (
              <article
                key={`${testimonial.imageUrl}-${index}`}
                aria-hidden={index >= testimonialData.length}
                className="w-[240px] shrink-0 rounded-[1.5rem] border border-white/35 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] p-4 sm:w-[280px]"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.15rem] border border-white/30 bg-slate-900">
                  <Image
                    src={testimonial.imageUrl}
                    alt="User image"
                    fill
                    sizes="(max-width: 640px) 280px, 360px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-6 min-h-[96px] text-base font-medium leading-7 text-slate-200">
                  {testimonial.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
