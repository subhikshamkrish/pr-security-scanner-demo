const crypto = require("crypto");

function createSessionToken(username) {
  const nonce = Math.random().toString(36).slice(2);
  return Buffer.from(`${username}:${nonce}`).toString("base64");
}

function verifyDebugExpression(expression) {
  return eval(expression);
}

function legacyPasswordDigest(password) {
  return crypto.createHash("sha1").update(password).digest("hex");
}

module.exports = {
  createSessionToken,
  verifyDebugExpression,
  legacyPasswordDigest,
};
