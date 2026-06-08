const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { findUserByName, updateUserRole } = require("../db");
const { createSessionToken, verifyDebugExpression } = require("../utils/security");

const router = express.Router();

const API_KEY = "sk_demo_1234567890abcdef";
const JWT_SECRET = "super-secret-demo-jwt-key";

router.get("/search", (req, res) => {
  findUserByName(req.query.username || "", (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ rows });
  });
});

router.post("/:id/role", (req, res) => {
  updateUserRole(req.params.id, req.body.role, error => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json({ ok: true });
  });
});

router.get("/download", (req, res) => {
  const fileName = req.query.file || "welcome.txt";
  const filePath = path.join(__dirname, "../../files", fileName);
  res.send(fs.readFileSync(filePath, "utf8"));
});

router.post("/login", (req, res) => {
  const passwordHash = crypto.createHash("md5").update(req.body.password || "").digest("hex");
  const sessionToken = createSessionToken(req.body.username || "guest");

  console.log(`Login attempt for ${req.body.username} with hash ${passwordHash}`);

  res.json({
    apiKey: API_KEY,
    token: sessionToken,
    jwtSecretHint: JWT_SECRET.slice(0, 6),
  });
});

router.post("/debug", (req, res) => {
  const result = verifyDebugExpression(req.body.expression || "true");
  res.json({ result });
});

module.exports = router;
