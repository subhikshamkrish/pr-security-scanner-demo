# Vulnerable Demo App

Deliberately vulnerable Node.js/Express app for demonstrating the Differential PR Security Scanner.

The code includes realistic SAST findings such as:
- Hardcoded secrets
- SQL injection
- Command injection
- Path traversal
- Weak crypto
- Unsafe eval
- XSS-prone HTML rendering
- Insecure randomness

## Run Locally

```bash
npm install
npm start
```

The app listens on `http://localhost:3000`.

## GitHub Actions Setup

Create these repository secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

Create these repository variables:
- `AWS_REGION`
- `SCANNER_REPORT_BUCKET`
- `SCANNER_TRIGGER_LAMBDA_NAME`

AWS Learner Lab credentials expire, so update the three AWS secrets whenever a new lab session starts.

test1
