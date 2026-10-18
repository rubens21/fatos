# Spec Delta

## Purpose

Controla a abertura e o fechamento do modal de evidências de um fato, incluindo a navegação sequencial entre caixas pelo botão "Próxima".

## ADDED Requirements

### Requirement: Abrir evidências em modal ao clicar na caixa
Ao clicar em uma caixa de fato, o sistema MUST abrir um modal com a tabela de evidências daquele fato.

#### Scenario: Clique abre modal de evidências
- **WHEN** o usuário clica em uma caixa de fato
- **THEN** o sistema MUST exibir um modal com a tabela de evidências associada a esse fato

### Requirement: Colunas da tabela de evidências
A tabela de evidências MUST ter as colunas: título (link clicável), breve descrição e data. O link do título MUST apontar para a URL da evidência, que pode ser um site de notícias, um vídeo no YouTube ou outro recurso HTTP(S) público.

#### Scenario: Evidência com título link, descrição e data
- **WHEN** o modal de evidências de um fato está aberto e o fato possui evidências
- **THEN** cada linha MUST mostrar o título como link clicável, a breve descrição e a data da evidência

#### Scenario: Link para notícia ou vídeo no YouTube
- **WHEN** a URL da evidência é um site de notícias ou um vídeo no YouTube
- **THEN** o título MUST permanecer um link clicável para essa URL (sem tratamento especial obrigatório além de abrir o destino)

### Requirement: Fechar e abrir outra caixa
O usuário MUST poder fechar o modal e abrir o modal de outra caixa de fato.

#### Scenario: Fechar modal atual
- **WHEN** o modal de evidências está aberto e o usuário aciona o fechamento (botão Fechar, Escape ou clique no backdrop)
- **THEN** o sistema MUST fechar o modal

#### Scenario: Abrir outra caixa após fechar
- **WHEN** o usuário fecha o modal de um fato e em seguida clica em outra caixa
- **THEN** o sistema MUST abrir o modal com as evidências da nova caixa clicada

#### Scenario: Abrir outra caixa enquanto o modal está aberto
- **WHEN** o modal de um fato está aberto e o usuário clica em outra caixa de fato
- **THEN** o sistema MUST atualizar o modal para as evidências do fato clicado

### Requirement: Botão Próxima avança para a caixa seguinte
O sistema MUST oferecer um botão "Próxima" que troca o conteúdo do modal para a caixa seguinte na lista.

#### Scenario: Próxima troca para o fato seguinte
- **WHEN** o modal de um fato que não é o último da lista está aberto e o usuário clica em "Próxima"
- **THEN** o sistema MUST exibir no modal as evidências da caixa imediatamente seguinte

#### Scenario: Próxima no último fato
- **WHEN** o modal do último fato da lista está aberto e o usuário clica em "Próxima"
- **THEN** o sistema MUST fechar o modal e MUST NOT abrir evidências inexistentes
