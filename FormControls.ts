export class FormControls {
  cardNumberInput: HTMLInputElement;
  cardFirstNameInput: HTMLInputElement;
  cardLastNameInput: HTMLInputElement;
  cardExpiryInput: HTMLInputElement;
  cardZipCodeInput: HTMLInputElement;
  cardCvvInput: HTMLInputElement;
  firstNameDisplay: HTMLElement;
  lastNameDisplay: HTMLElement;
  cardNumberDisplay: HTMLElement;
  cardExpiryDisplay: HTMLElement;
  cardCvvDisplay: HTMLElement;
  submitButton: HTMLButtonElement;

  constructor() {
    this.cardNumberInput = document.getElementById(
      "card-number"
    ) as HTMLInputElement;
    this.cardFirstNameInput = document.getElementById(
      "first-name"
    ) as HTMLInputElement;
    this.cardLastNameInput = document.getElementById(
      "last-name"
    ) as HTMLInputElement;
    this.cardExpiryInput = document.getElementById(
      "expiration-date"
    ) as HTMLInputElement;
    this.cardZipCodeInput = document.getElementById(
      "zip-code"
    ) as HTMLInputElement;
    this.cardCvvInput = document.querySelector(
      ".cvv-input"
    ) as HTMLInputElement;

    this.firstNameDisplay = document.querySelector(
      ".card-first-name"
    ) as HTMLElement;
    this.lastNameDisplay = document.querySelector(
      ".card-last-name"
    ) as HTMLElement;
    this.cardNumberDisplay = document.querySelector(
      ".card-number"
    ) as HTMLElement;
    this.cardExpiryDisplay = document.querySelector(
      ".card-expiry"
    ) as HTMLElement;
    this.cardCvvDisplay = document.getElementById("cvv-number") as HTMLElement;
    this.submitButton = document.getElementById(
      "submit-btn"
    ) as HTMLButtonElement;

    this.initEventListeners();
  }

  // starts the event listeners for the form controls,
  // used for updating the card display and submit button state
  private initEventListeners() {
    this.cardNumberInput.addEventListener(
      "input",
      this.handleCardNumberInput.bind(this)
    );
    this.cardLastNameInput.addEventListener(
      "input",
      this.handleCardLastNameInput.bind(this)
    );
    this.cardFirstNameInput.addEventListener(
      "input",
      this.handleCardFirstNameInput.bind(this)
    );
    this.cardExpiryInput.addEventListener(
      "input",
      this.handleCardExpiryInput.bind(this)
    );
    this.cardCvvInput.addEventListener(
      "input",
      this.handleCardCvvInput.bind(this)
    );
    this.cardZipCodeInput.addEventListener(
      "input",
      this.handleCardZipCodeInput.bind(this)
    );
  }

  private handleCardNumberInput(event: Event) {
    let cardNumber = this.cardNumberInput.value.replace(/\D/g, ""); // \D matches any non-digit character
    cardNumber = cardNumber.match(/.{1,4}/g)?.join(" ") || "";

    const charCount = cardNumber.replace(/\s/g, "").length; // Removes all whitespace characters

    if (charCount >= 17) {
      if (charCount === 16) {
        this.cardNumberInput.value = cardNumber;
      } else {
        this.cardNumberInput.value = cardNumber.slice(0, -2);
      }

      this.updateSubmitButtonState();
      return;
    }

    if (charCount < 15 || charCount > 16) {
      if (
        cardNumber[0] !== cardNumber[cardNumber.length - 1] &&
        charCount >= 16
      ) {
        cardNumber = cardNumber.slice(0, -2);
        this.cardNumberInput.value = cardNumber;
        this.updateSubmitButtonState();
        return;
      }

      this.cardNumberInput.value = cardNumber;

      if (charCount >= 16) {
        cardNumber = cardNumber.slice(0, -2);
        this.cardNumberInput.value = cardNumber;
        this.updateSubmitButtonState();
        return;
      } else {
        if (charCount <= 16) {
          this.cardNumberDisplay.textContent = cardNumber;
        } else {
          this.cardNumberDisplay.textContent = cardNumber.slice(0, -1);
        }
      }

      this.cardNumberDisplay.textContent = cardNumber;

      this.updateSubmitButtonState();

      return;
    }

    this.cardNumberInput.value = cardNumber;
    this.cardNumberDisplay.textContent = cardNumber;
    this.updateSubmitButtonState();
  }

  private handleCardLastNameInput(event: Event) {
    const lastName = this.cardLastNameInput.value;
    this.lastNameDisplay.textContent = lastName.toUpperCase();
  }

  private handleCardFirstNameInput(event: Event) {
    const firstName = this.cardFirstNameInput.value;
    this.firstNameDisplay.textContent = firstName.toUpperCase();
  }

  private handleCardExpiryInput(event: any) {
    let expiry = this.cardExpiryInput.value;

    if (this.cardExpiryDisplay) {
      // Add a slash after the first two digits unless the user is deleting the slash
      if (expiry.length === 2 && event.inputType !== "deleteContentBackward") {
        expiry = expiry + "/";
        this.cardExpiryInput.value = expiry;
        this.cardExpiryDisplay.textContent = expiry;
      } else if (expiry.length === 5) {
        this.cardExpiryDisplay.textContent = expiry;
        this.cardExpiryInput.value = expiry;
      } else {
        if (expiry.length > 5) {
          this.cardExpiryDisplay.textContent = expiry.slice(0, -1);
          this.cardExpiryInput.value = expiry.slice(0, -1);
        } else {
          this.cardExpiryDisplay.textContent = expiry;
          this.cardExpiryInput.value = expiry;
        }
      }
      this.updateSubmitButtonState();
    }
  }

  private handleCardCvvInput(event: Event) {
    let cvv = this.cardCvvInput.value;

    if (this.cardCvvInput) {
      if (cvv.length === 3 || cvv.length === 4) {
        this.cardCvvDisplay.textContent = cvv;
      } else {
        if (cvv.length > 4) {
          this.cardCvvDisplay.textContent = cvv.slice(0, -1);
          this.cardCvvInput.value = cvv.slice(0, -1);
        } else {
          this.cardCvvDisplay.textContent = cvv;
        }
      }
      this.updateSubmitButtonState();
    }
  }

  private handleCardZipCodeInput(event: Event) {
    let zipCode = this.cardZipCodeInput.value.replace(/\D/g, ""); // Remove any non-digit characters

    if (zipCode.length > 9) {
      zipCode = zipCode.slice(0, 9);
    }
    this.cardZipCodeInput.value = zipCode;
    this.updateSubmitButtonState();
  }

  private updateSubmitButtonState(): void {
    const allRequirementsMet =
      (this.cardNumberInput.value.length === 18 || // 18 because of the space characters
        this.cardNumberInput.value.length === 19) && // 19 because of the space characters
      this.cardNumberInput.value[0] ===
        this.cardNumberInput.value[this.cardNumberInput.value.length - 1] &&
      (this.cardCvvInput.value.length === 3 || // 3 or 4 digits
        this.cardCvvInput.value.length === 4) && // 3 or 4 digits
      (this.cardZipCodeInput.value.length === 5 || // 5 or 9 digits
        this.cardZipCodeInput.value.length === 9) && // 5 or 9 digits
      this.cardFirstNameInput.value.length >= 1 &&
      this.cardLastNameInput.value.length >= 1 &&
      this.cardExpiryInput.value.length === 5; // MM/YY format length

    console.log(allRequirementsMet);

    this.submitButton.disabled = !allRequirementsMet;
  }
}
