# Spec Delta

## Purpose

Identifica a página do indivíduo pelo slug na URL e trata slugs inexistentes com uma mensagem clara de não encontrado.

## ADDED Requirements

### Requirement: Página por slug do indivíduo
O sistema MUST exibir a página do indivíduo correspondente ao slug na rota `/p/<slug>`.

#### Scenario: Slug válido abre a página do indivíduo
- **WHEN** o usuário acessa `/p/<slug>` com um slug que existe no backend
- **THEN** o sistema MUST carregar e exibir a página daquele indivíduo

#### Scenario: Slug inexistente mostra não encontrado
- **WHEN** o usuário acessa `/p/<slug>` com um slug que o backend não reconhece
- **THEN** o sistema MUST exibir uma mensagem de "não encontrado" e MUST NOT exibir lista de fatos daquele slug
