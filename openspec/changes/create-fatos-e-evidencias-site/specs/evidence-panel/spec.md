# Spec Delta

## Purpose

Controla a abertura e o fechamento da tabela de evidências de um fato, incluindo a navegação sequencial entre caixas pelo botão "Próxima".

## ADDED Requirements

### Requirement: Abrir tabela de evidências ao clicar na caixa
Ao clicar em uma caixa de fato, o sistema MUST abrir a tabela de evidências daquele fato.

#### Scenario: Clique abre evidências do fato
- **WHEN** o usuário clica em uma caixa de fato
- **THEN** o sistema MUST exibir a tabela de evidências associada a esse fato

### Requirement: Colunas da tabela de evidências
A tabela de evidências MUST ter as colunas: título (link clicável), breve descrição e data.

#### Scenario: Evidência com título link, descrição e data
- **WHEN** a tabela de evidências de um fato está aberta e o fato possui evidências
- **THEN** cada linha MUST mostrar o título como link clicável, a breve descrição e a data da evidência

### Requirement: Fechar e abrir outra caixa
O usuário MUST poder fechar a tabela aberta e abrir a tabela de outra caixa de fato.

#### Scenario: Fechar tabela atual
- **WHEN** uma tabela de evidências está aberta e o usuário aciona o fechamento
- **THEN** o sistema MUST ocultar essa tabela

#### Scenario: Abrir outra caixa após fechar
- **WHEN** o usuário fecha a tabela de um fato e em seguida clica em outra caixa
- **THEN** o sistema MUST abrir a tabela de evidências da nova caixa clicada

#### Scenario: Abrir outra caixa enquanto uma está aberta
- **WHEN** a tabela de um fato está aberta e o usuário clica em outra caixa de fato
- **THEN** o sistema MUST fechar a tabela anterior e MUST abrir a tabela do fato clicado

### Requirement: Botão Próxima avança para a caixa seguinte
O sistema MUST oferecer um botão "Próxima" que fecha a caixa atual e abre a caixa seguinte na lista.

#### Scenario: Próxima fecha atual e abre a seguinte
- **WHEN** a tabela de um fato que não é o último da lista está aberta e o usuário clica em "Próxima"
- **THEN** o sistema MUST fechar a tabela atual e MUST abrir a tabela de evidências da caixa imediatamente seguinte

#### Scenario: Próxima no último fato
- **WHEN** a tabela do último fato da lista está aberta e o usuário clica em "Próxima"
- **THEN** o sistema MUST fechar a tabela atual e MUST NOT abrir uma tabela inexistente
