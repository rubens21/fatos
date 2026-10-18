# Spec Delta

## Purpose

Garante que indivíduo, fatos e evidências venham de um backend HTTP em JSON a cada abertura da página, sem cache do navegador, com estados visíveis de carregamento e erro.

## ADDED Requirements

### Requirement: Dados remotos fora do HTML
Os dados do indivíduo, fatos e evidências MUST NOT estar embutidos no HTML da página; MUST ser obtidos via HTTP em JSON.

#### Scenario: Página abre e solicita dados ao backend
- **WHEN** o usuário abre a página de um indivíduo
- **THEN** o sistema MUST solicitar os dados ao backend via HTTP e MUST renderizar conteúdo a partir da resposta JSON

### Requirement: Fetch sem cache
Toda solicitação de dados do indivíduo MUST usar `fetch` com `cache: "no-store"`.

#### Scenario: Requisição com cache no-store
- **WHEN** a página solicita os dados do indivíduo ao backend
- **THEN** a requisição MUST ser feita com `cache: "no-store"`

### Requirement: Estado de carregamento visível
Enquanto a requisição ao backend estiver em andamento, o sistema MUST exibir um estado de carregamento visível.

#### Scenario: Loading durante a espera
- **WHEN** a página abriu e a resposta do backend ainda não chegou
- **THEN** o sistema MUST mostrar um indicador ou mensagem de carregamento visível ao usuário

### Requirement: Estado de erro visível
Se o backend falhar (erro de rede, status não sucesso ou JSON inválido), o sistema MUST exibir um estado de erro visível.

#### Scenario: Backend falha
- **WHEN** a requisição ao backend falha ou retorna erro
- **THEN** o sistema MUST exibir uma mensagem de erro visível e MUST NOT apresentar fatos como se o carregamento tivesse sido bem-sucedido
