# Spec Delta

## Purpose

Exibe a lista de fatos do indivíduo como caixas tituladas, permitindo ao visitante ver de relance o que está documentado sobre a pessoa.

## ADDED Requirements

### Requirement: Lista de caixas de fatos
Quando a página do indivíduo carregar com sucesso, o sistema MUST exibir uma lista de caixas, cada uma com o título do fato correspondente.

#### Scenario: Fatos renderizados como caixas com título
- **WHEN** o backend retorna uma lista de fatos para o indivíduo
- **THEN** o sistema MUST renderizar uma caixa por fato e cada caixa MUST exibir o título daquele fato

#### Scenario: Indivíduo sem fatos
- **WHEN** o backend retorna um indivíduo válido com lista de fatos vazia
- **THEN** o sistema MUST exibir a página sem caixas de fatos e MUST NOT tratar isso como erro de carregamento
