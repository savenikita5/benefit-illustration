const { generateIllustration } = require("../src/services/illustration.service");
const { calculateAge } = require("../src/utils/age.util");
const { validateInput } = require("../src/utils/validation.util");

/* =====================================================
   BENEFIT ILLUSTRATION – CORE LOGIC TESTS
===================================================== */

describe("Benefit Illustration – Core Logic Tests", () => {

  test("Premium stops after PPT", () => {
    const res = generateIllustration({
      dob: "1999-12-12",
      sumAssured: 1200000,
      modalPremium: 80000,   // valid as per updated rule
      pt: 18,
      ppt: 10
    });

    // Year 11 (index 10) premium must be 0
    expect(res[10].premium).toBe(0);
  });

  test("Total benefit is given only at policy maturity (PT)", () => {
    const res = generateIllustration({
      dob: "1999-12-12",
      sumAssured: 1200000,
      modalPremium: 80000,
      pt: 18,
      ppt: 10
    });

    // Before maturity
    expect(res[16].totalBenefit).toBe(0);

    // At maturity (year 18, index 17)
    expect(res[17].totalBenefit).toBeGreaterThan(0);
  });

});


/* =====================================================
   DOB / AGE CALCULATION – ACB LOGIC
===================================================== */

describe("DOB / Age Calculation – ACB Logic", () => {

  test("Age should be calculated correctly when birthday already passed this year", () => {
    const dob = "1999-01-01";
    const age = calculateAge(dob);
    expect(age).toBeGreaterThanOrEqual(25);
  });

  test("Age should be calculated correctly when birthday is today", () => {
    const today = new Date();
    const dob = `${today.getFullYear() - 25}-${today.getMonth() + 1}-${today.getDate()}`;
    const age = calculateAge(dob);
    expect(age).toBe(25);
  });

  test("Age should reduce by 1 if birthday has not yet occurred this year", () => {
    const today = new Date();

    const dobDate = new Date(
      today.getFullYear() - 25,
      11, // December
      31
    );

    const dob = dobDate.toISOString().split("T")[0];
    const age = calculateAge(dob);

    expect(age).toBe(24);
  });

});


/* =====================================================
   AGE VALIDATION
===================================================== */

describe("DOB Validation – Age Limits (23 to 56)", () => {

  test("Should throw error if age is below minimum (23)", () => {
    const input = {
      dob: "2005-01-01",
      pt: 18,
      ppt: 10,
      modalPremium: 80000,
      sumAssured: 1200000
    };

    expect(() => validateInput(input))
      .toThrow("Valid age should be between 23 and 56");
  });

  test("Should throw error if age is above maximum (56)", () => {
    const input = {
      dob: "1960-01-01",
      pt: 18,
      ppt: 10,
      modalPremium: 80000,
      sumAssured: 1200000
    };

    expect(() => validateInput(input))
      .toThrow("Valid age should be between 23 and 56");
  });

});


describe("DOB Validation – Boundary Conditions", () => {

  test("Should allow minimum valid age = 23", () => {
    const today = new Date();
    const dob = `${today.getFullYear() - 23}-${today.getMonth() + 1}-${today.getDate()}`;

    const input = {
      dob,
      pt: 18,
      ppt: 10,
      modalPremium: 80000,
      sumAssured: 1200000
    };

    expect(() => validateInput(input)).not.toThrow();
  });

  test("Should allow maximum valid age = 56", () => {
    const today = new Date();
    const dob = `${today.getFullYear() - 56}-${today.getMonth() + 1}-${today.getDate()}`;

    const input = {
      dob,
      pt: 18,
      ppt: 10,
      modalPremium: 80000,
      sumAssured: 1200000
    };

    expect(() => validateInput(input)).not.toThrow();
  });

});


/* =====================================================
   PREMIUM VALIDATION (UPDATED LIMITS)
===================================================== */

describe("Premium Validation", () => {

  test("Should throw error if premium is below minimum", () => {
    const input = {
      dob: "1999-12-12",
      pt: 18,
      ppt: 10,
      modalPremium: 5000,
      sumAssured: 500000
    };

    expect(() => validateInput(input))
      .toThrow("Modal premium should be between 10,000 and 80,000");
  });

  test("Should throw error if premium is above maximum", () => {
    const input = {
      dob: "1999-12-12",
      pt: 18,
      ppt: 10,
      modalPremium: 90000,   // > 80k
      sumAssured: 900000
    };

    expect(() => validateInput(input))
      .toThrow("Modal premium should be between 10,000 and 80,000");
  });

});


/* =====================================================
   PREMIUM FREQUENCY VALIDATION
===================================================== */

describe("Premium Frequency Validation", () => {

  test("Should throw error for invalid premium frequency", () => {
    const input = {
      dob: "1999-12-12",
      pt: 18,
      ppt: 10,
      modalPremium: 20000,
      premiumFrequency: "Weekly",
      sumAssured: 500000
    };

    expect(() => validateInput(input))
      .toThrow("Premium frequency must be Yearly, Half-Yearly, or Monthly");
  });

});


/* =====================================================
   SUM ASSURED VALIDATION
===================================================== */

describe("Sum Assured Validation", () => {

  test("Should throw error if sum assured is less than minimum required", () => {
    const input = {
      dob: "1999-12-12",
      pt: 18,
      ppt: 10,
      modalPremium: 20000, // 10x = 200000 → min is 500000
      sumAssured: 150000
    };

    expect(() => validateInput(input))
      .toThrow("Sum assured should be at least 500000");
  });

});
