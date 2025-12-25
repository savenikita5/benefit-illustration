const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = require("../repositories/user.repository");
const { validateAuthInput } = require("../utils/auth.validation.util");

exports.register = async (req, res, next) => {
  try {
    validateAuthInput(req.body);

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await repo.createUser(email, hashedPassword);

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    validateAuthInput(req.body);

    const { email, password } = req.body;
    const user = await repo.findByEmail(email);

    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token }
    });
  } catch (err) {
    next(err);
  }
};
