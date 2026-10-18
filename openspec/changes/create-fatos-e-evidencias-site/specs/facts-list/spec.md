# Spec Delta

## Purpose

Exibe a lista de fatos do indivíduo como caixas tituladas, permitindo ao visitante ver de relance o que está documentado sobre a pessoa.

## ADDED Requirements

### Requirement: Grade de caixas de fatos
Quando a página do indivíduo carregar com sucesso, o sistema MUST exibir os fatos como caixas em grade (não como lista vertical de itens), cada uma com o título do fato correspondente.

#### Scenario: Fatos renderizados como caixas com título
- **WHEN** o backend retorna fatos para o indivíduo
- **THEN** o sistema MUST renderizar uma caixa por fato, cada caixa MUST exibir o título daquele fato, e as caixas MUST aparecer em layout de grade

#### Scenario: Clique na caixa abre evidências
- **WHEN** o usuário clica em uma caixa de fato
- **THEN** o sistema MUST abrir as evidências desse fato em um modal

#### Scenario: Indivíduo sem fatos
- **WHEN** o backend retorna um indivíduo válido com lista de fatos vazia
- **THEN** o sistema MUST exibir a página sem caixas de fatos e MUST NOT tratar isso como erro de carregamento
