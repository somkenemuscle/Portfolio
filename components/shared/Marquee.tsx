const items = ['TypeScript', 'NestJS', 'PostgreSQL', 'React', 'Next.js', 'Redis', 'BullMQ', 'Docker', 'AWS', 'System design']

// Tilted yellow ticker. The row is duplicated so the -50% loop is seamless.
export default function Marquee() {
  const row = items.map(i => `${i} ✦ `).join('')
  return (
    <div aria-hidden="true" className="overflow-hidden py-4 bg-sb-sun text-sb-paper border-y-[3px] border-sb-cream -rotate-[1.2deg] -mx-2">
      <div className="sb-marquee flex gap-10 w-max font-extrabold text-[26px] whitespace-nowrap">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  )
}
