'use client'
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { desk, type DeskItem, type DeskObject } from '@/constants/interests'
import { TikTokLogo } from './BrandIcons'
import { ACCENT, Container, INK, Pop, Section, SectionHeading, isPlaceholder, vars } from './Sketch'

// "Outside the editor" as an illustrated desk, seen from above. Every object
// idles with a small loop (art-* classes in globals.css); hover, focus or tap
// one and it lifts off the desk and a speech bubble says what it's about.

const W = 1000
const H = 580
const CREAM = ACCENT.cream
const line = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const hand = { fontFamily: 'var(--font-hand)', fontWeight: 700 }

type ArtProps = { on: boolean }

// ── The drawings, each centred on (0, 0) ──

// A MacBook-ish laptop, shut and asleep. Pick it up and it wakes: screen
// light leaks out of the hinge and the sign flips.
const Laptop = ({ on }: ArtProps) => (
  <>
    <defs>
      <linearGradient id="laptop-lid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ECEAE6" />
        <stop offset="1" stopColor="#C7C3BC" />
      </linearGradient>
      <clipPath id="laptop-clip"><rect x="-135" y="-92" width="270" height="184" rx="18" /></clipPath>
      <filter id="laptop-glow" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="8" /></filter>
    </defs>
    {/* screen light leaking from under the lid */}
    <ellipse cx="0" cy="96" rx="120" ry="14" fill={ACCENT.peri} filter="url(#laptop-glow)"
      style={{ opacity: on ? 0.9 : 0, transition: 'opacity .4s' }} />
    <rect x="-135" y="-92" width="270" height="184" rx="18" fill="url(#laptop-lid)" {...line} />
    <g clipPath="url(#laptop-clip)">
      <rect x="-135" y="70" width="270" height="22" fill="#A9A49C" />
      <rect className="art-sheen" x="-60" y="-120" width="34" height="240" fill="#FFFFFF" opacity="0.45" transform="skewX(-20)" />
    </g>
    <rect x="-135" y="-92" width="270" height="184" rx="18" fill="none" {...line} />
    <path d="M-135 70 H135" {...line} strokeWidth={2.5} />
    {/* stickers */}
    <g transform="translate(-6 -18) rotate(-6)">
      <rect x="-42" y="-26" width="84" height="52" rx="12" fill={ACCENT.sun} {...line} strokeWidth={2.5} />
      <text x="0" y="11" textAnchor="middle" fontSize="30" fill={INK} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>&lt;/&gt;</text>
    </g>
    <circle cx="96" cy="34" r="19" fill={ACCENT.gum} {...line} strokeWidth={2.5} />
    <text x="96" y="40" textAnchor="middle" fontSize="18" fill={INK} style={hand}>hi!</text>
    <path d="M-104 -66 l-10 22 h12 l-6 20 l20 -28 h-12 l8 -14 z" fill={ACCENT.mint} {...line} strokeWidth={2} />
    {/* zzz, until it wakes up */}
    <g style={{ opacity: on ? 0 : 1, transition: 'opacity .3s' }}>
      <text className="art-steam" x="132" y="-86" fontSize="20" fill={INK} style={hand}>z</text>
      <text className="art-steam" x="148" y="-104" fontSize="26" fill={INK} style={{ ...hand, animationDelay: '-0.9s' }}>z</text>
      <text className="art-steam" x="168" y="-124" fontSize="32" fill={INK} style={{ ...hand, animationDelay: '-1.8s' }}>Z</text>
    </g>
    {/* the sign, hanging from a hook on the lid */}
    <circle cx="-62" cy="22" r="4" fill={INK} />
    <g className="art-sign">
      <path d="M-62 22 L-112 46 M-62 22 L-12 46" {...line} strokeWidth={2} fill="none" />
      <g style={{ transform: on ? 'rotateX(180deg)' : 'none', transformBox: 'fill-box', transformOrigin: 'center', transition: 'transform .45s cubic-bezier(.34,1.56,.64,1)' }}>
        <rect x="-140" y="44" width="156" height="34" rx="6" fill={on ? ACCENT.mint : CREAM} {...line} strokeWidth={2.5} />
      </g>
      <text x="-62" y="67" textAnchor="middle" fontSize="19" fill={INK} style={hand}>
        {on ? 'one more commit…' : 'closed for today'}
      </text>
    </g>
  </>
)

// AirPods: the case sits open with one bud tucked in and the other out on the
// desk, playing (the notes float up from it). Pick it up and the lid swings
// fully open and the status light blinks green.
const AirPods = ({ on }: ArtProps) => (
  <>
    {/* lid, hinged at the back; it opens wider when picked up */}
    <g style={{ transform: on ? 'scaleY(1)' : 'scaleY(0.72)', transformBox: 'fill-box', transformOrigin: '50% 100%', transition: 'transform .45s cubic-bezier(.34,1.56,.64,1)' }}>
      <rect x="-56" y="-80" width="112" height="54" rx="24" fill="#F4F1EC" {...line} />
      <rect x="-44" y="-70" width="88" height="34" rx="16" fill="#E4DFD7" />
    </g>
    {/* base: one bud in its well */}
    <rect x="-58" y="-30" width="116" height="76" rx="26" fill="#FFFFFF" {...line} />
    <path d="M-40 -30 H40" {...line} strokeWidth={2.5} />
    <rect x="-44" y="-20" width="88" height="38" rx="17" fill="#DCD6CD" {...line} strokeWidth={2} />
    <circle cx="-19" cy="-1" r="12" fill="#FFFFFF" {...line} strokeWidth={2.5} />
    <ellipse cx="-11" cy="-5" rx="2.4" ry="4.6" transform="rotate(30 -11 -5)" fill="#6B645B" />
    {/* the empty well its partner came out of */}
    <circle cx="19" cy="-1" r="11" fill="#B9B1A6" stroke={INK} strokeWidth="2" opacity="0.8" />
    {/* status light */}
    <circle cx="0" cy="31" r="4" fill={on ? ACCENT.mint : '#CFC8BE'} stroke={INK} strokeWidth="1.5"
      className={on ? 'art-blink' : undefined} style={{ transition: 'fill .3s' }} />
    {/* the bud that's out, playing */}
    <g transform="translate(86 26) rotate(-30)">
      <rect x="-5" y="4" width="10" height="34" rx="5" fill="#FFFFFF" {...line} strokeWidth={2.5} />
      <circle cx="0" cy="0" r="13" fill="#FFFFFF" {...line} strokeWidth={2.5} />
      <ellipse cx="-6" cy="-5" rx="2.6" ry="5" transform="rotate(35 -6 -5)" fill="#6B645B" />
    </g>
    <g className="art-bob-slow">
      <circle cx="104" cy="-40" r="7" fill={INK} />
      <path d="M111 -40 V-68 L126 -63" {...line} fill="none" />
    </g>
    <g className="art-bob-slow" style={{ animationDelay: '-2s' }}>
      <circle cx="132" cy="-8" r="6" fill={INK} />
      <path d="M138 -8 V-30" {...line} fill="none" />
    </g>
  </>
)

