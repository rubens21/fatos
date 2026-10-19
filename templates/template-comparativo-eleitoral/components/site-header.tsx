import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export function FlagStripe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-1.5 w-full ${className}`} aria-hidden="true">
      <span className="flex-[3] bg-verde" />
      <span className="flex-1 bg-amarelo" />
      <span className="flex-[3] bg-azul" />
    </div>
  )
}

export function SiteHeader() {
  return (
    <header className="bg-card">
      <div className="bg-azul text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <span className="font-semibold uppercase tracking-widest">Eleições 2026 · Segundo turno</span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck className="size-3.5 text-amarelo" aria-hidden="true" />
            Conteúdo apartidário e verificado
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-4 py-5">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="grid size-11 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-sm"
            aria-hidden="true"
          >
            <span className="bg-verde" />
            <span className="bg-amarelo" />
            <span className="bg-amarelo" />
            <span className="bg-azul" />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-2xl font-bold leading-none tracking-tight text-azul md:text-3xl">
              Observatório do Voto
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Informação verificada para o seu voto
            </span>
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-semibold">
            <li>
              <Link href="/" className="hover:text-verde">
                Candidatos
              </Link>
            </li>
            <li>
              <a href="#metodologia" className="hover:text-verde">
                Metodologia
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <FlagStripe />
    </header>
  )
}
