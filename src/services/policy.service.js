const illustrationService = require("./illustration.service");
const repo = require("../repositories/policy.repository");

exports.calculatePolicy = async (userId, input) => {
  const illustration = illustrationService.generateIllustration(input);
  await repo.saveCalculation(userId, input);
  return { irr: "8.4%", illustration };
};
