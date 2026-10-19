export type Evidencia = {
  titulo: string
  url: string
  descricao: string
  fonte: string
  data: string
}

export type Fato = {
  id: string
  tema: string
  titulo: string
  evidencias: Evidencia[]
}

export type CorCandidato = 'verde' | 'azul'

export type Candidato = {
  slug: string
  nome: string
  partido: string
  numero: string
  foto: string
  propostaUrl: string
  cor: CorCandidato
  fatos: Fato[]
}

export const candidatos: Candidato[] = [
  {
    slug: 'helena-duarte',
    nome: 'Helena Duarte',
    partido: 'Partido Exemplo A',
    numero: '12',
    foto: '/candidatos/candidata-a.png',
    propostaUrl: 'https://example.com/plano-de-governo-helena-duarte.pdf',
    cor: 'verde',
    fatos: [
      {
        id: 'seguranca',
        tema: 'Segurança pública',
        titulo: 'Apoia investimento em segurança pública com foco em inteligência policial',
        evidencias: [
          {
            titulo: 'Entrevista: Helena Duarte detalha plano para segurança',
            url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
            descricao:
              'Em entrevista de 40 minutos, a candidata explica a proposta de integrar bases de dados das polícias estaduais.',
            fonte: 'YouTube',
            data: '02/09/2026',
          },
          {
            titulo: 'Candidata propõe fundo nacional para inteligência policial',
            url: 'https://example.com/noticia/fundo-inteligencia-policial',
            descricao:
              'Reportagem analisa os valores previstos e as fontes de financiamento apresentadas no programa.',
            fonte: 'Jornal Exemplo',
            data: '28/08/2026',
          },
        ],
      },
      {
        id: 'educacao',
        tema: 'Educação',
        titulo: 'Defende ampliação do ensino em tempo integral',
        evidencias: [
          {
            titulo: 'Debate na TV: trecho sobre educação básica',
            url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            descricao:
              'No primeiro debate, a candidata defendeu a meta de 50% das escolas públicas em tempo integral.',
            fonte: 'YouTube',
            data: '15/09/2026',
          },
          {
            titulo: 'O que dizem especialistas sobre a meta de tempo integral',
            url: 'https://example.com/noticia/tempo-integral-especialistas',
            descricao:
              'Pesquisadores avaliam a viabilidade orçamentária da proposta para os próximos quatro anos.',
            fonte: 'Portal Exemplo',
            data: '18/09/2026',
          },
        ],
      },
      {
        id: 'saude',
        tema: 'Saúde',
        titulo: 'Propõe reduzir filas do SUS com mutirões regionais',
        evidencias: [
          {
            titulo: 'Plano de governo prevê mutirões de cirurgias eletivas',
            url: 'https://example.com/noticia/mutiroes-sus',
            descricao:
              'Documento registrado no TSE cita parcerias com hospitais filantrópicos para zerar filas.',
            fonte: 'Agência Exemplo',
            data: '20/08/2026',
          },
        ],
      },
      {
        id: 'meio-ambiente',
        tema: 'Meio ambiente',
        titulo: 'Votou a favor de metas de redução de desmatamento',
        evidencias: [
          {
            titulo: 'Discurso no plenário sobre metas climáticas',
            url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
            descricao: 'Registro da sessão em que a então parlamentar votou pela aprovação do projeto.',
            fonte: 'YouTube',
            data: '11/03/2024',
          },
          {
            titulo: 'Histórico de votações: meio ambiente',
            url: 'https://example.com/noticia/historico-votacoes-ambiente',
            descricao: 'Levantamento reúne todos os votos da candidata em pautas ambientais desde 2019.',
            fonte: 'Jornal Exemplo',
            data: '05/09/2026',
          },
        ],
      },
      {
        id: 'economia',
        tema: 'Economia',
        titulo: 'Defende reforma tributária com isenção para baixa renda',
        evidencias: [
          {
            titulo: 'Candidata apresenta proposta de faixa de isenção do IR',
            url: 'https://example.com/noticia/isencao-ir',
            descricao: 'Proposta eleva a faixa de isenção e cria nova alíquota para rendas mais altas.',
            fonte: 'Portal Exemplo',
            data: '30/08/2026',
          },
        ],
      },
      {
        id: 'transporte',
        tema: 'Infraestrutura',
        titulo: 'Promete expandir transporte ferroviário de cargas',
        evidencias: [
          {
            titulo: 'Sabatina: perguntas sobre infraestrutura',
            url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            descricao: 'Trecho em que a candidata lista três corredores ferroviários prioritários.',
            fonte: 'YouTube',
            data: '22/09/2026',
          },
        ],
      },
    ],
  },
  {
    slug: 'ricardo-albuquerque',
    nome: 'Ricardo Albuquerque',
    partido: 'Partido Exemplo B',
    numero: '45',
    foto: '/candidatos/candidato-b.png',
    propostaUrl: 'https://example.com/plano-de-governo-ricardo-albuquerque.pdf',
    cor: 'azul',
    fatos: [
      {
        id: 'seguranca',
        tema: 'Segurança pública',
        titulo: 'Apoia aumento do efetivo policial nas ruas',
        evidencias: [
          {
            titulo: 'Comício: candidato promete 30 mil novos policiais',
            url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
            descricao:
              'Gravação do comício em que o candidato anuncia a meta de contratação em parceria com os estados.',
            fonte: 'YouTube',
            data: '06/09/2026',
          },
          {
            titulo: 'Quanto custaria contratar 30 mil policiais?',
            url: 'https://example.com/noticia/custo-novos-policiais',
            descricao: 'Análise estima o impacto anual na folha e compara com experiências anteriores.',
            fonte: 'Jornal Exemplo',
            data: '09/09/2026',
          },
        ],
      },
      {
        id: 'economia',
        tema: 'Economia',
        titulo: 'Defende redução de impostos para pequenas empresas',
        evidencias: [
          {
            titulo: 'Entrevista sobre política fiscal e empreendedorismo',
            url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            descricao: 'Candidato detalha a ampliação do teto do Simples Nacional.',
            fonte: 'YouTube',
            data: '12/09/2026',
          },
        ],
      },
      {
        id: 'educacao',
        tema: 'Educação',
        titulo: 'Propõe ampliar escolas técnicas em parceria com o setor privado',
        evidencias: [
          {
            titulo: 'Programa prevê 500 novas unidades de ensino técnico',
            url: 'https://example.com/noticia/escolas-tecnicas',
            descricao: 'Reportagem detalha o modelo de parceria e as regiões priorizadas no plano.',
            fonte: 'Agência Exemplo',
            data: '25/08/2026',
          },
          {
            titulo: 'Debate na TV: trecho sobre ensino técnico',
            url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
            descricao: 'Candidato responde a perguntas sobre financiamento das novas escolas.',
            fonte: 'YouTube',
            data: '15/09/2026',
          },
        ],
      },
      {
        id: 'saude',
        tema: 'Saúde',
        titulo: 'Defende ampliação de parcerias com hospitais privados',
        evidencias: [
          {
            titulo: 'Candidato explica modelo de compra de leitos',
            url: 'https://example.com/noticia/compra-de-leitos',
            descricao: 'Proposta prevê contratação de leitos privados para reduzir filas de atendimento.',
            fonte: 'Portal Exemplo',
            data: '01/09/2026',
          },
        ],
      },
      {
        id: 'agro',
        tema: 'Agronegócio',
        titulo: 'Votou a favor de crédito rural ampliado',
        evidencias: [
          {
            titulo: 'Histórico de votações: política agrícola',
            url: 'https://example.com/noticia/historico-votacoes-agro',
            descricao: 'Levantamento dos votos do candidato em projetos ligados ao setor desde 2018.',
            fonte: 'Jornal Exemplo',
            data: '03/09/2026',
          },
        ],
      },
      {
        id: 'estado',
        tema: 'Gestão pública',
        titulo: 'Promete reduzir o número de ministérios',
        evidencias: [
          {
            titulo: 'Sabatina: reforma administrativa',
            url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            descricao: 'Trecho em que o candidato apresenta a proposta de fusão de pastas.',
            fonte: 'YouTube',
            data: '22/09/2026',
          },
        ],
      },
    ],
  },
]

export function getCandidato(slug: string) {
  return candidatos.find((c) => c.slug === slug)
}

export function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  return match ? match[1] : null
}

export const corClasses: Record<CorCandidato, { bg: string; text: string; border: string }> = {
  verde: { bg: 'bg-verde', text: 'text-verde', border: 'border-verde' },
  azul: { bg: 'bg-azul', text: 'text-azul', border: 'border-azul' },
}
