:soccer: Trybe Futebol Clube :soccer:
Bem-vindo ao repositório do projeto Trybe Futebol Clube! Este projeto é uma aplicação full-stack que simula a gestão de um clube de futebol, incluindo funcionalidades como autenticação, gerenciamento de partidas e exibição de classificações.

:rocket: Tecnologias Utilizadas
Backend
Node.js: v16.14
Express: v4.17.1
TypeScript: v4.4.4
Sequelize: v6.6.5
MySQL: v8.0
JWT: v8.5.1
Mocha: v9.1.3
Chai: v4.3.4
Sinon: v11.1.2
Frontend
React: v17.0.2
Axios: v0.21.1
React Router DOM: v6.0.2
Ferramentas de Desenvolvimento
Docker: v20.10.8
Docker Compose: v1.29.2
ESLint: v7.32.0
Prettier: v2.4.1
:file_folder: Estrutura do Projeto
:gear: Configuração do Ambiente
Backend
Clone o repositório:

Instale as dependências:

Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env e preencha as variáveis necessárias.
Inicie o servidor:

Frontend
Navegue até o diretório do frontend:

Instale as dependências:

Inicie o servidor:

Docker
Certifique-se de que o Docker e o Docker Compose estão instalados.
No diretório raiz do projeto, execute:
:link: Endpoints
Autenticação
POST /login
Autentica um usuário e retorna um token JWT.
Body:
Times
GET /teams

Retorna uma lista de todos os times.
GET /teams/:id

Retorna os detalhes de um time específico.
Partidas
GET /matches

Retorna uma lista de todas as partidas.
POST /matches

Cria uma nova partida.
Body:
PATCH /matches/:id/finish

Finaliza uma partida.
PATCH /matches/:id

Atualiza os gols de uma partida.
Body:
Classificação
GET /leaderboard

Retorna a classificação geral.
GET /leaderboard/home

Retorna a classificação dos times da casa.
GET /leaderboard/away

Retorna a classificação dos times visitantes.
:test_tube: Testes
Para rodar os testes, execute:

Para verificar a cobertura dos testes, execute:

:memo: Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

:handshake: Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Faça um push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.
:busts_in_silhouette: Desenvolvedores
Seu Nome
Outros Contribuidores
