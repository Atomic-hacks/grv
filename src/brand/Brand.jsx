import React from "react";
import { motion as Motion } from "framer-motion";
import AnimatedPageTitle from "../component/ui/AnimatedPageTitle";
import RevealImage from "../component/ui/RevealImage";

export default function Brand() {
  return (
    <main className="overflow-hidden">
      {" "}
      <div className="relative overflow-hidden bg-black px-7 py-14 text-white md:px-12 md:py-20">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-[#EF4824] opacity-90" />
        <div className="max-w-5xl mx-auto text-center">
          <p className="relative text-xs uppercase tracking-[.18em] text-[#EF4824]">
            Built for the bold
          </p>

          <div className="overflow-hidden relative mt-5 max-w-5xl text-6xl md:text-8xl flex items-baseline justify-center gap-4">
            <span>This is</span>

            <AnimatedPageTitle title="GRV." className="text-[#EF4824]" />
          </div>

          <p className="relative mt-7 leading-7 text-white/70">
            We make clothing for people who train, create and move on their own
            terms. Every garment starts with intent and ends in action.
          </p>
        </div>
      </div>
      <section className="site-container py-16 md:py-24"></section>
      <section className="site-container grid items-end gap-8 pb-24 md:grid-cols-[1.5fr_.7fr] md:pb-36">
        <RevealImage
          src="/img/goth-boy.jpg"
          alt="GRV in motion"
          className="h-[480px] overflow-hidden rounded-[28px] md:h-[690px]"
        />
        <div className="md:pb-8">
          <Motion.p
            className="eyebrow"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            The point of view
          </Motion.p>
          <Motion.p
            className="display mt-5 text-3xl leading-tight md:text-4xl"
            initial={{ y: 35, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Move fast. Stay grounded. Wear what holds up.
          </Motion.p>
          <p className="mt-6 leading-7 text-muted">
            GRV is rooted in the confidence that comes from showing up every
            day. Clean utility, lasting comfort, and a little heat where it
            counts.
          </p>
          <div className="mt-8 flex gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EF4824] text-white">
              01
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-black/15">
              GRV
            </span>
          </div>
        </div>
      </section>
      <section className="bg-off-white py-24 md:py-32">
        <div className="site-container grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Made with purpose</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Responsible by design.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-muted">
              Material choices and timeless forms that work harder and stay in
              rotation longer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/img/goth-towers.jpg"
              alt="Natural materials"
              className="h-72 w-full rounded-[26px] object-cover md:h-96"
            />
            <img
              src="/img/goth-flowers.jpg"
              alt="Natural details"
              className="mt-12 h-72 w-full rounded-[26px] object-cover md:h-96"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
