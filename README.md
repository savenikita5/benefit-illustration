# Benefit Illustration Backend

## Overview
Backend service to generate **insurance benefit illustrations** based on the provided Excel / Google Sheet.

The focus of this assignment is on:
- Business logic accuracy
- Input validations
- Secure authentication
- Clean backend architecture
- Unit-testable calculation engine

UI is intentionally minimal. Emphasis is on backend correctness and design.

---

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** JWT
- **Testing:** Jest
- **Configuration:** dotenv

---

## Architecture
The application follows a **layered architecture**:

- **Controllers** – Handle HTTP requests and responses
- **Services** – Core business and calculation logic
- **Repositories** – Database access layer
- **Utils** – Reusable utilities (age calculation, validations)
- **Middlewares** – Authentication and cross-cutting concerns

Business logic is isolated from API and database layers.

---

## Business Rules & Validations
All validations are implemented as per the Excel input sheet.

- **Age:** 23 to 56 (Age Completed Birthday logic)
- **Premium Payment Term (PPT):** 5 to 10 years
- **Policy Term (PT):** 10 to 20 years
- **PT must be greater than PPT**
- **Modal Premium:** 10,000 to 80,000
- **Premium Frequency:** Yearly / Half-Yearly / Monthly
- **Sum Assured:** Minimum of  
  `max(10 × modalPremium, 500,000)`

Validation messages are standardized and centralized.

---

## Benefit Illustration Logic
- Premium is payable only until **Premium Payment Term (PPT)**
- Bonus rates are applied year-wise as per the Illustration sheet
- Bonus amounts accumulate annually
- **Total benefit is paid only at policy maturity (PT)**
- Net cashflows represent premium outflow and maturity inflow

### Premium Clarification
The Illustration sheet shows a **₹80,000 premium** because the sample input uses:

modalPremium = 80,000

yaml
Copy code

- Premium is **not hardcoded**
- It is taken dynamically from API input
- Validation range is considered **10,000–80,000** to align with the provided illustration

This assumption is documented to resolve inconsistencies in the Excel validation table.

---

## Security
- Passwords are stored as **hashed values**
- **Date of Birth (DOB)** is used only in-memory for age calculation and is **not persisted**
- Sensitive fields are never logged in plaintext
- Secrets are managed using environment variables
- Stateless authentication using **JWT**

---

## Database
MySQL is used as the relational database.

Schema is provided in:
db/schema.sql

yaml
Copy code

Tables:
- `users` – Authentication data
- `policy_calculations` – Stored calculation inputs (audit purpose)

The calculation engine itself does not depend on database reads.

---

## API Endpoints

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Policy
- `POST /policy/calculate`  
  (JWT protected)

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
2. Environment setup
bash
Copy code
cp .env.example .env
Update database credentials and JWT secret in .env.

3. Database setup
Run the schema file in MySQL:

pgsql
Copy code
db/schema.sql
4. Start the server
bash
Copy code
npx nodemon src/server.js
Testing
Unit tests are written using Jest and focus on business logic.

Run tests:

bash
Copy code
npx jest
Tests cover:

Premium stops after PPT

Total benefit at maturity (PT)

Age calculation (ACB logic)

Age boundary conditions

Premium, frequency, and sum assured validations

Notes
UI is intentionally minimal

Focus is on backend logic and correctness

Design allows future extension for bulk processing

Author
Nikita Save
Backend Developer – Node.js