import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, FileText } from 'lucide-react'
import { candidatos, corClasses, getCandidato } from '@/lib/candidatos'
import { FactGrid } from '@/components/fact-grid'

export function generateStaticParams() {
  return candidatos.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const candidato = getCandidato(slug)
  if (!candidato) return {}
  return {
    title: `${candidato.nome} — Observatório do Voto`,
    description: `Posições, fatos e evidências sobre ${candidato.nome}.`,
  }
}

export default async function CandidatoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const candidato = getCandidato(slug)
  if (!candidato) notFound()

  const cor = corClasses[candidato.cor]
  const outro = candidatos.find((c) => c.slug !== candidato.slug)
  const totalEvidencias = candidato.fatos.reduce((n, f) => n + f.evidencias.length, 0)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <nav aria-label="Trilha de navegação" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-foreground" aria-current="page">
            {candidato.nome}
          </li>
        </ol>
      </nav>

      <section className="mt-6 grid gap-8 border-b border-border pb-10 md:grid-cols-[320px_1fr] md:gap-12">
        <div className="relative overflow-hidden rounded-sm ring-1 ring-border animate-in fade-in duration-500">
          <div className="relative aspect-[4/5] bg-muted">
            <Image
              src={candidato.foto}
              alt={`Foto de ${candidato.nome}`}
              fill
              priority
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
          <div className={`h-2 ${cor.bg}`} aria-hidden="true" />
        </div>

        <div className="flex flex-col justify-end gap-5 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <span className={`text-xs font-bold uppercase tracking-widest ${cor.text}`}>
            {candidato.partido} · Nº {candidato.numero}
          </span>
          <h1 className="font-serif text-5xl font-bold leading-none tracking-tight text-balance md:text-7xl">
            {candidato.nome}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {candidato.fatos.length} fatos verificados, sustentados por {totalEvidencias} evidências.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={candidato.propostaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-amarelo px-5 py-3 text-sm font-bold text-azul shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azul/30"
            >
              <FileText className="size-4" aria-hidden="true" />
              Ler plano de governo
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="fatos-titulo">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-foreground pb-3">
          <h2 id="fatos-titulo" className="font-serif text-2xl font-bold md:text-3xl">
            Posições e fatos
          </h2>
          <span className="text-sm text-muted-foreground">Clique para ver as evidências</span>
        </div>
        <FactGrid fatos={candidato.fatos} cor={candidato.cor} />
      </section>

      {outro && (
        <Link
          href={`/candidato/${outro.slug}`}
          className="group mt-12 flex items-center justify-between gap-4 rounded-sm bg-muted px-6 py-5 ring-1 ring-border transition-colors hover:bg-card"
        >
          <span className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Compare com
            </span>
            <span className="font-serif text-2xl font-bold">{outro.nome}</span>
          </span>
          <ArrowRight
            className={`size-6 transition-transform group-hover:translate-x-1 ${corClasses[outro.cor].text}`}
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  )
}
