const { calculateAge } = require("./age.util");
const MESSAGES = require("./validation.messages");

exports.validateInput = (i) => {
  /* ---------------- PPT VALIDATION ---------------- */
  if (i.ppt < 5 || i.ppt > 10) {
    throw new Error(MESSAGES.PPT_RANGE);
  }

  /* ---------------- PT VALIDATION ---------------- */
  if (i.pt < 10 || i.pt > 20) {
    throw new Error(MESSAGES.PT_RANGE);
  }

  /* ---------------- PT > PPT ---------------- */
  if (i.pt <= i.ppt) {
    throw new Error(MESSAGES.PT_GREATER_THAN_PPT);
  }

  /* ---------------- PREMIUM VALIDATION ---------------- */
  // NOTE: Max premium considered as 80,000 to match illustration sample
  if (i.modalPremium < 10000 || i.modalPremium > 80000) {
    throw new Error(MESSAGES.PREMIUM_RANGE);
  }

  /* ---------------- PREMIUM FREQUENCY ---------------- */
  const allowedFrequencies = ["Yearly", "Half-Yearly", "Monthly"];
  if (
    i.premiumFrequency &&
    !allowedFrequencies.includes(i.premiumFrequency)
  ) {
    throw new Error(MESSAGES.INVALID_PREMIUM_FREQUENCY);
  }

  /* ---------------- SUM ASSURED ---------------- */
  // Minimum of (10 × premium) OR 500,000
  const minSumAssured = Math.max(i.modalPremium * 10, 500000);
  if (i.sumAssured < minSumAssured) {
    throw new Error(MESSAGES.SUM_ASSURED_MIN(minSumAssured));
  }

  /* ---------------- AGE VALIDATION ---------------- */
  const age = calculateAge(i.dob);
  if (age < 23 || age > 56) {
    throw new Error(MESSAGES.AGE_RANGE);
  }

  // If all validations pass → input is valid
  return true;
};
