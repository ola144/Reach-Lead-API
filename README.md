# ReachLeads API

Express and MongoDB backend for ReachLeads, a lead management and outreach platform. The API supports user authentication, lead tracking, campaigns, outreach history, connected accounts, analytics, and AI-assisted message generation.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- OpenAI API for AI content features
- Swagger/OpenAPI spec in `swagger.yaml`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update `config.env` in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/reachleads
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

`OPENAI_API_KEY` is only required for the `/api/ai/*` endpoints.

### 3. Start the server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

By default, the API runs at:

```text
http://localhost:5000
```

## Authentication

Register or log in to receive a JWT token. Protected endpoints require the token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"password\":\"secret123\",\"company\":\"Acme Inc\"}"
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"jane@example.com\",\"password\":\"secret123\"}"
```

## API Endpoints

All endpoints except `/api/auth/register` and `/api/auth/login` require a bearer token.

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT token |

### Leads

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/leads` | Get all leads for the authenticated user |
| POST | `/api/leads` | Create a lead |
| GET | `/api/leads/:id` | Get one lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |
| GET | `/api/leads/stats/overview` | Get lead status totals |
| GET | `/api/leads/stats/pipeline` | Get lead pipeline totals |

Example lead body:

```json
{
  "firstName": "Alex",
  "lastName": "Morgan",
  "email": "alex@example.com",
  "phone": "+15551234567",
  "company": "Example Co",
  "jobTitle": "Head of Sales",
  "source": "linkedin",
  "status": "new",
  "notes": "Interested in outbound automation."
}
```

### Campaigns

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/campaigns` | Get all campaigns |
| POST | `/api/campaigns` | Create a campaign |
| GET | `/api/campaigns/:id` | Get one campaign |
| PUT | `/api/campaigns/:id` | Update a campaign |
| DELETE | `/api/campaigns/:id` | Delete a campaign |
| GET | `/api/campaigns/dashboard/metrics` | Get campaign dashboard metrics |

Example campaign body:

```json
{
  "name": "Q3 LinkedIn Leads",
  "description": "Campaign targeting SaaS founders.",
  "platform": "linkedin",
  "status": "active",
  "budget": 500,
  "targetLeads": 100
}
```

### Outreach

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/outreach/send` | Create an outreach message |
| GET | `/api/outreach/history` | Get outreach history |
| GET | `/api/outreach/stats` | Get outreach status totals |
| PATCH | `/api/outreach/:id/status` | Update outreach status |

Example outreach body:

```json
{
  "lead": "64b7f2f62a37d55c9f1c1234",
  "campaign": "64b7f2f62a37d55c9f1c5678",
  "platform": "linkedin",
  "subject": "Quick idea for your team",
  "message": "Hi Alex, I noticed your team is growing...",
  "status": "draft"
}
```

### Templates

The server also mounts template-style outreach routes under `/api/template`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/template/send` | Create a message through the template route |
| GET | `/api/template/history` | Get message history through the template route |
| PATCH | `/api/template/:id/status` | Update message status through the template route |

### Analytics

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/analytics/dashboard` | Get dashboard analytics |
| GET | `/api/analytics/monthly` | Get monthly performance analytics |
| GET | `/api/analytics/platforms` | Get platform breakdown |
| GET | `/api/analytics/pipeline` | Get pipeline analytics |
| GET | `/api/analytics/campaigns/top` | Get top campaigns |
| GET | `/api/analytics/outreach` | Get outreach analytics |

### Accounts

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/accounts` | Get connected accounts |
| POST | `/api/accounts` | Connect an account |
| GET | `/api/accounts/:id` | Get one account |
| DELETE | `/api/accounts/:id` | Delete an account |
| PATCH | `/api/accounts/:id/disconnect` | Disconnect an account |
| GET | `/api/accounts/stats/platforms` | Get account totals by platform |
| GET | `/api/accounts/health` | Get connected, expired, and disconnected account counts |

Example account body:

```json
{
  "platform": "linkedin",
  "accountName": "Jane Doe LinkedIn",
  "accountId": "linkedin-123",
  "status": "connected"
}
```

### AI

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/ai/generate` | Generate AI content from a prompt and type |
| POST | `/api/ai/outreach` | Generate an outreach message |
| POST | `/api/ai/followup` | Generate a follow-up message |
| POST | `/api/ai/rewrite` | Rewrite a message in a selected tone |
| POST | `/api/ai/subject` | Generate subject lines |
| GET | `/api/ai/history` | Get AI generation history |

Example AI generation body:

```json
{
  "prompt": "Write a short campaign intro for SaaS founders.",
  "type": "outreach"
}
```

## Common Values

Supported platforms:

```text
linkedin, twitter, instagram, facebook, email
```

Lead statuses:

```text
new, contacted, qualified, proposal, won, lost
```

Campaign statuses:

```text
draft, active, paused, completed
```

Outreach statuses:

```text
draft, scheduled, sent, delivered, opened, replied, failed
```

AI generation types:

```text
outreach, followup, campaign, rewrite, subject
```

## API Documentation

The OpenAPI specification is available in `swagger.yaml`. Use it with Swagger UI, Postman, Insomnia, or any OpenAPI-compatible tool to explore request and response schemas.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server with nodemon |
| `npm start` | Start the server with Node |
| `npm test` | Run Jest tests |

## Response Format

Successful responses usually return:

```json
{
  "success": true,
  "data": {}
}
```

List responses usually include a count:

```json
{
  "success": true,
  "count": 1,
  "data": []
}
```

Error responses usually return:

```json
{
  "message": "Error message"
}
```
