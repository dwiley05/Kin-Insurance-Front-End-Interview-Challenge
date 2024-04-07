import { FormValidation } from "../FormValidation.js";

function assert(condition: boolean, message: string) {
  console.assert(condition, message);
  if (condition) {
    console.log("Success:", message);
  } else {
    console.error("Failed:", message);
  }
}

function testIsValidCardNumber() {
  console.log("Test isValidCardNumber:");
  assert(
    FormValidation.isValidCardNumber("1234 5678 9123 4561") === true,
    "Card number with 16 digits should be valid if first and last digits are the same"
  );
  assert(
    FormValidation.isValidCardNumber("1234 5678 9123 4") === false,
    "Card number with less than 15 digits should be invalid"
  );
  assert(
    FormValidation.isValidCardNumber("1234 5678 9123 45678") === false,
    "Card number with more than 16 digits should be invalid"
  );
}

function testIsValidCvv() {
  console.log("Test isValidCvv:");
  assert(
    FormValidation.isValidCvv("123") === true,
    "CVV with 3 digits should be valid"
  );
  assert(
    FormValidation.isValidCvv("1234") === true,
    "CVV with 4 digits should be valid"
  );
  assert(
    FormValidation.isValidCvv("12") === false,
    "CVV with less than 3 digits should be invalid"
  );
}

function testIsValidZipCode() {
  console.log("Test isValidZipCode:");
  assert(
    FormValidation.isValidZipCode("12345") === true,
    "Zip code with 5 digits should be valid"
  );
  assert(
    FormValidation.isValidZipCode("123456789") === true,
    "Zip code with 9 digits should be valid"
  );
  assert(
    FormValidation.isValidZipCode("1234") === false,
    "Zip code with less than 5 digits should be invalid"
  );
}

function testIsValidExpiryDate() {
  console.log("Test isValidExpiryDate:");
  console.assert(
    FormValidation.isValidExpiryDate("12/34") === true,
    "Expiry date in MM/YY format should be valid"
  );
  console.assert(
    FormValidation.isValidExpiryDate("123/456") === false,
    "Expiry date not in MM/YY format should be invalid"
  );
}

function testIsValidName() {
  console.log("Test isValidName:");
  assert(
    FormValidation.isValidName("John") === true,
    "Non-empty name should be valid"
  );
  assert(
    FormValidation.isValidName("") === false,
    "Empty name should be invalid"
  );
}

function testAreAllRequirementsMet() {
  console.log("Test areAllRequirementsMet:");
  assert(
    FormValidation.areAllRequirementsMet(
      "1234 5678 9123 4561",
      "123",
      "12345",
      "12/34",
      "John",
      "Doe"
    ) === true,
    "All valid inputs should return true"
  );
  assert(
    FormValidation.areAllRequirementsMet(
      "1234 5678 91234",
      "12",
      "1234",
      "123/456",
      "",
      ""
    ) === false,
    "Any invalid input should return false"
  );
}

function runAllTests() {
  testIsValidCardNumber();
  testIsValidCvv();
  testIsValidZipCode();
  testIsValidExpiryDate();
  testIsValidName();
  testAreAllRequirementsMet();
  console.log("All tests completed");
}

runAllTests();