const Camera = () => (
  <>
    <rect x="-34" y="-62" width="44" height="20" rx="5" fill="#2E2B33" {...line} />
    <rect x="-74" y="-46" width="148" height="92" rx="16" fill="#2E2B33" {...line} />
    <circle cx="0" cy="0" r="34" fill={ACCENT.peri} {...line} />
    <circle cx="0" cy="0" r="18" fill={INK} />
    <circle cx="-7" cy="-8" r="5" fill={CREAM} />
    <circle className="art-blink" cx="54" cy="-28" r="7" fill={ACCENT.tomato} />
    <text x="40" y="-24" textAnchor="end" fontSize="13" fill={CREAM} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>REC</text>
  </>
)

const Notepad = () => (
  <>
    <rect x="-62" y="-80" width="124" height="160" rx="6" fill={CREAM} {...line} />
    <rect x="-62" y="-80" width="124" height="22" rx="6" fill={ACCENT.mint} {...line} />
    {[-34, -12, 10, 32, 54].map((y, i) => (
      <path key={y} d={`M-44 ${y} H${i === 4 ? 0 : 44}`} {...line} strokeWidth={2} opacity="0.35" />
    ))}
    <path className="art-write" d="M-44 -34 q10 -6 20 0 t20 0 t20 0 t20 0" {...line} strokeWidth={2.5} fill="none" pathLength={100} />
    <g transform="translate(52 40) rotate(-35)">
      <rect x="-5" y="-50" width="10" height="50" rx="3" fill={ACCENT.peri} {...line} strokeWidth={2.5} />
      <path d="M-5 0 L0 10 L5 0 Z" fill={INK} />
    </g>
  </>
)

// An anime episode mid-shout: speed lines, a spiky-haired hero with big
// shiny eyes, a manga sound effect and a play bar. Poke it and he powers up.
const Screen = ({ on }: ArtProps) => (
  <>
    <defs>
      <clipPath id="screen-clip"><rect x="-86" y="-52" width="172" height="104" rx="7" /></clipPath>
      <linearGradient id="screen-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={ACCENT.sun} />
        <stop offset="1" stopColor={ACCENT.tomato} />
      </linearGradient>
    </defs>
    <rect x="-100" y="-66" width="200" height="132" rx="16" fill="#2E2B33" {...line} />
    <g clipPath="url(#screen-clip)">
      <rect x="-86" y="-52" width="172" height="104" fill="url(#screen-sky)" />
      {/* speed lines rushing out from the hero */}
      <g className="art-pulse" style={{ transformOrigin: '0px 20px' }}>
        {Array.from({ length: 18 }, (_, i) => i * 20).map(a => (
          <path key={a} d="M0 -46 L-3 -110 L3 -110 Z" fill="#FFFFFF" opacity="0.55" transform={`translate(0 20) rotate(${a})`} />
        ))}
      </g>
      {/* power-up aura */}
      <circle cx="0" cy="22" r="44" fill="#FFFFFF" style={{ opacity: on ? 0.55 : 0, transition: 'opacity .3s' }} />
      <g transform="translate(0 -6)"><g className={on ? 'art-shake' : undefined}>
        {/* spiky hair */}
        <path d="M-34 14 L-46 -8 L-28 -6 L-34 -32 L-14 -16 L-8 -42 L4 -18 L18 -40 L20 -14 L40 -28 L32 -4 L48 0 L32 14 Z" fill="#E4E1EA" {...line} strokeWidth={2.5} />
        {/* face */}
        <path d="M-26 6 Q-26 40 0 48 Q26 40 26 6 Z" fill="#FFE2C4" {...line} strokeWidth={2.5} />
        <path d="M-26 6 L-14 -6 L-6 6 L4 -8 L12 6 L22 -4 L26 6" fill="#E4E1EA" {...line} strokeWidth={2.5} />
        {/* determined brows and big shiny eyes */}
        <path d="M-20 12 L-6 16 M20 12 L6 16" {...line} strokeWidth={3} />
        <ellipse cx="-12" cy="25" rx="6" ry="8" fill="#2F8F5B" {...line} strokeWidth={2} />
        <ellipse cx="12" cy="25" rx="6" ry="8" fill="#2F8F5B" {...line} strokeWidth={2} />
        <circle cx="-14" cy="22" r="2.4" fill="#FFFFFF" />
        <circle cx="10" cy="22" r="2.4" fill="#FFFFFF" />
        {/* mid-shout */}
        <path d="M-6 38 Q0 46 6 38 Z" fill={INK} />
        <path d="M-22 34 l6 -1 M22 34 l-6 -1" stroke={ACCENT.tomato} strokeWidth="2.5" strokeLinecap="round" />
      </g></g>
      {/* manga sound effect */}
      <text x="-74" y="-24" fontSize="22" fontWeight="900" fill="#FFFFFF" stroke={INK} strokeWidth="1.6" paintOrder="stroke" transform="rotate(-12 -74 -24)">ドン!</text>
      <path className="art-twinkle" d="M62 -30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#FFFFFF" {...line} strokeWidth={1.5} />
      {/* play bar */}
      <rect x="-86" y="40" width="172" height="12" fill={INK} opacity="0.55" />
      <path d="M-78 42.5 l6 3.5 l-6 3.5 Z" fill="#FFFFFF" />
      <rect x="-64" y="45" width="140" height="3" rx="1.5" fill="#FFFFFF" opacity="0.35" />
      <rect x="-64" y="45" width="88" height="3" rx="1.5" fill={ACCENT.gum} />
      <circle cx="24" cy="46.5" r="3.5" fill="#FFFFFF" />
    </g>
    <rect x="-86" y="-52" width="172" height="104" rx="7" fill="none" {...line} strokeWidth={2.5} />
  </>
)

