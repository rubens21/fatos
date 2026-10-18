# Fatos e Evidências

Site estático (HTML/CSS/JS) que apresenta fatos verificáveis sobre indivíduos, com evidências carregadas de um backend HTTP em JSON.

## Como rodar

Na raiz do projeto:

```bash
node server.js
```

Abra [http://localhost:3000](http://localhost:3000).

O servidor:

- serve os arquivos estáticos na mesma origem da API;
- responde `GET /api/people/<slug>` com o JSON do indivíduo (ou **404** se o slug não existir);
- faz **rewrite** de `/p/<slug>` para o shell `p/index.html` (a página lê o slug da URL e busca os dados).

Porta padrão: `3000`. Para outra porta: `PORT=8080 node server.js`.

## Rotas úteis

| URL | Descrição |
| --- | --- |
| `/` | Página inicial com links de exemplo |
| `/p/pessoa-a` | Página da Ana Ribeiro |
| `/p/pessoa-b` | Página do Bruno Costa |
| `/p/slug-inexistente` | Mensagem de não encontrado |
| `/api/people/pessoa-a` | JSON do indivíduo |

## Stack

- Frontend: HTML/CSS/JS puro (sem framework)
- Backend de desenvolvimento: `server.js` (Node.js, módulo `http`)
- Dados de exemplo: `api/people/*.json`
