const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.get("/ping", (req, res) => {
  const host = req.query.host || "localhost";

  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    res.json({
      ok: !error,
      stdout,
      stderr,
    });
  });
});

router.get("/redirect", (req, res) => {
  const next = req.query.next || "/";
  res.redirect(next);
});

router.post("/audit-log", (req, res) => {
  console.log(`AUDIT ${new Date().toISOString()} ${JSON.stringify(req.body)}`);
  res.json({ stored: true });
});

module.exports = router;
