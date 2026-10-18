# Design

## Context

Projeto greenfield: apenas `README.md` e OpenSpec. Sem frameworks. Frontend HTML/CSS/JS puro deve obter indivíduo, fatos e evidências via HTTP JSON a cada visita (`cache: "no-store"`). Ver `proposal.md` para motivação e escopo.

## Goals / Non-Goals

**Goals:**

- Estrutura estática servível com rota `/p/<slug>` e um endpoint JSON por indivíduo.
- Contrato de dados claro o suficiente para o frontend renderizar cabeçalho, fatos e evidências.
- Interação do modal de evidências (abrir/fechar/próxima) só no cliente, sem navegação de página.
- Dois indivíduos de exemplo para desenvolvimento e demonstração.

**Non-Goals:**

- Autenticação, CMS ou edição de conteúdo no site.
- SPA framework, build step obrigatório (bundler), ou SSR.
- Persistência real em banco (arquivo JSON ou handler HTTP simples basta na v1).

## Decisions

### 1. Shell estático + roteamento por path

- **Escolha:** Uma página shell (ex.: `index.html` ou `p/index.html`) lida o slug da URL (`/p/<slug>`), chama o backend e monta o DOM.
- **Rationale:** Cumpre o requisito de URL por indivíduo sem framework.
- **Alternativa:** Páginas HTML por pessoa — rejeitada porque embutiria dados ou duplicaria markup e conflita com carga remota.
- **Hosting:** Servidor local/estático com rewrite de `/p/*` para o shell (ex.: `npx serve` com rewrite, ou servidor Node mínimo). Documentar o rewrite nas tasks.

### 2. Endpoint JSON por slug

- **Escolha:** `GET /api/people/<slug>` retorna JSON do indivíduo (ou 404 se inexistente).
- **Formato sugerido:**

```json
{
  "slug": "exemplo",
  "name": "Nome Completo",
  "photoUrl": "/assets/people/exemplo.jpg",
  "facts": [
    {
      "id": "fact-1",
      "title": "Publicou livros",
      "evidences": [
        {
          "title": "Reportagem no site de notícias",
          "url": "https://www.bbc.com/portuguese",
          "description": "Matéria que menciona o fato.",
          "date": "2020-03-15"
        },
        {
          "title": "Vídeo no YouTube",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "description": "Registro em vídeo relacionado ao fato.",
          "date": "2021-01-10"
        }
      ]
    }
  ]
}
```

- **Rationale:** Um request por abertura de página; 404 mapeia para "não encontrado".
- **Alternativa:** Lista de índices + N requests de fatos — rejeitada por complexidade desnecessária na v1.
- **Implementação v1:** Handler HTTP mínimo (Node/`http` ou similar) lendo JSON de disco, **ou** arquivos estáticos em `/api/people/<slug>.json` com o servidor mapeando 404 — desde que o frontend use `fetch(..., { cache: "no-store" })` e trate status de erro.

### 3. Modal de evidências no cliente

- **Escolha:** `<dialog>` modal com a tabela de evidências; só um fato aberto por vez. Clique na caixa abre o modal; Fechar / Escape / clique no backdrop fecha; "Próxima" avança no índice da lista e, no último, fecha o modal.
- **Rationale:** Com dezenas de caixas, o modal mantém as evidências legíveis sem deslocar a grade.
- **Alternativa:** Painel inline abaixo da linha da caixa — rejeitada para muitos fatos; o modal escala melhor.

### 4. Configuração de contato e exemplos

- **Escolha:** E-mail de colaboração em constante/config JS (placeholder até definição real). Dois slugs de exemplo (ex.: `pessoa-a`, `pessoa-b`) com fotos placeholder em `/assets`.
- **Rationale:** Desbloqueia UI sem bloquear em conteúdo real.

### 5. Stack e pastas

```
/
  index.html          # opcional: landing ou redirect
  p/index.html        # shell da página do indivíduo (ou equivalente)
  css/styles.css
  js/app.js           # roteamento, fetch, render, modal
  js/config.js        # base URL da API, e-mail mailto
  api/                # dados ou servidor mínimo
  assets/people/      # fotos
```

Sem npm obrigatório para o frontend; servidor de API/dev pode ser um script Node único se necessário.

## Risks / Trade-offs

- **[Risk]** Hosting estático puro sem rewrite quebra `/p/<slug>` → **Mitigation:** Documentar rewrite; fallback aceitável em dev com query `?slug=` só se path falhar — preferir path conforme spec.
- **[Risk]** CORS se API e site em origens diferentes → **Mitigation:** Servir API e estáticos na mesma origem na v1.
- **[Risk]** Fotos/URLs quebradas → **Mitigation:** Placeholder e `alt` com o nome; não bloquear o restante da página.
- **[Trade-off]** Backend mínimo em arquivo vs. serviço real → arquivo/JSON + handler simples é suficiente até haver fonte de verdade externa.

## Migration Plan

Não há sistema legado. Deploy = publicar estáticos + endpoint (ou JSON) e configurar rewrite `/p/*`. Rollback = remover o deploy.

## Open Questions

- Valor final do e-mail `mailto:` (usar placeholder até definição).
- Nomes/slugs reais dos dois indivíduos (placeholders na v1).