const Controller = () => (
  <>
    <path d="M-92 -18 Q-82 -48 -46 -48 H46 Q82 -48 92 -18 L106 40 Q111 72 82 72 Q64 72 54 46 H-54 Q-64 72 -82 72 Q-111 72 -106 40 Z" fill={CREAM} {...line} />
    <rect x="-32" y="-44" width="64" height="34" rx="7" fill={ACCENT.peri} {...line} strokeWidth={2.5} />
    <circle cx="-30" cy="18" r="13" fill={INK} />
    <circle cx="30" cy="18" r="13" fill={INK} />
    <path d="M-70 -16 v24 M-82 -4 h24" stroke={INK} strokeWidth="7" strokeLinecap="round" />
    {[
      { x: 70, y: -26, c: ACCENT.mint, d: '0s' },
      { x: 84, y: -12, c: ACCENT.tomato, d: '-0.35s' },
      { x: 56, y: -12, c: ACCENT.gum, d: '-0.7s' },
      { x: 70, y: 2, c: ACCENT.peri, d: '-1.05s' },
    ].map(b => <circle key={`${b.x}${b.y}`} className="art-blink" style={{ animationDelay: b.d }} cx={b.x} cy={b.y} r="6" fill={b.c} {...line} strokeWidth={2} />)}
  </>
)

const Parfait = () => (
  <>
    <defs>
      <clipPath id="parfait-glass">
        <path d="M-34 -46 H34 L26 50 Q24 58 16 58 H-16 Q-24 58 -26 50 Z" />
      </clipPath>
    </defs>
    {/* spoon, dipping in and out */}
    <g className="art-dip">
      <path d="M8 -40 L30 -96" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M8 -40 L30 -96" stroke={ACCENT.peri} strokeWidth="4" strokeLinecap="round" />
    </g>
    <g clipPath="url(#parfait-glass)">
      <rect x="-40" y="-50" width="80" height="24" fill="#FFF6EA" />
      <rect x="-40" y="-26" width="80" height="22" fill={ACCENT.gum} />
      <rect x="-40" y="-4" width="80" height="22" fill="#D39A55" />
      {[-20, -4, 12, 26].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 4 : 10} r="2.5" fill="#8A5A2B" />)}
      <rect x="-40" y="18" width="80" height="44" fill="#FFF6EA" />
      <rect x="-40" y="36" width="80" height="6" fill={ACCENT.gum} opacity="0.5" />
    </g>
    <path d="M-34 -46 H34 L26 50 Q24 58 16 58 H-16 Q-24 58 -26 50 Z" fill="none" {...line} />
    <path d="M-24 -30 L-20 40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    {/* fruit on top */}
    <circle cx="-16" cy="-52" r="9" fill={ACCENT.tomato} {...line} strokeWidth={2} />
    <circle cx="4" cy="-55" r="7" fill={ACCENT.peri} {...line} strokeWidth={2} />
    <circle cx="20" cy="-50" r="6" fill={ACCENT.gum} {...line} strokeWidth={2} />
    <path d="M-16 -61 q4 -8 10 -6" stroke="#2F8F5B" strokeWidth="3" fill="none" strokeLinecap="round" />
  </>
)

