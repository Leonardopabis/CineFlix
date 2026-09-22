# 🎬 CineFlix

Plataforma web para descoberta de filmes e séries, com sistema de autenticação e lista de favoritos personalizada.

## 📖 Sobre

O projeto foi desenvolvido para consumir a API do TMDB (The Movie Database) e oferecer uma experiência de navegação por filmes e séries, similar a um catálogo de streaming.

A aplicação permite pesquisar títulos, navegar por categorias (populares, mais bem avaliados, em cartaz/no ar), visualizar detalhes de cada filme ou série, e salvar favoritos vinculados a uma conta de usuário autenticada.

## ✨ Funcionalidades

* Autenticação de usuários (cadastro e login) com JWT
* Rotas protegidas, acessíveis apenas para usuários logados
* Busca de filmes por título
* Listagem de filmes e séries por categoria (populares, mais bem avaliados, em cartaz/no ar)
* Carrossel de destaques na página inicial
* Modal com informações detalhadas de cada título
* Sistema de favoritos (adicionar/remover), persistido no banco de dados
* Paginação incremental ("Carregar mais") nas listagens
* Validação de formulários de login e cadastro

## 🛠 Tecnologias

### Front-end

* React
* React Router DOM
* Context API
* Vite
* CSS Modules

### Back-end

* Node.js
* Express
* MySQL
* JWT (JSON Web Token)
* Bcrypt

### API externa

* TMDB (The Movie Database)

## 🏗 Arquitetura

```
Usuário
   │
   ▼
Front-end (React)
   │
   ▼
API Express
   │
   ├──▶ MySQL (usuários e favoritos)
   │
   └──▶ TMDB API (filmes e séries)
```

## ⚙️ Fluxo da aplicação

1. O usuário se cadastra ou faz login, recebendo um token JWT.
2. O token é armazenado no front-end e enviado em requisições futuras para validar a sessão.
3. As páginas protegidas (Home, Filmes, Séries, Favoritos, Perfil) só são acessadas com o token válido.
4. O front-end consome a API Express, que por sua vez busca os dados na API do TMDB.
5. Ao favoritar um filme ou série, os dados são salvos no MySQL, vinculados ao registro do usuário.
6. A página de Favoritos consulta o banco diretamente, sem precisar buscar novamente na API do TMDB.

## 📷 Demonstração

* É possível pesquisar por filmes e séries a partir da barra de busca
* As categorias (Populares, Mais bem avaliados, Em cartaz/No ar) são navegáveis por abas, com paginação incremental
* Ao clicar no ícone de informações, um modal exibe sinopse, popularidade e avaliação do título
* O ícone de coração permite favoritar/desfavoritar, refletindo o estado imediatamente na interface
* A página de Favoritos lista todos os títulos salvos pelo usuário logado
* Tentar acessar qualquer rota protegida sem estar logado redireciona automaticamente para a tela de login

## 📌 Aprendizados

Durante o desenvolvimento foram praticados conceitos como:

* APIs REST
* Operações CRUD
* Autenticação e autorização com JWT
* Hash de senhas com bcrypt
* Rotas protegidas e Context API no React
* Consumo de API externa (TMDB)
* Programação assíncrona
* Integração entre front-end e back-end
* Banco de dados relacional (MySQL)
* Gerenciamento de estado global com Context API

## 👨‍💻 Autor

Leonardo Filipake Pabis
