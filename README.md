# receperacao-credito

Para rodar o projeto web
- pelo prompt de comando entre no diretóiro web-app
- npm i
- ng serve

Para Rodar o server
- pelo prompt de comando entre no diretóiro api
- npm i
- npm start

obs
O banco em mysql está disponivel em um servidor, os dados para acesso caso necessário estão no arquivo db.js

No kafka
Crie um tópico chamado divida-criada-v1
padrão da mensagem
{"id": "8", "dataDeCriacao": "06/09/2020", "diasEmAtraso": "10","valorPago": "20","valorInadimplente": "90"}