// Jollof rice and chicken, with the wooden spoon that made it.
const Plate = () => (
  <>
    <path className="art-steam" d="M-22 -60 q-8 -12 0 -24 t0 -24" {...line} strokeWidth={2.5} fill="none" opacity="0.45" />
    <path className="art-steam" style={{ animationDelay: '-1.3s' }} d="M4 -64 q-8 -12 0 -24 t0 -24" {...line} strokeWidth={2.5} fill="none" opacity="0.45" />
    <circle cx="0" cy="0" r="74" fill={CREAM} {...line} />
    <circle cx="0" cy="0" r="58" fill="#FFFDF8" {...line} strokeWidth={2} opacity="0.9" />
    <path d="M-48 -6 Q-46 -40 -10 -44 Q26 -46 40 -20 Q48 2 26 24 Q-2 40 -30 28 Q-52 16 -48 -6 Z" fill="#E0622F" {...line} strokeWidth={2.5} />
    {[[-30, -18], [-14, -30], [6, -26], [22, -14], [-36, 4], [-18, 10], [2, -6], [14, 10], [-8, 22], [-24, -2]].map(([x, y]) => (
      <path key={`${x}${y}`} d={`M${x} ${y} l5 -2`} stroke="#FFE2C4" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    <circle cx="-2" cy="-14" r="3.5" fill="#3E9B5F" />
    <circle cx="-28" cy="14" r="3.5" fill="#3E9B5F" />
    {/* drumstick */}
    <g transform="translate(22 18) rotate(-28)">
      <ellipse cx="0" cy="0" rx="28" ry="19" fill="#B8642B" {...line} strokeWidth={2.5} />
      <path d="M-12 -6 q8 -4 16 0" stroke="#E39A5B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="24" y="-5" width="22" height="10" rx="4" fill="#FFF6EA" {...line} strokeWidth={2} />
      <circle cx="48" cy="-6" r="6" fill="#FFF6EA" {...line} strokeWidth={2} />
      <circle cx="48" cy="6" r="6" fill="#FFF6EA" {...line} strokeWidth={2} />
    </g>
    {/* wooden spoon, giving it a stir */}
    <g className="art-stir">
      <g transform="translate(-74 40) rotate(-40)">
        <rect x="-5" y="-6" width="10" height="70" rx="5" fill="#D9A066" {...line} strokeWidth={2.5} />
        <ellipse cx="0" cy="-20" rx="15" ry="21" fill="#D9A066" {...line} strokeWidth={2.5} />
      </g>
    </g>
  </>
)

// A team sticker that sits beside a ball: club colours, no crest.
const TeamTag = ({ x, y, r, text, bg, stripe, fg }: { x: number; y: number; r: number; text: string; bg: string; stripe: string; fg: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x="-30" y="-15" width="60" height="30" rx="7" fill={bg} {...line} strokeWidth={2.5} />
    <rect x="-8" y="-13.5" width="16" height="27" fill={stripe} />
    <text x="0" y="7" textAnchor="middle" fontSize="20" fill={fg} stroke={INK} strokeWidth="0.6" style={hand}>{text}</text>
  </g>
)

// PSG: a football that rocks in place, then rolls off its sticker and back.
const Football = ({ on }: ArtProps) => (
  <>
    <TeamTag x={46} y={22} r={8} text="PSG" bg="#1B2A5E" stripe="#DA291C" fg="#FFFFFF" />
    <g transform="translate(-24 -4)">
      <g className={on ? 'art-roll' : 'art-rock'}>
        <circle cx="0" cy="0" r="40" fill="#FFFFFF" {...line} />
        <path d="M0 -13 L12.4 -4 L7.6 10.5 H-7.6 L-12.4 -4 Z" fill="#1B2A5E" {...line} strokeWidth={2} />
        <path d="M0 -13 V-28 M12.4 -4 L27 -9 M7.6 10.5 L17 23 M-7.6 10.5 L-17 23 M-12.4 -4 L-27 -9" {...line} strokeWidth={2} />
        <path d="M-10 -38 L0 -28 L10 -38 A40 40 0 0 0 -10 -38 Z" fill="#1B2A5E" {...line} strokeWidth={2} />
        <path d="M27 -9 L38.5 -3 A40 40 0 0 0 33 -22 Z" fill="#DA291C" {...line} strokeWidth={2} />
        <path d="M-27 -9 L-38.5 -3 A40 40 0 0 1 -33 -22 Z" fill="#DA291C" {...line} strokeWidth={2} />
        <path d="M17 23 L16 36 A40 40 0 0 0 30 26 Z" fill="#1B2A5E" {...line} strokeWidth={2} />
        <path d="M-17 23 L-16 36 A40 40 0 0 1 -30 26 Z" fill="#1B2A5E" {...line} strokeWidth={2} />
      </g>
    </g>
  </>
)

// Warriors: a basketball spinning lazily on the desk; pick it up and it bounces.
const Basketball = ({ on }: ArtProps) => (
  <>
    <TeamTag x={-48} y={22} r={-8} text="GSW" bg="#1D428A" stripe="#FFC72C" fg="#FFFFFF" />
    <g transform="translate(24 -4)">
      <g className={on ? 'art-bounce' : 'art-spin-slow'}>
        <circle cx="0" cy="0" r="40" fill="#E8803A" {...line} />
        <path d="M-40 0 H40 M0 -40 V40 M-28 -28 Q-10 0 -28 28 M28 -28 Q10 0 28 28" {...line} strokeWidth={2.5} fill="none" />
        <path d="M-22 -26 q10 -8 22 -8" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>
    </g>
  </>
)

// A dumbbell on the mat. Pick it up and it does reps.
const Plates = ({ side }: { side: 1 | -1 }) => (
  <g transform={`scale(${side} 1)`}>
    <rect x="48" y="-12" width="10" height="24" rx="3" fill="#B9B4AC" {...line} strokeWidth={2.5} />
    <rect x="58" y="-36" width="18" height="72" rx="6" fill={ACCENT.tomato} {...line} />
    <rect x="76" y="-27" width="14" height="54" rx="5" fill={ACCENT.sun} {...line} />
    <path d="M63 -26 V-10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
  </g>
)
const Dumbbell = ({ on }: ArtProps) => (
  <g className={on ? 'art-reps' : 'art-rock'}>
    <rect x="-50" y="-7" width="100" height="14" rx="6" fill="#8F8A83" {...line} strokeWidth={2.5} />
    {[-30, -18, -6, 6, 18, 30].map(x => <path key={x} d={`M${x} -5 v10`} stroke={INK} strokeWidth="1.5" opacity="0.35" />)}
    <Plates side={1} />
    <Plates side={-1} />
    {on && <path d="M-34 52 h20 M-6 58 h12 M14 52 h20" {...line} strokeWidth={2.5} opacity="0.4" />}
  </g>
)

// Penny, white and gold, curled up asleep on the mat: she breathes, her tail
// tip flicks and the z's drift up. Pick her up and she wakes: ears perk, head
// lifts, and she gives you a slow cat blink (that's cat for "I like you").
const GOLD = '#E8AE4F'
const PINK = '#F4A6B4'
const FUR = '#FFFDF8'
const TailTip = ({ color, width }: { color: string; width: number }) => (
  <g transform="translate(16 44)">
    <g className="art-tail" style={{ transformBox: 'view-box', transformOrigin: '0 0' }}>
      <path d="M0 0 q-10 0 -14 -12" stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" />
    </g>
  </g>
)
const Cat = ({ on }: ArtProps) => {
  const ease = 'transform .45s cubic-bezier(.34,1.56,.64,1)'
  const ear = (side: 1 | -1) => ({
    transform: on ? 'rotate(0)' : `rotate(${side * 14}deg)`,
    transformBox: 'fill-box' as const, transformOrigin: '50% 100%', transition: ease,
  })
  return (
    <>
      <defs>
        <clipPath id="penny-body"><ellipse cx="12" cy="8" rx="60" ry="30" /></clipPath>
        <clipPath id="penny-head"><circle r="27" /></clipPath>
      </defs>
      {/* body, rising and falling as she breathes */}
      <g className="art-breathe">
        <ellipse cx="12" cy="8" rx="60" ry="30" fill={FUR} />
        <g clipPath="url(#penny-body)">
          <ellipse cx="44" cy="-16" rx="48" ry="26" fill={GOLD} />
          <ellipse cx="-4" cy="-24" rx="18" ry="12" fill={GOLD} />
        </g>
        <ellipse cx="12" cy="8" rx="60" ry="30" fill="none" {...line} />
      </g>
      {/* tail wrapped round the front, tip flicking */}
      <path d="M64 18 C92 26 86 46 52 44 H16" stroke={INK} strokeWidth="19" fill="none" strokeLinecap="round" />
      <TailTip color={INK} width={19} />
      <path d="M64 18 C92 26 86 46 52 44 H16" stroke={GOLD} strokeWidth="13" fill="none" strokeLinecap="round" />
      <TailTip color={FUR} width={13} />
      {/* tucked paws */}
      <ellipse cx="-34" cy="30" rx="11" ry="7" fill={FUR} {...line} strokeWidth={2.5} />
      <ellipse cx="-14" cy="33" rx="11" ry="7" fill={FUR} {...line} strokeWidth={2.5} />
      {/* head: lifts when she wakes */}
      <g transform="translate(-44 -2)">
        <g style={{ transform: on ? 'translateY(-6px) rotate(-6deg)' : 'none', transformBox: 'fill-box', transformOrigin: '50% 100%', transition: ease }}>
          <g style={ear(-1)}>
            <path d="M-23 -12 L-25 -42 L-3 -25 Z" fill={FUR} {...line} strokeWidth={2.5} />
            <path d="M-19 -17 L-21 -34 L-9 -25 Z" fill={PINK} />
          </g>
          <g style={ear(1)}>
            <path d="M23 -12 L25 -42 L3 -25 Z" fill={GOLD} {...line} strokeWidth={2.5} />
            <path d="M19 -17 L21 -34 L9 -25 Z" fill={PINK} />
          </g>
          <circle r="27" fill={FUR} />
          <g clipPath="url(#penny-head)">
            <path d="M2 -30 Q30 -30 30 0 Q20 -4 14 -10 Q6 -14 2 -30 Z" fill={GOLD} />
          </g>
          <circle r="27" fill="none" {...line} />
          {on ? (
            <g className="art-slowblink">
              {[-10, 10].map(x => (
                <g key={x}>
                  <ellipse cx={x} cy="1" rx="4" ry="5.5" fill="#3E7D4F" stroke={INK} strokeWidth="2" />
                  <ellipse cx={x} cy="1.5" rx="1.6" ry="4" fill={INK} />
                  <circle cx={x - 1.5} cy="-1.5" r="1.3" fill="#FFFFFF" />
                </g>
              ))}
            </g>
          ) : (
            <path d="M-15 1 q5 5 10 0 M5 1 q5 5 10 0" {...line} strokeWidth={2.5} fill="none" />
          )}
          <path d="M-3 9 h6 l-3 4 Z" fill={PINK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M-5 15 q2.5 3 5 0 q2.5 3 5 0" {...line} strokeWidth={1.8} fill="none" />
          <path d="M-12 12 L-32 9 M-12 15 L-31 18 M12 12 L32 9 M12 15 L31 18" {...line} strokeWidth={1.4} opacity="0.55" />
          <circle cx="-17" cy="10" r="4" fill={PINK} style={{ opacity: on ? 0.6 : 0, transition: 'opacity .3s' }} />
          <circle cx="17" cy="10" r="4" fill={PINK} style={{ opacity: on ? 0.6 : 0, transition: 'opacity .3s' }} />
        </g>
      </g>
      {/* z's while she sleeps, a heart once she's awake */}
      <g style={{ opacity: on ? 0 : 1, transition: 'opacity .3s' }}>
        <text className="art-steam" x="-92" y="-36" fontSize="18" fill={INK} style={hand}>z</text>
        <text className="art-steam" x="-106" y="-52" fontSize="24" fill={INK} style={{ ...hand, animationDelay: '-1.3s' }}>z</text>
      </g>
      <g className="art-bob-slow" style={{ opacity: on ? 1 : 0, transition: 'opacity .3s' }}>
        <path d="M62 -40 c-4 -8 -16 -4 -12 4 l12 12 l12 -12 c4 -8 -8 -12 -12 -4 Z" fill={ACCENT.gum} {...line} strokeWidth={2} />
      </g>
    </>
  )
}

// ── Lagos time, for the phone ──

// Ticks on the minute (the clock only shows minutes), null until mounted so
// the server and browser never disagree about the time.
function useNow() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      setNow(new Date())
      t = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    }
    tick()
    return () => clearTimeout(t)
  }, [])
  return now
}

type Phase = 'dawn' | 'day' | 'dusk' | 'night'

const lagos = (now: Date) => {
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', ...o }).format(now)
  const h24 = Number(part({ hour: 'numeric', hourCycle: 'h23' }))
  const min = part({ minute: '2-digit' }).padStart(2, '0')
  const day = part({ weekday: 'short' })
  const phase: Phase = h24 >= 5 && h24 < 7 ? 'dawn' : h24 >= 7 && h24 < 17 ? 'day' : h24 >= 17 && h24 < 19 ? 'dusk' : 'night'
  return {
    h24, min, day, phase,
    hour: String(h24 % 12 || 12),
    ampm: h24 < 12 ? 'AM' : 'PM',
    date: `${day} ${part({ day: 'numeric' })}`,
  }
}

// Lagos is UTC+1 all year (no daylight saving), so the gap is simple.
const gapToYou = (now: Date) => {
  const diff = 60 + now.getTimezoneOffset() // minutes Lagos is ahead of you
  if (diff === 0) return "Same time as you, nice."
  const a = Math.abs(diff), h = Math.floor(a / 60), m = a % 60
  const span = m ? `${h}h ${m}m` : `${h} hour${h === 1 ? '' : 's'}`
  return diff > 0 ? `You're ${span} behind me.` : `You're ${span} ahead of me.`
}

// An honest-ish guess at what I'm doing right now.
const guess = ({ h24, day }: ReturnType<typeof lagos>) => {
  const weekend = day === 'Sat' || day === 'Sun'
  if (h24 < 6) return "asleep, I'll reply in the morning"
  if (h24 < 9) return 'parfait, then straight into it'
  if (h24 < 17) return weekend ? 'weekend: football, beats or jollof' : 'probably shipping something'
  if (h24 < 20) return weekend ? 'watching the match, probably' : 'probably at the gym'
  return weekend ? 'Black Clover or Fortnite, honestly' : 'winding down, maybe some anime'
}

const SKY: Record<Phase, [string, string]> = {
  dawn: ['#FF9F7A', '#FFD9A0'],
  day: ['#6FB8FF', '#C4E6FF'],
  dusk: ['#E8567A', '#FFB45E'],
  night: ['#141C45', '#3A3F8F'],
}

// An iPhone lying on its side, charging, in StandBy: a big clock showing the
// time in Lagos. The wallpaper follows the sky there (sunrise, day, sunset,
// night) and the colon blinks. Pick it up and the screen lights up.
const Phone = ({ on }: ArtProps) => {
  const now = useNow()
  const t = now ? lagos(now) : null
  const phase = t?.phase ?? 'day'
  const [top, bottom] = SKY[phase]
  const night = phase === 'night'
  const txt = { fill: '#FFFFFF', stroke: INK, strokeWidth: 1.4, paintOrder: 'stroke' as const }
  return (
    <>
      <defs>
        <linearGradient id="phone-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} style={{ transition: 'stop-color 1s' }} />
          <stop offset="1" stopColor={bottom} style={{ transition: 'stop-color 1s' }} />
        </linearGradient>
        <clipPath id="phone-screen"><rect x="-68" y="-31" width="136" height="62" rx="11" /></clipPath>
        <filter id="phone-glow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
      {/* screen light spilling onto the desk when you pick it up */}
      <ellipse cx="0" cy="6" rx="86" ry="40" fill={bottom} filter="url(#phone-glow)" style={{ opacity: on ? 0.8 : 0, transition: 'opacity .4s' }} />
      {/* charging cable, trailing off the edge of the desk */}
      <path d="M76 0 h6 q16 0 16 26 t-10 120" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M76 0 h6 q16 0 16 26 t-10 120" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <rect x="72" y="-5" width="12" height="10" rx="2.5" fill="#FFFFFF" {...line} strokeWidth={2} />
      {/* body + side button */}
      <rect x="-24" y="-41" width="22" height="5" rx="2.5" fill="#3A3530" {...line} strokeWidth={2} />
      <rect x="-76" y="-39" width="152" height="78" rx="17" fill="#2A2522" {...line} />
      <g clipPath="url(#phone-screen)">
        <rect x="-68" y="-31" width="136" height="62" fill="url(#phone-sky)" />
        {night ? (
          [[-50, -20], [-30, 18], [22, -22], [56, 20], [-58, 10], [6, 22]].map(([x, y], i) => (
            <circle key={i} className="art-twinkle" cx={x} cy={y} r="1.6" fill="#FFF6D8" style={{ animationDelay: `${-i * 0.4}s` }} />
          ))
        ) : (
          <path d="M-68 24 Q-30 12 4 22 T68 18 V31 H-68 Z" fill="#FFFFFF" opacity="0.35" />
        )}
        {/* brighter while picked up */}
        <rect x="-68" y="-31" width="136" height="62" fill="#FFFFFF" style={{ opacity: on ? 0.14 : 0, transition: 'opacity .3s' }} />
      </g>
      <rect x="-68" y="-31" width="136" height="62" rx="11" fill="none" stroke={INK} strokeWidth="2" />
      {/* Dynamic Island, on the left when the phone lies sideways */}
      <rect x="-64" y="-9" width="5.5" height="18" rx="2.75" fill={INK} />
      {/* the clock */}
      <text x="-14" y="11" textAnchor="middle" fontSize="31" {...txt} style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
        {t ? <>{t.hour}<tspan className="art-blink" style={{ animationDuration: '2s' }}>:</tspan>{t.min}</> : '--:--'}
      </text>
      {/* sun, setting sun or moon, then the date and where */}
      <g transform="translate(48 -14)">
        {night ? (
          <path d="M5 -8 A9 9 0 1 0 5 8 A7 7 0 1 1 5 -8 Z" fill="#FFF1B8" {...line} strokeWidth={1.8} />
        ) : phase === 'day' ? (
          <circle r="7.5" fill={ACCENT.sun} {...line} strokeWidth={1.8} />
        ) : (
          <path d="M-8 3 A8 8 0 0 1 8 3 Z M-11 3 H11" fill={ACCENT.sun} {...line} strokeWidth={1.8} />
        )}
      </g>
      <text x="48" y="10" textAnchor="middle" fontSize="10" {...txt} strokeWidth={1} style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t?.date ?? ''}</text>
      <text x="48" y="22" textAnchor="middle" fontSize="7.5" letterSpacing="1" {...txt} strokeWidth={0.8} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>LAGOS</text>
    </>
  )
}

