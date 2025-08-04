# 🧩 User Profile Service

A blazing fast, type-safe REST API boilerplate built with **Fastify**, **Prisma**, **Zod**, and **TypeScript**. This service manages user profiles with full CRUD capabilities, built with clean architecture and Swagger UI documentation support.

---

## 🚀 Features

- ⚡️ Fastify for high-performance HTTP server
- 🛡️ Zod schemas for validation + typed routes
- 🧪 Vitest for testing with unit, integration & validation coverage
- 📦 Prisma as ORM
- 🐳 Docker & Docker Compose ready
- 📜 Swagger/OpenAPI auto-generated docs
- ✅ ESLint, Prettier, TSConfig for clean code
- 📊 Structured logging with Pino

---

## 📁 Project Structure

```sh
user-profile-service/
├── prisma/               # Prisma schema & migrations
│   └── schema.prisma
├── src/
│   ├── controllers/      # Route handlers
│   ├── models/           # DTOs and response models
│   ├── routes/           # Fastify route definitions
│   ├── schemas/          # Zod schemas for validation & output
│   ├── services/         # Business logic
│   ├── plugins/          # Custom Fastify plugins (e.g., env)
│   ├── utils/            # Prisma client, helpers
│   ├── app.ts            # Fastify app builder
│   └── main.ts           # App entrypoint
├── tests/
│   ├── unit/             # Unit tests for service, controller, logger, validation
│   └── integration/      # Route integration tests with real app instance
├── .env                  # Environment variables
├── Dockerfile            # Docker setup
├── docker-compose.yml    # Local dev DB + service
├── package.json          # NPM scripts & dependencies
├── tsconfig.json         # TypeScript config
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/ZeeshanAhmedoff1997/fastify-user-profile-service
cd user-profile-service
npm install
```

### 2. Set Environment

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=3000
```

### 3. Setup Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Dev Server

```bash
npm run dev
```

Access Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🧪 Running Tests

```bash
npm test
```

This includes:

- ✅ Unit tests for services, controllers, logger, and schema validation
- ✅ Integration tests for all API routes
- ✅ Error handling & edge case scenarios

To view test coverage:

```bash
npm run test -- --coverage
```

---

## 🐳 Using Docker

```bash
docker-compose up --build
```

### 🧪 Testing Dockerized Project

- Visit: [http://localhost:3000/docs](http://localhost:3000/docs)
- Use Swagger UI to test all CRUD operations
- Optionally run: `docker exec -it fastify_app npm test`
- Shutdown: `docker-compose down -v`

---

## 🛠 API Endpoints

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| GET    | /profiles      | List all profiles       |
| GET    | /profiles/\:id | Get profile by ID       |
| POST   | /profiles      | Create a new profile    |
| PUT    | /profiles/\:id | Update existing profile |

OpenAPI schema auto-generated from Zod schemas.

---

## ✨ Tech Stack

- [Fastify](https://fastify.dev)
- [Prisma](https://www.prisma.io)
- [Zod](https://github.com/colinhacks/zod)
- [Vitest](https://vitest.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

---

## 📐 HTTP Method & Route Design

The API follows RESTful principles:

- **GET** is used for safe, idempotent reads
- **POST** is used for creating new resources
- **PUT** is used for full updates of resources

Each route maps cleanly to a `Profile` resource with consistent URI patterns. Using `/profiles/:id` keeps URLs semantic and predictable.

---

## ⚖️ Trade-offs & Assumptions

- Using **Fastify** over Express for speed and type safety
- **Zod** was chosen for its seamless TypeScript integration and schema-based validation
- Date validation is done with regex to keep dependencies minimal
- **Swagger** via `@fastify/swagger` supports API discoverability
- Assumes developer has Docker installed for DB setup
- Assumes API consumers expect JSON\:API-like response shapes

---

## 🙌 Contribution

1. Fork the repo
2. Create your branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -am 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a PR

