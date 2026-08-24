# QuickCart

QuickCart is a small online store built for the PDC50 Full-Stack AI Application Development Module I Individual Mastery Lab. Shoppers can browse a product catalog, view product details, and place simple orders. This repository contains the first working slice of the system: a NestJS REST API and a React client that talks to it.

## Technology Stack

**Frontend**

* React
* Vite
* TypeScript

**Backend**

* NestJS
* Node.js
* TypeScript

## Project Structure

```
quickstart-echate/
├── api/                        # NestJS REST API (backend)
│   └── src/
│       ├── main.ts             # App bootstrap: CORS, validation, port 3000
│       ├── app.module.ts       # Root module
│       ├── health/             # GET /health
│       ├── products/           # Product endpoints and in-memory sample data
│       └── orders/             # Order endpoint, DTO validation, business rules
├── client/                     # React + Vite + TypeScript frontend
│   └── src/
│       ├── App.tsx             # QuickCart page: status banner + product catalog
│       ├── api.ts              # Typed fetch helpers for the backend
│       └── types.ts            # Shared Product / Order types
└── quickcart-architecture.png  # Architecture diagram (Client → API ↔ Data)
```

The architecture diagram shows the three layers:

* **Client** – provides the user interface for browsing products and submitting orders.
* **API** – handles requests, validates data, applies business logic, and communicates with the data layer.
* **Data** – stores and retrieves product and order information (in-memory data for this lab).

## Running the Backend

```bash
cd api
npm install
npm run start:dev
```

The API starts on: <http://localhost:3000>

Health check: <http://localhost:3000/health> → `{"status":"ok"}`

## Running the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Then open <http://localhost:5173>.

The frontend communicates with the NestJS backend at `http://localhost:3000`. It displays "Backend status: ok" when the API is reachable, or "Backend status: unreachable" if it is not. Start the backend first so products load.

## API Endpoints

| Method | Endpoint          | Description                                             |
| ------ | ----------------- | ------------------------------------------------------- |
| GET    | `/health`         | Health check, returns `{ "status": "ok" }`              |
| GET    | `/products`       | Returns all products                                    |
| GET    | `/products/:id`   | Returns a single product by id (404 if not found)       |
| POST   | `/orders`         | Places an order, e.g. `{ "productId": 1, "quantity": 2 }` |

`POST /orders` validates that `productId` and `quantity` are positive integers, checks that enough stock is available, reduces the stock, and returns the created order with its total price.

Product data is stored in memory (simple sample products), so restarting the API resets products and orders. No database is needed for this lab.

## Git Workflow

Development does not happen directly on `main`. Each feature is built on its own feature branch, pushed to GitHub, and merged through a Pull Request:

1. Start from `main` and pull the latest changes.
2. Create a feature branch (for example `feature/backend-skeleton`).
3. Make changes and commit them.
4. Push the branch and open a Pull Request.
5. Review and merge the Pull Request into `main`.