// The phone's bubble, written live: the time, the gap to you, and a guess.
function LagosNote() {
  const now = useNow()
  if (!now) return null
  const t = lagos(now)
  return (
    <>
      <p className="m-0 mt-1.5 text-[14px] leading-snug text-sb-cream/90">
        It&apos;s {t.hour}:{t.min} {t.ampm} in Lagos. {gapToYou(now)}
      </p>
      <p className="m-0 mt-2 font-mono text-[12px] text-sb-mint">now: {guess(t)}</p>
    </>
  )
}

// Where each object sits (x, y, tilt, scale), its hit area, and where its
// bubble opens.
type Spot = {
  x: number; y: number; r: number; s?: number
  hit: [number, number] // half-width, half-height around the drawing's centre
  art: (p: ArtProps) => JSX.Element
  bubble: { x: number; y: number; side: 'above' | 'below'; align: 'start' | 'center' | 'end' }
}
const SPOTS: Record<DeskObject, Spot> = {
  headphones: { x: 140, y: 150, r: -10, s: 1.15, hit: [104, 78], art: AirPods, bubble: { x: 120, y: 235, side: 'below', align: 'start' } },
  laptop: { x: 430, y: 170, r: -4, s: 0.85, hit: [140, 96], art: Laptop, bubble: { x: 430, y: 265, side: 'below', align: 'center' } },
  parfait: { x: 640, y: 150, r: 6, hit: [54, 90], art: Parfait, bubble: { x: 640, y: 225, side: 'below', align: 'center' } },
  camera: { x: 845, y: 155, r: 8, hit: [90, 72], art: Camera, bubble: { x: 875, y: 220, side: 'below', align: 'end' } },
  phone: { x: 118, y: 428, r: -6, s: 1.1, hit: [80, 44], art: Phone, bubble: { x: 70, y: 372, side: 'above', align: 'start' } },
  notepad: { x: 310, y: 432, r: 6, s: 0.95, hit: [70, 90], art: Notepad, bubble: { x: 310, y: 352, side: 'above', align: 'center' } },
  food: { x: 480, y: 424, r: 0, hit: [84, 84], art: Plate, bubble: { x: 480, y: 347, side: 'above', align: 'center' } },
  screen: { x: 668, y: 428, r: -4, s: 0.9, hit: [106, 72], art: Screen, bubble: { x: 668, y: 362, side: 'above', align: 'center' } },
  football: { x: 160, y: 292, r: -4, s: 0.9, hit: [76, 50], art: Football, bubble: { x: 130, y: 342, side: 'below', align: 'start' } },
  basketball: { x: 840, y: 290, r: 4, s: 0.9, hit: [76, 50], art: Basketball, bubble: { x: 870, y: 340, side: 'below', align: 'end' } },
  gym: { x: 645, y: 298, r: -6, s: 0.85, hit: [100, 42], art: Dumbbell, bubble: { x: 645, y: 338, side: 'below', align: 'center' } },
  cat: { x: 450, y: 296, r: -3, s: 0.85, hit: [92, 50], art: Cat, bubble: { x: 450, y: 336, side: 'below', align: 'center' } },
  controller: { x: 870, y: 420, r: 7, s: 0.9, hit: [112, 80], art: Controller, bubble: { x: 885, y: 352, side: 'above', align: 'end' } },
}

