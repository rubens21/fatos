import { candidatos } from '@/lib/candidatos'
import { CandidateCard } from '@/components/candidate-card'

export default function HomePage() {
  const [a, b] = candidatos

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
      <div className="flex flex-col items-start gap-4 border-b border-border pb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <span className="bg-amarelo px-2 py-1 text-xs font-bold uppercase tracking-widest text-foreground">
          Especial
        </span>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
          Dois candidatos. Uma decisão.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Escolha um candidato para ver suas posições e as evidências por trás de cada uma.
        </p>
      </div>

      <div className="relative mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
        <CandidateCard candidato={a} delay="delay-100" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-amarelo font-serif text-2xl font-black italic text-azul shadow-lg md:flex"
          aria-hidden="true"
        >
          VS
        </div>
        <CandidateCard candidato={b} delay="delay-200" />
      </div>
    </div>
  )
}
