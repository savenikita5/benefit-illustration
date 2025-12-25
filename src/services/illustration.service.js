const rates = require("../utils/bonusRates");
const { validateInput } = require("../utils/validation.util");

exports.generateIllustration = (input) => {
  validateInput(input);

  let totalBonus = 0;
  const rows = [];

  for (let year = 1; year <= input.pt; year++) {
    const premium = year <= input.ppt ? input.modalPremium : 0;
    const bonusRate = rates[year] || 0;
    const bonusAmount = input.sumAssured * bonusRate;
    totalBonus += bonusAmount;

    const totalBenefit =
      year === input.pt ? input.sumAssured + totalBonus : 0;

    rows.push({
      policyYear: year,
      premium,
      bonusRate,
      bonusAmount,
      totalBenefit,
      netCashflow: totalBenefit - premium
    });
  }

  return rows;
};