const BUBBLE_POS = {
  start: 'left-0 -translate-x-[10%]',
  center: 'left-0 -translate-x-1/2',
  end: 'left-0 -translate-x-[90%]',
}
const TAIL_POS = { start: 'left-[10%]', center: 'left-1/2', end: 'left-[90%]' }

function LinkChip({ link }: { link: NonNullable<DeskItem['links']>[number] }) {
  const cls = 'group inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] px-2 py-1 rounded-md bg-white/10 transition-colors hover:bg-white/25'
  const icon: ReactNode =
    link.icon === 'tiktok' ? <span className="w-3.5 h-3.5 flex"><TikTokLogo /></span>
      : link.icon === 'instagram' ? <InstagramLogoIcon className="w-3.5 h-3.5" aria-hidden="true" />
        : <span aria-hidden="true">✎</span>
  const arrow = <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
  return link.href.startsWith('/')
    ? <Link href={link.href} className={cls}>{icon}{link.label}{arrow}</Link>
    : <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{icon}{link.label}{arrow}</a>
}

function Bubble({ item, onEnter, onLeave }: { item: DeskItem; onEnter: () => void; onLeave: () => void }) {
  const { bubble } = SPOTS[item.id]
  const now = item.now && !isPlaceholder(item.now) ? item.now : null
  return (
    <div
      data-desk={item.id}
      className={`absolute z-20 w-max ${bubble.side === 'above' ? '-translate-y-full pb-3' : 'pt-3'}`}
      style={{ left: `${(bubble.x / W) * 100}%`, top: `${(bubble.y / H) * 100}%` }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* alignment lives on a plain wrapper; framer owns the inner transform */}
      <div className={BUBBLE_POS[bubble.align]}>
      <motion.div
        role="tooltip"
        className="relative w-max max-w-[260px] rounded-xl bg-sb-ink text-sb-cream px-4 pt-2.5 pb-3 shadow-[4px_4px_0_rgba(26,20,16,0.25)]"
        style={{ transformOrigin: bubble.side === 'above' ? 'bottom center' : 'top center' }}
        initial={{ opacity: 0, scale: 0.7, y: bubble.side === 'above' ? 10 : -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
        transition={{ type: 'spring', stiffness: 500, damping: 24 }}
      >
        <p className="m-0 font-hand text-[24px] leading-none text-sb-sun">{item.label}</p>
        {item.id === 'phone' ? <LagosNote /> : (
          <>
            <p className="m-0 mt-1.5 text-[14px] leading-snug text-sb-cream/90">{item.note}</p>
            {now && <p className="m-0 mt-2 font-mono text-[12px] text-sb-mint">now: {now}</p>}
          </>
        )}
        {!!item.links?.length && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {item.links.map(l => <LinkChip key={l.href} link={l} />)}
          </div>
        )}
        <span aria-hidden="true" className={`absolute w-3.5 h-3.5 -ml-[7px] bg-sb-ink rotate-45 ${TAIL_POS[bubble.align]} ${bubble.side === 'above' ? '-bottom-[6px]' : '-top-[6px]'}`} />
      </motion.div>
      </div>
    </div>
  )
}

export default function Interests() {
  const [active, setActive] = useState<DeskObject | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()

  // a short grace period lets the mouse travel from an object into its bubble
  const hold = () => clearTimeout(leaveTimer.current)
  const release = () => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setActive(null), 160)
  }

  // Tap elsewhere or press Escape to close.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.(`[data-desk="${active}"]`)) setActive(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [active])
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const toggle = (id: DeskObject) => setActive(a => (a === id ? null : id))
  const activeItem = desk.find(d => d.id === active)

  return (
    <Container>
      <Section id="into">
        <SectionHeading
          label="THINGS I'M INTO" title="Outside the editor" accent="peri"
          aside={<p className="m-0 font-hand text-[26px] text-sb-gum-deep rotate-2">go on, poke around my desk</p>}
        />
        <Pop>
          <div className="sb-card relative overflow-hidden !p-0" style={vars({ '--sh': ACCENT.peri })}>
            {/* on phones the desk keeps its size and you swipe around it */}
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative min-w-[760px]">
                <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="group" aria-label="My desk">
                  {/* desk top: wood, grain, and a mat */}
                  <rect width={W} height={H} fill="#E8C69B" />
                  {[70, 180, 290, 400, 510].map((y, i) => (
                    <path key={y} d={`M0 ${y} C 250 ${y + (i % 2 ? 14 : -14)}, 600 ${y + (i % 2 ? -12 : 12)}, ${W} ${y}`} stroke="#B98A57" strokeWidth="2" fill="none" opacity="0.35" />
                  ))}
                  <rect x="235" y="44" width="510" height="492" rx="26" fill="#CDE9DA" {...line} strokeWidth={2.5} opacity="0.85" />

                  {desk.map(item => {
                    const s = SPOTS[item.id]
                    const on = active === item.id
                    const dim = !!active && !on
                    return (
                      <g key={item.id} transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.s ?? 1})`}>
                        {/* a shadow appears under whatever you pick up */}
                        <ellipse cx="4" cy="14" rx={s.hit[0] * 0.85} ry={s.hit[1] * 0.7} fill={INK}
                          style={{ opacity: on ? 0.13 : 0, transition: 'opacity .3s' }} />
                        <g
                          data-desk={item.id}
                          role="button"
                          tabIndex={0}
                          aria-label={item.label}
                          aria-expanded={on}
                          className="cursor-pointer outline-none"
                          style={{
                            transform: on ? 'translate(-6px, -10px) scale(1.06)' : 'none',
                            transformBox: 'fill-box',
                            transformOrigin: 'center',
                            opacity: dim ? 0.5 : 1,
                            transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s',
                          }}
                          onPointerEnter={e => { if (e.pointerType === 'mouse') { hold(); setActive(item.id) } }}
                          onPointerLeave={e => e.pointerType === 'mouse' && release()}
                          onPointerUp={e => e.pointerType !== 'mouse' && toggle(item.id)}
                          onFocus={e => (e.target as Element).matches(':focus-visible') && setActive(item.id)}
                          onBlur={e => !(e.relatedTarget as Element | null)?.closest?.(`[data-desk="${item.id}"]`) && setActive(a => (a === item.id ? null : a))}
                          onKeyDown={(e: ReactKeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(item.id))}
                        >
                          {/* generous invisible hit area */}
                          <rect x={-s.hit[0]} y={-s.hit[1]} width={s.hit[0] * 2} height={s.hit[1] * 2} fill="transparent" />
                          <s.art on={on} />
                          {on && <rect x={-s.hit[0] - 4} y={-s.hit[1] - 4} width={s.hit[0] * 2 + 8} height={s.hit[1] * 2 + 8} rx="18" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="6 8" className="art-flow" />}
                        </g>
                      </g>
                    )
                  })}
                </svg>

                <AnimatePresence>
                  {activeItem && <Bubble key={activeItem.id} item={activeItem} onEnter={hold} onLeave={release} />}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Pop>
        <p className="sm:hidden -mt-5 m-0 font-mono text-xs text-sb-muted text-center">swipe around the desk →</p>
      </Section>
    </Container>
  )
}
