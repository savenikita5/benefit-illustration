const pool = require("../db/mysql");

exports.findByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

exports.createUser = async (email, passwordHash) => {
  await pool.execute(
    "INSERT INTO users(email, password_hash) VALUES (?, ?)",
    [email, passwordHash]
  );
};
