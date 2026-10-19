import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type Candidato, corClasses } from '@/lib/candidatos'

export function CandidateCard({ candidato, delay }: { candidato: Candidato; delay: string }) {
  const cor = corClasses[candidato.cor]

  return (
    <Link
      href={`/candidato/${candidato.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-sm bg-card shadow-sm ring-1 ring-border transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amarelo animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both ${delay}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={candidato.foto}
          alt={`Foto de ${candidato.nome}`}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={`flex items-center justify-between gap-4 px-6 py-5 text-primary-foreground ${cor.bg}`}>
        <h2 className="font-serif text-3xl font-bold leading-tight text-balance md:text-4xl">
          {candidato.nome}
        </h2>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amarelo text-azul transition-transform group-hover:translate-x-1">
          <ArrowRight className="size-5" aria-hidden="true" />
          <span className="sr-only">Ver perfil</span>
        </span>
      </div>
    </Link>
  )
}
