# :soccer: Trybe Futebol Clube :soccer:

Bem-vindo ao repositório do projeto **Trybe Futebol Clube**! Este projeto é uma aplicação full-stack que simula a gestão de um clube de futebol, incluindo funcionalidades como autenticação, gerenciamento de partidas e exibição de classificações.

## :rocket: Tecnologias Utilizadas

### Backend
- **Node.js**: v16.14
- **Express**: v4.17.1
- **TypeScript**: v4.4.4
- **Sequelize**: v6.6.5
- **MySQL**: v8.0
- **JWT**: v8.5.1
- **Mocha**: v9.1.3
- **Chai**: v4.3.4
- **Sinon**: v11.1.2

### Frontend
- **React**: v17.0.2
- **Axios**: v0.21.1
- **React Router DOM**: v6.0.2

### Ferramentas de Desenvolvimento
- **Docker**: v20.10.8
- **Docker Compose**: v1.29.2
- **ESLint**: v7.32.0
- **Prettier**: v2.4.1

## :file_folder: Estrutura do Projeto

```
.editorconfig
.gitignore
app/
    backend/
        .dockerignore
        .env.example
        .eslintignore
        .eslintrc.json
        .gitignore
        .sequelizerc
        build/
            app.js
            controllers/
            database/
            Interfaces/
            middlewares/
            routes/
            server.js
            services/
            utils/
        Dockerfile
        nyc.config.js
        package.json
        src/
            app.ts
            ...
        tsconfig.json
    docker-compose.yml
    frontend/
        .dockerignore
        .env
        .gitignore
        Dockerfile
        package.json
        public/
        src/
db.example.sql
FAQ.md
package.json
README.md
```


## :gear: Configuração do Ambiente

Backend
1.Clone o repositório:

```
git clone git@github.com:seu-usuario/trybe-futebol-clube.git
cd trybe-futebol-clube/app/backend
```

2.Instale as dependências:

```
npm install
```

Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env e preencha as variáveis necessárias.

Inicie o servidor:

```
npm run dev
```

## Frontend
1.Navegue até o diretório do frontend:

```
cd ../frontend
```

2.Instale as dependências:

```
npm install
```

3.Inicie o servidor:

```
npm start
```

## Docker
Certifique-se de que o Docker e o Docker Compose estão instalados.
No diretório raiz do projeto, execute:

```
docker-compose up --build
```

## :link: Endpoints
Autenticação

POST /login

* Autentica um usuário e retorna um token JWT.
* Body:

```
{
  "email": "user@example.com",
  "password": "password123"
}
```
Times

GET /teams
* Retorna uma lista de todos os times.

GET /teams/:id

* Retorna os detalhes de um time específico.

Partidas

GET /matches

* Retorna uma lista de todas as partidas.

POST /matches

* Cria uma nova partida.

* Body:

```
{
  "homeTeamId": 1,
  "awayTeamId": 2,
  "homeTeamGoals": 2,
  "awayTeamGoals": 1,
  "inProgress": true
}
```

PATCH /matches/:id/finish

* Finaliza uma partida.

PATCH /matches/:id

* Atualiza os gols de uma partida.

* Body:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

Classificação

GET /leaderboard

* Retorna a classificação geral.

GET /leaderboard/home

* Retorna a classificação dos times da casa.

GET /leaderboard/away

* Retorna a classificação dos times visitantes.

:test_tube: Testes

Para rodar os testes, execute:
```
npm run test
```

Para verificar a cobertura dos testes, execute:
```
npm run test:coverage
```

:memo: Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

:handshake: Contribuição

Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Faça um push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.