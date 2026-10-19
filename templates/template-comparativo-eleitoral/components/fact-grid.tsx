'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { type CorCandidato, type Fato, corClasses } from '@/lib/candidatos'
import { EvidenceModal } from '@/components/evidence-modal'

export function FactGrid({ fatos, cor }: { fatos: Fato[]; cor: CorCandidato }) {
  const [selecionado, setSelecionado] = useState<Fato | null>(null)
  const [aberto, setAberto] = useState(false)
  const classes = corClasses[cor]

  return (
    <>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fatos.map((fato, i) => (
          <li
            key={fato.id}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              type="button"
              onClick={() => {
                setSelecionado(fato)
                setAberto(true)
              }}
              className={`group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-sm border-t-4 bg-card p-5 text-left shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amarelo ${classes.border}`}
            >
              <span className={`text-xs font-bold uppercase tracking-widest ${classes.text}`}>
                {fato.tema}
              </span>
              <span className="font-serif text-xl font-semibold leading-snug text-pretty">
                {fato.titulo}
              </span>
              <span className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4 text-sm">
                <span className="font-semibold text-muted-foreground">
                  {fato.evidencias.length} {fato.evidencias.length === 1 ? 'evidência' : 'evidências'}
                </span>
                <span className="flex items-center gap-1 font-bold text-azul">
                  Ver
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-amarelo transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>

      <EvidenceModal
        fato={selecionado}
        cor={cor}
        open={aberto}
        onOpenChange={setAberto}
      />
    </>
  )
}
