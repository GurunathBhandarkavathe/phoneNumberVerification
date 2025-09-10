## Phone Number Verification (Node/Express)

Simple OTP-based phone number verification using Twilio, JWT, MongoDB (Mongoose), and a minimal single-page UI.

### Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string
- Twilio account with SMS sending enabled

### Environment Variables
Create a `.env` file in the project root with:

```env
PORT=3200
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-strong-secret

# Twilio credentials
TWILIO_ACCOUNT_SID = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxx'
TWILIO_AUTH_TOKEN = 'cxxxxxxxxxxxxxxxxxxxxxxxx'
TWILIO_VERIFY_SERVICE_SID = 'VAxxxxxxxxxxxxxxxxxxxxxxx'
```

### Install & Run
```bash
npm install
node app.js
# Server starts on http://localhost:3200 (or PORT from .env)
```

### Use the Web UI
Open `http://localhost:3200/` in your browser.
1) Enter name and mobile (E.164 format, e.g., +15551234567) to request OTP.
2) Enter the received OTP to complete registration.

### API Endpoints
- POST `/verify-mobile`
  - Body: `{ "name": string, "mobile": string }`
  - On success returns: `{ message: string, token: string }`
  - The `token` is a JWT used for the next step.

- POST `/register` (JWT required)
  - Headers: `Authorization: Bearer <token-from-verify-mobile>`
  - Body: `{ "otp": string }`
  - On success returns: `{ message: string, user: {...} }`

### cURL Examples
```bash
# 1) Request OTP
curl -X POST http://localhost:3200/verify-mobile \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","mobile":"+15551234567"}'

# Response contains a JWT token; export it for step 2
export TOKEN="<paste-token-here>"

# 2) Verify OTP and register
curl -X POST http://localhost:3200/register \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"otp":"123456"}'
```

### Notes
- OTP expires in 2 minutes. If expired, request a new OTP.
- The SPA source lives in `public/` and is served by Express static middleware.
- Update copy/UX in `public/index.html` if needed.


