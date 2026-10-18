# Spec Delta

## Purpose

Apresenta no cabeçalho a identidade visual do indivíduo carregado: foto e nome, para o visitante saber imediatamente de quem se trata a página.

## ADDED Requirements

### Requirement: Cabeçalho com foto e nome
Quando a página do indivíduo carregar com sucesso, o sistema MUST exibir no cabeçalho a foto e o nome desse indivíduo.

#### Scenario: Dados do indivíduo preenchidos no cabeçalho
- **WHEN** o backend retorna com sucesso os dados de um indivíduo válido
- **THEN** o cabeçalho MUST mostrar a foto e o nome retornados para aquele indivíduo

#### Scenario: Cabeçalho ausente em não encontrado
- **WHEN** o slug não existe e a mensagem de "não encontrado" é exibida
- **THEN** o sistema MUST NOT apresentar o cabeçalho com foto e nome de um indivíduo
