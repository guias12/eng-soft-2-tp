# Trabalho Prático: Etapa 1 - Engenharia de Software II

## (1) Os nomes dos membros do grupo:

O trabalho foi desenvolvido individualmente por:
Guilherme Pereira de Assis

## (2) Explicação do sistema

O sistema escolhido consiste de uma aplicação de um Quadro Kanban simples.
Existem três colunas de status (To Do, Doing e Done) em cada uma delas é possível: adicionar, remover e editar "tickets".
Além disso é possível mover os tickets para diferentes status usando drag-and-drop. Para tal, basta clicar, segurar e arrastar o ticket para a coluna desejada.


## (3) Explicação das tecnologias utilizadas.

Para o desenvolvimento da aplicação foi utilizado o React com Typescript.
O setup inicial foi feito utilizando o Vite, e o framework de testes unitários escolhidos foi o Vitest.
Também foram adicionadas bibliotecas externas como o Redux, FontAwesome e o react-beautiful-dnd, juntamente com os respectivos pacotes @types 

## Adicional: Instruções para executar

Clone o repositório, navegue para a pasta raíz do projeto e execute:

    npm install

Aguarde a instalação das dependências terminar. Para iniciar o servidor execute:

    npm run dev

A aplicação estará disponível no browser de sua preferência, provavelmente no endereço http://localhost:5173/
Caso essa porta já esteja ocupada o Vite irá alocar outra porta para o servidor.
Portanto, confira o terminal onde executou o projeto.

### Testes

Para executar os testes basta executar o comando

    npm run test
