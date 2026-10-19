'use client'

import { ExternalLink, Newspaper, Play } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { type CorCandidato, type Evidencia, type Fato, corClasses, getYoutubeId } from '@/lib/candidatos'

function EvidenceItem({ evidencia }: { evidencia: Evidencia }) {
  const youtubeId = getYoutubeId(evidencia.url)

  return (
    <li>
      <a
        href={evidencia.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 rounded-sm p-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amarelo sm:flex-row"
      >
        {youtubeId ? (
          <span className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-sm bg-muted sm:w-44">
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/10">
              <span className="flex size-10 items-center justify-center rounded-full bg-amarelo text-azul shadow">
                <Play className="size-4 translate-x-px fill-current" aria-hidden="true" />
              </span>
            </span>
          </span>
        ) : (
          <span className="hidden aspect-video w-44 shrink-0 items-center justify-center rounded-sm bg-muted text-muted-foreground sm:flex">
            <Newspaper className="size-8" aria-hidden="true" />
          </span>
        )}
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {youtubeId ? 'Vídeo' : 'Reportagem'} · {evidencia.fonte} · {evidencia.data}
          </span>
          <span className="flex items-start gap-1.5 font-serif text-lg font-semibold leading-snug text-azul group-hover:underline">
            {evidencia.titulo}
            <ExternalLink className="mt-1 size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground">{evidencia.descricao}</span>
        </span>
      </a>
    </li>
  )
}

export function EvidenceModal({
  fato,
  cor,
  open,
  onOpenChange,
}: {
  fato: Fato | null
  cor: CorCandidato
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const classes = corClasses[cor]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-sm p-0 sm:max-w-2xl">
        {fato && (
          <>
            <div className={`h-1.5 shrink-0 ${classes.bg}`} aria-hidden="true" />
            <div className="flex flex-col gap-2 border-b border-border px-6 pb-5 pt-6 pr-12">
              <span className={`text-xs font-bold uppercase tracking-widest ${classes.text}`}>
                {fato.tema}
              </span>
              <DialogTitle className="font-serif text-2xl font-bold leading-tight text-balance">
                {fato.titulo}
              </DialogTitle>
              <DialogDescription>
                {fato.evidencias.length}{' '}
                {fato.evidencias.length === 1 ? 'evidência encontrada' : 'evidências encontradas'}
              </DialogDescription>
            </div>
            <ul className="flex flex-col gap-1 overflow-y-auto p-3">
              {fato.evidencias.map((evidencia) => (
                <EvidenceItem key={evidencia.url + evidencia.titulo} evidencia={evidencia} />
              ))}
            </ul>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
