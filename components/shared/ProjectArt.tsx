// Hand-drawn cover art for project cards, used instead of screenshots.
// Each scene is a small looping cartoon; motion classes live in globals.css
// (art-*).

const INK = '#15110D'
const CREAM = '#F4EBDD'
const SUN = '#FFD23F'
const GUM = '#FF8FB1'
const MINT = '#6FE0B0'
const PERI = '#8EA0FF'
const TOMATO = '#FF6B4A'

const line = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function Sparkle({ x, y, s = 1, fill = CREAM, delay = '0s' }: { x: number; y: number; s?: number; fill?: string; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="art-twinkle" style={{ animationDelay: delay }}
        d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill={fill} {...line} strokeWidth={2} />
    </g>
  )
}

// Alkademy Press: a stack of journals, one open and being written in.
function Journals() {
  return (
    <>
      <Sparkle x={60} y={50} fill={CREAM} />
      <Sparkle x={268} y={70} s={0.8} fill={GUM} delay="-1s" />
      {/* stack */}
      <rect x="82" y="152" width="160" height="24" rx="5" fill={PERI} {...line} />
      <line x1="96" y1="164" x2="150" y2="164" {...line} strokeWidth={2.5} />
      <rect x="94" y="128" width="140" height="24" rx="5" fill={GUM} {...line} />
      <line x1="108" y1="140" x2="140" y2="140" {...line} strokeWidth={2.5} />
      {/* open journal */}
      <g className="art-bob-slow">
        <path d="M86 122 L100 64 Q132 56 162 70 Q192 56 224 64 L238 122 Q200 110 162 124 Q124 110 86 122 Z" fill={CREAM} {...line} />
        <path d="M162 70 L162 124" {...line} />
        <path d="M108 80 q20 -6 44 0 M106 92 q20 -6 44 0 M104 104 q20 -6 44 0" {...line} strokeWidth={2} fill="none" opacity="0.45" />
        {/* the line being written */}
        <path className="art-write" d="M174 80 q8 -6 16 0 t16 0 t16 0" {...line} strokeWidth={2.5} fill="none" pathLength={100} />
        <path d="M174 94 q18 -5 40 0" {...line} strokeWidth={2} fill="none" opacity="0.45" />
      </g>
      {/* pen */}
      <g className="art-scribble">
        <g transform="translate(222 68) rotate(35)">
          <rect x="-6" y="-38" width="12" height="40" rx="3" fill={TOMATO} {...line} />
          <path d="M-6 2 L0 14 L6 2 Z" fill={CREAM} {...line} />
          <rect x="-6" y="-38" width="12" height="9" rx="2" fill={INK} />
        </g>
      </g>
    </>
  )
}

// Clouddley: a cloud fed by servers, data dashing up the wires.
function Cloud() {
  return (
    <>
      <Sparkle x={52} y={44} fill={SUN} />
      <Sparkle x={276} y={150} s={0.8} fill={CREAM} delay="-1.2s" />
      {/* small background cloud */}
      <g className="art-drift-slow" opacity="0.9">
        <path d="M232 52 a12 12 0 0 1 20 -8 a14 14 0 0 1 26 6 a10 10 0 0 1 0 20 h-42 a9 9 0 0 1 -4 -18 z" fill={CREAM} {...line} strokeWidth={2.5} />
      </g>
      {/* wires */}
      <path className="art-flow" d="M118 138 L130 104" {...line} strokeWidth={2.5} strokeDasharray="4 7" fill="none" />
      <path className="art-flow" d="M206 138 L192 104" {...line} strokeWidth={2.5} strokeDasharray="4 7" fill="none" style={{ animationDelay: '-0.4s' }} />
      {/* main cloud */}
      <g className="art-drift">
        <path d="M98 104 a22 22 0 0 1 12 -40 a32 32 0 0 1 58 -12 a28 28 0 0 1 48 20 a22 22 0 0 1 -6 32 z" fill={CREAM} {...line} />
        <circle cx="140" cy="84" r="3.5" fill={INK} />
        <circle cx="176" cy="84" r="3.5" fill={INK} />
        <path d="M150 94 q8 7 16 0" {...line} strokeWidth={2.5} fill="none" />
      </g>
      {/* servers */}
      {[{ x: 88, c: MINT, d: '0s' }, { x: 176, c: SUN, d: '-0.7s' }].map(s => (
        <g key={s.x}>
          <rect x={s.x} y="138" width="60" height="22" rx="4" fill={s.c} {...line} />
          <rect x={s.x} y="160" width="60" height="22" rx="4" fill={s.c} {...line} />
          <circle className="art-blink" style={{ animationDelay: s.d }} cx={s.x + 12} cy="149" r="3.5" fill={INK} />
          <circle className="art-blink" style={{ animationDelay: `calc(${s.d} - 0.5s)` }} cx={s.x + 12} cy="171" r="3.5" fill={INK} />
          <line x1={s.x + 26} y1="149" x2={s.x + 50} y2="149" {...line} strokeWidth={2} />
          <line x1={s.x + 26} y1="171" x2={s.x + 44} y2="171" {...line} strokeWidth={2} />
        </g>
      ))}
    </>
  )
}

