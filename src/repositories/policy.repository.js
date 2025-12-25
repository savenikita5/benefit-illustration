const pool = require("../db/mysql");

exports.saveCalculation = async (userId, input) => {
  await pool.execute(
    "INSERT INTO policy_calculations(user_id, input_payload) VALUES (?, ?)",
    [userId, JSON.stringify(input)]
  );
};
