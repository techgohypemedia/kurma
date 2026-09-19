"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 35 });
  const reduced = useReducedMotion();
  return <motion.div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[#c0881b] pointer-events-none" style={{ scaleX: reduced ? scrollYProgress : progress }} />;
}

const questions = [
  ["What is inside the marble gift trunk?", "The Elements in Harmony trunk brings together all five fragrance boxes (135 sticks in total), a solid brass turtle incense stand, a keepsake medallion, a tassel bookmark, and the Kurma ritual guide. You can review the full contents and available extras in the product customizer."],
  ["Can I personalise my gift?", "Yes. Select a product and choose its personalisation options before adding it to your bag. Options vary by piece, from a brass plaque or monogram to a gift message, ribbon, or lining. Your selections appear in the cart for review."],
  ["Can I try just one element?", "Each element is available individually in a box of 27 incense sticks. Explore Earth, Water, Fire, Air, and Space above, or choose the complete five-element suite to discover the full collection."],
  ["How do I care for the keepsake pieces?", "Keep the trunk dry and wipe it gently with a soft cloth. Let the brass holder cool completely before removing ash. Avoid abrasive cleaners, and store unused incense in a cool, dry place away from moisture."],
];

export function RitualAndQuestions() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return <>
    <section className="border-y border-[#eed08e]/20 bg-[#0b3020] px-5 py-20 md:px-12 lg:py-28" aria-labelledby="ritual-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div><p className="mb-5 text-[#eed08e]">The everyday ritual</p><h2 id="ritual-title" className="font-serif text-4xl leading-tight md:text-5xl">A small pause.<br />A more considered day.</h2><p className="mt-6 max-w-md leading-7 text-stone-300">There is no perfect time or elaborate ceremony required. Begin with a fragrance, a safe place to burn it, and a moment that belongs to you.</p><a href="#catalog" className="mt-8 inline-flex items-center gap-3 border-b border-[#eed08e]/50 pb-2 text-[#eed08e]">Find your element <ArrowRight size={18} /></a></div>
        <ol className="divide-y divide-[#eed08e]/20">{[
          ["Choose your moment", "Pick an element that suits the occasion. Place the holder on a stable, heat-resistant surface with room to catch the ash."],
          ["Light with care", "Light the tip, then gently extinguish the flame so the incense smoulders. Keep the room well ventilated."],
          ["Stay for the pause", "Enjoy the fragrance while you read, reflect, or simply sit. Never leave burning incense unattended; keep it away from children, pets, and flammable objects."],
        ].map(([title, body], index) => <li key={title} className="flex gap-6 py-7 first:pt-0"><span className="pt-1 font-serif text-2xl text-[#eed08e]/60">0{index + 1}</span><div><h3 className="mb-3 text-xl text-[#eed08e]">{title}</h3><p className="max-w-lg leading-7 text-stone-300">{body}</p></div></li>)}</ol>
      </div>
    </section>
    <section className="bg-[#061e13] px-5 py-20 md:px-12 lg:py-28" aria-labelledby="faq-title"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 id="faq-title" className="font-serif text-4xl md:text-5xl">A few thoughtful details.</h2><p className="mt-5 max-w-xs leading-7 text-stone-400">Get to know your collection before it becomes part of your home.</p></div><div className="border-t border-[#eed08e]/25">{questions.map(([question, answer], index) => <div key={question} className="border-b border-[#eed08e]/25"><h3><button id={`faq-trigger-${index}`} aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg"><span>{question}</span><motion.span animate={{ rotate: open === index ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.2 }}><Plus size={20} className="shrink-0 text-[#eed08e]" /></motion.span></button></h3><motion.div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} initial={false} animate={{ height: open === index ? "auto" : 0, opacity: open === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }} className="overflow-hidden" inert={open !== index}><p className="pb-6 pr-8 leading-7 text-stone-300">{answer}</p></motion.div></div>)}</div></div></section>
  </>;
}
