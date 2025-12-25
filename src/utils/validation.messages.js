module.exports = {
  AGE_RANGE: "Valid age should be between 23 and 56",
  PPT_RANGE: "Premium Payment Term (PPT) should be between 5 and 10 years",
  PT_RANGE: "Policy Term (PT) should be between 10 and 20 years",
  PT_GREATER_THAN_PPT: "Policy Term (PT) should be greater than Premium Payment Term (PPT)",
  PREMIUM_RANGE: "Modal premium should be between 10,000 and 80,000",
  INVALID_PREMIUM_FREQUENCY: "Premium frequency must be Yearly, Half-Yearly, or Monthly",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email format",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",

  SUM_ASSURED_MIN: (min) =>
    `Sum assured should be at least ${min}`
};
