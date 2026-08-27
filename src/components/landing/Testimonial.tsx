"use client";

import Image from "next/image";
import { testimonialData } from "@/constant/testimonialData";
import { m, useReducedMotion } from "motion/react";

const marqueeItems = [...testimonialData, ...testimonialData];

export function Testimonial() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#f1f6ff] py-20 text-white lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">Real people, real moves</p>
            <h2 className="section-title mt-4">Support that travels with you.</h2>
          </div>
          <p className="max-w-sm leading-7 text-slate-600">Practical guidance built around the questions people ask when planning work abroad.</p>
        </m.div>

        <div className="relative overflow-hidden rounded-[32px] bg-[#101d36] py-6 shadow-[0_28px_80px_rgba(16,29,54,.16)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#101d36] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#101d36] to-transparent sm:w-28" />
          <m.div
            className="flex w-max gap-5 px-3"
            animate={reduceMotion ? undefined : { x: ["-50%", "0%"] }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          >
            {marqueeItems.map((testimonial, index) => (
              <m.article
                key={`${testimonial.imageUrl}-${index}`}
                aria-hidden={index >= testimonialData.length}
                whileHover={{ y: -6, scale: 1.015 }}
                className="w-[250px] shrink-0 rounded-[24px] border border-white/10 bg-white/[0.07] p-3.5 text-white backdrop-blur sm:w-[290px]"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-slate-900">
                  <Image
                    src={testimonial.imageUrl}
                    alt="User image"
                    fill
                    sizes="(max-width: 640px) 280px, 360px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 min-h-[96px] text-sm font-medium leading-7 text-slate-200 sm:text-base">
                  {testimonial.description}
                </p>
              </m.article>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
