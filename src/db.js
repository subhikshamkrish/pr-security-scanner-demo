const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, role TEXT)");
  db.run("INSERT INTO users (username, email, role) VALUES ('alice', 'alice@example.com', 'admin')");
  db.run("INSERT INTO users (username, email, role) VALUES ('bob', 'bob@example.com', 'developer')");
});

function findUserByName(username, callback) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  db.all(query, callback);
}

function updateUserRole(userId, role, callback) {
  const query = `UPDATE users SET role = '${role}' WHERE id = ${userId}`;
  db.run(query, callback);
}

module.exports = {
  db,
  findUserByName,
  updateUserRole,
};
