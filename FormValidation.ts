export class FormValidation {
  static isValidCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, "");

    return (
      (cleaned.length === 16 || cleaned.length === 15) &&
      cleaned[0] === cleaned[cleaned.length - 1]
    );
  }

  static isValidCvv(cvv: string): boolean {
    return cvv.length === 3 || cvv.length === 4;
  }

  static isValidZipCode(zipCode: string): boolean {
    return zipCode.length === 5 || zipCode.length === 9;
  }

  static isValidExpiryDate(expiryDate: string): boolean {
    // Check if expiry date follows the MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return regex.test(expiryDate);
  }

  static isValidName(name: string): boolean {
    return name.trim().length > 0;
  }

  static areAllRequirementsMet(
    cardNumber: string,
    cvv: string,
    zipCode: string,
    expiryDate: string,
    firstName: string,
    lastName: string
  ): boolean {
    return (
      this.isValidCardNumber(cardNumber) &&
      this.isValidCvv(cvv) &&
      this.isValidZipCode(zipCode) &&
      this.isValidExpiryDate(expiryDate) &&
      this.isValidName(firstName) &&
      this.isValidName(lastName)
    );
  }
}
