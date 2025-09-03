# Fullstack Intern Task (Node + Postgres + React)

## Backend
1. Copy `.env.example` to `.env` and set DB credentials.
2. Install & run:
```bash
cd backend
npm install
npm run dev
```
The API runs on `http://localhost:5000`.

### Endpoints
- `POST /auth/register` — Single API to create both `auth_user` and `teachers`.
  Payload:
```json
{
  "email": "a@b.com",
  "first_name": "Ada",
  "last_name": "Lovelace",
  "password": "secret",
  "university_name": "SJSU",
  "gender": "F",
  "year_joined": 2020
}
```
- `POST /auth/login` — returns `{ token }`
- `GET /teachers` — (JWT required) list teachers joined with users

## Frontend
```bash
cd frontend
npm install
npm start
```
App runs on `http://localhost:3000`.

Login to get a token (saved in localStorage), then visit **Teachers** to view the protected data table.
