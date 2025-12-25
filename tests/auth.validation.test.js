const { validateAuthInput } = require("../src/utils/auth.validation.util");

describe("Auth Validation", () => {

  test("Should fail for invalid email", () => {
    expect(() =>
      validateAuthInput({ email: "abc", password: "password123" })
    ).toThrow("Invalid email format");
  });

  test("Should fail for short password", () => {
    expect(() =>
      validateAuthInput({ email: "test@mail.com", password: "123" })
    ).toThrow("Password must be at least 8 characters long");
  });

});
