import { ACCENT, INK } from './Sketch'
import type { BlogPost } from '@/constants/blogs'

// Little animated drawings that stand in for a post's cover on its journal
// card. Each loops quietly on its own and picks up speed when the card
// (a .group) is hovered. Pick one per post with `art` in constants/blogs.ts.

const line = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const mono = { fontFamily: 'var(--font-mono)', fontWeight: 600 }

// Three workspaces, one shared table. Every row carries its tenant's colour,
// and requests only reach the table through the tenant_id check.
function Tenants() {
  const homes = [
    { x: 60, c: ACCENT.gum, d: '0s' },
    { x: 120, c: ACCENT.sun, d: '.12s' },
    { x: 180, c: ACCENT.mint, d: '.24s' },
  ]
  return (
    <>
      {homes.map(h => (
        <path key={`flow${h.x}`} d={`M${h.x} 54 Q${h.x} 70 120 78`} {...line} strokeWidth={2.5} strokeDasharray="4 7" fill="none"
          className="art-flow group-hover:[animation-duration:.3s]" />
      ))}
      {homes.map(h => (
        <g key={h.x} className="[transform-box:fill-box] group-hover:animate-[art-hop_.7s_ease-in-out_infinite]" style={{ animationDelay: h.d }}>
          <path d={`M${h.x - 17} 54 V34 L${h.x} 18 L${h.x + 17} 34 V54 Z`} fill={h.c} {...line} />
          <rect x={h.x - 5} y="41" width="10" height="13" rx="2" fill={ACCENT.cream} {...line} strokeWidth={2} />
        </g>
      ))}
      {/* the check every query passes through */}
      <g>
        <rect x="82" y="68" width="76" height="20" rx="10" fill={ACCENT.cream} {...line} strokeWidth={2.5} />
        <text x="120" y="82" fontSize="10.5" textAnchor="middle" fill={INK} style={mono}>tenant_id</text>
      </g>
      <path d="M120 88 V96" {...line} strokeWidth={2.5} />
      {/* one shared table, rows owned by different tenants */}
      <rect x="54" y="96" width="132" height="44" rx="7" fill="#FFFDF8" {...line} />
      <path d="M54 107 H186" {...line} strokeWidth={2.5} />
      {[
        { y: 116, c: ACCENT.gum, w: 70 },
        { y: 125, c: ACCENT.mint, w: 52 },
        { y: 134, c: ACCENT.sun, w: 84 },
      ].map((r, i) => (
        <g key={r.y}>
          <circle cx="66" cy={r.y - 1} r="3.5" fill={r.c} stroke={INK} strokeWidth="1.5" />
          <rect x="76" y={r.y - 3} width={r.w} height="4" rx="2" fill={INK} opacity="0.25"
            className="art-blink group-hover:[animation-duration:.5s]" style={{ animationDelay: `${-i * 0.45}s` }} />
        </g>
      ))}
      <circle className="art-blink" cx="176" cy="101.5" r="2.5" fill={ACCENT.mint} />
    </>
  )
}

export const JOURNAL_ART: Record<NonNullable<BlogPost['art']>, { Art: () => JSX.Element; color: string; label: string }> = {
  tenants: { Art: Tenants, color: ACCENT.peri, label: 'Three workspaces sharing one table, each row tagged with its tenant' },
}

export default function JournalArt({ art }: { art: NonNullable<BlogPost['art']> }) {
  const { Art, color, label } = JOURNAL_ART[art]
  return (
    <div className="relative aspect-[16/10] rounded-xl border-[2.5px] border-sb-ink overflow-hidden shadow-[4px_4px_0_#1A1410]" style={{ background: color }}>
      <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(26,20,16,0.14)_1.2px,transparent_1.6px)] [background-size:14px_14px]" />
      <svg viewBox="0 0 240 150" role="img" aria-label={label} className="absolute inset-0 w-full h-full">
        <Art />
      </svg>
    </div>
  )
}
