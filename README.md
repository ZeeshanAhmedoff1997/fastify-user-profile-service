# 🧩 User Profile Service

A blazing fast, type-safe REST API boilerplate built with **Fastify**, **Prisma**, **Zod**, and **TypeScript**. This service manages user profiles with full CRUD capabilities, built with clean architecture and Swagger UI documentation support.

---

## 🚀 Features

- ⚡️ Fastify for high-performance HTTP server
- 🛡️ Zod schemas for validation + typed routes
- 🧪 Vitest for testing
- 📦 Prisma as ORM
- 🐳 Docker & Docker Compose ready
- 📜 Swagger/OpenAPI auto-generated docs
- ✅ ESLint, Prettier, TSConfig for clean code

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
pnpm install
```

### 2. Set Environment

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=3000
```

### 3. Setup Database

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

### 4. Run the Dev Server

```bash
pnpm dev
```

Access Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🧪 Running Tests

```bash
pnpm test
```

---

## 🐳 Using Docker

```bash
docker-compose up --build
```

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

## 🙌 Contribution

1. Fork the repo
2. Create your branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -am 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a PR
