# Proposal

## Why

Não existe ainda um site público para apresentar fatos verificáveis sobre indivíduos com evidências clicáveis. Precisamos de uma base estática simples (HTML/CSS/JS) que carregue dados frescos de um backend e permita navegar fatos e evidências sem frameworks nem edição no site.

## What Changes

- Criar o site estático **"Fatos e Evidências"** do zero (HTML/CSS/JS puro).
- Expor uma página por indivíduo via slug (`/p/<slug>`), com estado de "não encontrado" para slug inválido.
- Exibir cabeçalho com foto e nome do indivíduo.
- Listar caixas de fatos (título); ao clicar, abrir tabela de evidências (título com link, descrição breve, data).
- Permitir fechar a tabela, abrir outra caixa e avançar com botão **"Próxima"**.
- Carregar indivíduo, fatos e evidências via HTTP (JSON) a cada abertura da página, com `cache: "no-store"`, e estados visíveis de carregamento e erro.
- Incluir rodapé com e-mail de contato (`mailto:`) para colaboração.
- Fornecer backend mínimo (ou equivalente servido por HTTP) que devolva o JSON necessário para as páginas — sem embutir esses dados no HTML.

## Capabilities

### New Capabilities

- `person-routing`: Roteamento por slug do indivíduo e mensagem quando o slug não existe.
- `person-header`: Cabeçalho da página com foto e nome do indivíduo.
- `facts-list`: Lista de caixas de fatos, cada uma com título.
- `evidence-panel`: Abertura/fechamento da tabela de evidências e navegação "Próxima" entre caixas.
- `remote-data`: Carregamento HTTP JSON sem cache e estados de loading/erro.
- `contact-footer`: Rodapé com e-mail de contato para colaboração.

### Modified Capabilities

- _(nenhuma — projeto greenfield)_

## Impact

- Novo código de frontend estático (HTML/CSS/JS) e contrato HTTP JSON para dados do indivíduo.
- Nenhuma dependência de framework; hosting deve servir rotas `/p/<slug>` (ou rewrite equivalente) e o endpoint de dados.
- Fora de escopo: login, edição de conteúdo pelo site, frameworks.
- Assunções: dois indivíduos de exemplo com slugs placeholder; e-mail de contato configurável; formato JSON definido no design.
