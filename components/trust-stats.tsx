"use client";

export function TrustStats() {
  const stats = [
    {
      value: "30+",
      label: "Years of Sacred Trust",
    },
    {
      value: "50M+",
      label: "Incense Sticks Lit & Delivered",
    },
    {
      value: "100+",
      label: "Serving Countries",
    },
  ];

  return (
    <section className="w-full bg-[#f3f6ef] py-16 sm:py-20 border-y border-[#e2e8dc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7b8d54] tracking-tight font-sans leading-none">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#12172b] tracking-tight mt-3 sm:mt-4 font-sans">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
