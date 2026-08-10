import React, { useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import AnimatedPageTitle from "../component/ui/AnimatedPageTitle";
import RevealImage from "../component/ui/RevealImage";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  return (
    <main className="site-container py-8 md:py-14">
      <section className="grid overflow-hidden rounded-[30px] bg-off-white md:grid-cols-2">
        <div className="p-7 md:p-12">
          <p className="eyebrow">Let’s get moving</p>
          <div className="max-w-xl overflow-hidden">
            <AnimatedPageTitle
              title="Talk to GRV."
              className="mt-4 text-5xl md:text-7xl"
            />
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-muted">
            Questions, wholesale, collaborations or just a good idea — we’re all
            ears.
          </p>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-10 space-y-7"
          >
            <div className="grid gap-7 sm:grid-cols-2">
              {[
                ["name", "Name"],
                ["email", "Email"],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="block text-xs font-medium uppercase tracking-[.12em] text-muted"
                >
                  {label}
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Your ${name}`}
                    className="mt-3 w-full border-b border-black/20 bg-transparent py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-[#e85d04]"
                  />
                </label>
              ))}
            </div>
            <label className="block text-xs font-medium uppercase tracking-[.12em] text-muted">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={4}
                className="mt-3 w-full resize-none border-b border-black/20 bg-transparent py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-[#e85d04]"
              />
            </label>
            <button className="inline-flex items-center gap-1 rounded-full bg-[#e85d04] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#c94d00]">
              Send message <HiArrowUpRight aria-hidden="true" />
            </button>
          </form>
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-black/10 pt-6 text-sm">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[.12em] text-muted">
                Email
              </p>
              <p>hello@grv.co</p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[.12em] text-muted">
                Studio
              </p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[420px] bg-black">
          <RevealImage
            src="/img/goth-tower2.jpg"
            alt="GRV studio"
            className="h-full min-h-[420px] w-full opacity-80"
          />
          <div className="absolute bottom-7 left-7 grid h-20 w-20 place-items-center rounded-full border border-[#ff7a1a] text-xs text-white">
            GRV
            <br />
            01
          </div>
        </div>
      </section>
    </main>
  );
}
