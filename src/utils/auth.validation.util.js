const MESSAGES = require("./validation.messages");

exports.validateAuthInput = ({ email, password }) => {

  if (!email) {
    const err = new Error(MESSAGES.EMAIL_REQUIRED);
    err.statusCode = 400;
    throw err;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const err = new Error(MESSAGES.EMAIL_INVALID);
    err.statusCode = 400;
    throw err;
  }

  if (!password) {
    const err = new Error(MESSAGES.PASSWORD_REQUIRED);
    err.statusCode = 400;
    throw err;
  }

  if (password.length < 8) {
    const err = new Error(MESSAGES.PASSWORD_MIN_LENGTH);
    err.statusCode = 400;
    throw err;
  }

  return true;
};
