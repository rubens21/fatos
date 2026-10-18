# Tasks

## 1. Estrutura do projeto e dados de exemplo

- [ ] 1.1 Criar pastas `css/`, `js/`, `assets/people/`, `api/` (ou equivalente) e shell HTML da página do indivíduo; verificar que os arquivos esperados existem no disco
- [ ] 1.2 Adicionar `js/config.js` com base URL da API e e-mail mailto placeholder; verificar que o shell referencia o arquivo
- [ ] 1.3 Criar dados JSON de dois indivíduos de exemplo (`pessoa-a`, `pessoa-b`) com fatos e evidências no formato do design; verificar que os arquivos são JSON válido e incluem ao menos um fato com evidências cada
- [ ] 1.4 Adicionar fotos placeholder em `assets/people/` referenciadas pelos JSON; verificar que `photoUrl` de cada indivíduo aponta para um arquivo existente

## 2. Backend HTTP mínimo

- [ ] 2.1 Implementar `GET /api/people/<slug>` (handler Node mínimo ou mapeamento estático) retornando JSON do indivíduo ou 404; verificar com curl/fetch que slug válido retorna 200+JSON e slug inválido retorna 404
- [ ] 2.2 Garantir mesma origem para estáticos e API no servidor de desenvolvimento e documentar no README como subir o servidor e o rewrite `/p/*`; verificar que a documentação descreve o comando e a rota `/p/<slug>`

## 3. Carregamento remoto e estados

- [ ] 3.1 No JS, ler o slug da URL `/p/<slug>` e chamar a API com `fetch(..., { cache: "no-store" })`; verificar na DevTools/Network que a requisição usa `cache: "no-store"` (ou equivalente observável) a cada reload
- [ ] 3.2 Exibir estado de carregamento enquanto a requisição está pendente; verificar visualmente que o loading aparece antes da resposta
- [ ] 3.3 Em falha de rede, status de erro ou JSON inválido, exibir mensagem de erro visível sem lista de fatos; verificar provocando falha (API parada ou slug forçado a erro)
- [ ] 3.4 Em 404 do backend, exibir mensagem de "não encontrado" sem cabeçalho de indivíduo nem fatos; verificar acessando `/p/slug-inexistente`

## 4. Cabeçalho, lista de fatos e rodapé

- [ ] 4.1 Renderizar cabeçalho com foto e nome a partir do JSON de sucesso; verificar em `/p/pessoa-a` que nome e imagem batem com o payload
- [ ] 4.2 Renderizar uma caixa por fato com o título; verificar que a quantidade de caixas e os títulos batem com o JSON
- [ ] 4.3 Incluir rodapé com link `mailto:` do config em páginas de sucesso e de não encontrado; verificar que o `href` começa com `mailto:`

## 5. Painel de evidências e navegação

- [ ] 5.1 Ao clicar numa caixa, abrir tabela com colunas título (link), descrição e data; verificar conteúdo e que o título é um link clicável com a URL da evidência
- [ ] 5.2 Implementar fechamento da tabela e troca ao clicar outra caixa (só uma aberta); verificar fechar, reabrir outra e clique cruzado
- [ ] 5.3 Implementar botão "Próxima" que fecha a atual e abre a seguinte; no último fato, apenas fecha; verificar percorrendo a lista até o fim

## 6. Integração final

- [ ] 6.1 Percorrer manualmente `/p/pessoa-a` e `/p/pessoa-b`: loading → cabeçalho → fatos → evidências → próxima → fechar → rodapé; verificar ausência de dados de indivíduo embutidos no HTML fonte
- [ ] 6.2 Confirmar slug inexistente e falha de API mostram os estados corretos; verificar que não há regressão nos fluxos de sucesso