// Celestique: a tee swinging on a hanger, price tag flapping.
function Hanger() {
  return (
    <>
      <Sparkle x={62} y={64} fill={SUN} />
      <Sparkle x={262} y={46} s={0.8} fill={CREAM} delay="-0.8s" />
      <line x1="40" y1="30" x2="280" y2="30" {...line} strokeWidth={4} />
      <g className="art-swing-hook">
        <path d="M150 30 q0 -10 10 -10 q10 0 10 10 q0 8 -10 12 v8" {...line} fill="none" />
        <path d="M160 50 L104 84 H216 Z" {...line} fill="none" />
        {/* tee */}
        <path d="M128 84 L146 78 Q160 92 174 78 L192 84 L214 108 L198 120 L192 112 L192 178 L128 178 L128 112 L122 120 L106 108 Z" fill={SUN} {...line} />
        <path d="M146 78 Q160 92 174 78" {...line} fill="none" />
        <path d="M144 126 h32" {...line} strokeWidth={2.5} opacity="0.5" />
        <circle cx="160" cy="146" r="10" fill={GUM} {...line} strokeWidth={2.5} />
        {/* tag */}
        <g className="art-flap">
          <line x1="192" y1="120" x2="214" y2="146" {...line} strokeWidth={2} />
          <g transform="translate(214 146) rotate(18)">
            <path d="M0 0 L22 0 L28 10 L22 20 L0 20 Z" fill={CREAM} {...line} strokeWidth={2.5} />
            <circle cx="22" cy="10" r="2.5" fill={INK} />
            <path d="M5 7 h10 M5 13 h7" {...line} strokeWidth={2} />
          </g>
        </g>
      </g>
    </>
  )
}

// Appvarsity: a past-questions sheet ticking itself off, a tossed grad cap,
// and a course card.
function Campus() {
  const rows = [104, 128, 152]
  return (
    <>
      <Sparkle x={54} y={48} fill={SUN} />
      <Sparkle x={290} y={40} s={0.8} fill={CREAM} delay="-1.4s" />
      {/* past-questions sheet */}
      <g transform="rotate(-4 136 124)">
        <rect x="84" y="62" width="104" height="124" rx="6" fill={CREAM} {...line} />
        <rect x="98" y="76" width="52" height="9" rx="3" fill={TOMATO} {...line} strokeWidth={2} />
        {rows.map((y, i) => (
          <g key={y}>
            <rect x="98" y={y - 7} width="15" height="15" rx="3" fill={CREAM} {...line} strokeWidth={2.5} />
            <path className="art-check" style={{ animationDelay: `${i * 0.45}s` }}
              d={`M101 ${y} l4 4 l7 -9`} {...line} strokeWidth={3} stroke={INK} fill="none" pathLength={100} />
            <path d={`M122 ${y} h${44 - i * 8}`} {...line} strokeWidth={2.5} opacity="0.45" />
          </g>
        ))}
      </g>
      {/* course card */}
      <g className="art-bob-slow" style={{ animationDelay: '-1.5s' }}>
        <rect x="204" y="124" width="80" height="56" rx="8" fill={PERI} {...line} />
        <g className="art-pulse">
          <circle cx="244" cy="146" r="13" fill={CREAM} {...line} strokeWidth={2.5} />
          <path d="M240 139 L251 146 L240 153 Z" fill={INK} />
        </g>
        <rect x="214" y="166" width="60" height="5" rx="2.5" fill={CREAM} stroke={INK} strokeWidth={1.5} />
        <rect className="art-progress" x="214" y="166" width="60" height="5" rx="2.5" fill={TOMATO} />
      </g>
      {/* graduation cap */}
      <g className="art-toss">
        <path d="M208 74 v14 q26 12 52 0 v-14" fill={INK} {...line} />
        <path d="M190 66 L234 48 L278 66 L234 84 Z" fill={INK} {...line} />
        <circle cx="234" cy="66" r="3" fill={SUN} />
        <g className="art-tassel">
          <path d="M234 66 L266 72 L266 92" stroke={SUN} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="261" y="90" width="10" height="12" rx="2" fill={SUN} {...line} strokeWidth={2} />
        </g>
      </g>
    </>
  )
}

const SCENES: Record<string, () => JSX.Element> = { journals: Journals, cloud: Cloud, hanger: Hanger, campus: Campus }

export const hasArt = (art?: string) => !!art && art in SCENES

export default function ProjectArt({ art, title }: { art: string; title: string }) {
  const Scene = SCENES[art]
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={`Illustration for ${title}`} className="absolute inset-0 w-full h-full">
      <Scene />
    </svg>
  )
}
