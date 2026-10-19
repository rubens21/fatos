import { FlagStripe } from '@/components/site-header'

export function SiteFooter() {
  return (
    <footer id="metodologia" className="mt-20 bg-azul text-primary-foreground">
      <FlagStripe />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-2xl font-bold">Observatório do Voto</p>
          <p className="max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Iniciativa apartidária que reúne declarações, votações e propostas dos candidatos,
            sempre acompanhadas de fontes públicas e verificáveis.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-amarelo">Metodologia</p>
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            Cada fato publicado é vinculado a pelo menos uma evidência: vídeo, documento oficial ou
            reportagem de veículo reconhecido. Os candidatos são apresentados em ordem alfabética.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-primary-foreground/60">
          © 2026 Observatório do Voto. Conteúdo de exemplo para fins de demonstração.
        </p>
      </div>
    </footer>
  )
}
