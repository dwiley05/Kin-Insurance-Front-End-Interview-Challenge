import { FormControls } from "./FormControls.js";
import { FormValidation } from "./FormValidation.js";
import { Animations } from "./Animations.js";

document.addEventListener("DOMContentLoaded", () => {
  const formControls = new FormControls();
  const resultsTextDisplay = document.getElementById(
    "results-text"
  ) as HTMLElement;
  const cardContainer = document.querySelector(
    ".card-container"
  ) as HTMLElement;

  const form = document.getElementById("credit-card-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const cardNumber = formControls.cardNumberInput.value;
      const cardFirstName = formControls.cardFirstNameInput.value;
      const cardLastName = formControls.cardLastNameInput.value;
      const cardExpiry = formControls.cardExpiryInput.value;
      const cardCvv = formControls.cardCvvInput.value;
      const cardZipCode = formControls.cardZipCodeInput.value;

      if (
        FormValidation.areAllRequirementsMet(
          cardNumber,
          cardCvv,
          cardZipCode,
          cardExpiry,
          cardFirstName,
          cardLastName
        )
      ) {
        const payload = {
          cardNumber,
          cardFirstName,
          cardLastName,
          cardExpiry,
          cardCvv,
          cardZipCode,
        };

        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Animations.scrollToTop();
            Animations.bounceElement(cardContainer);
            Animations.displayMessage(
              resultsTextDisplay,
              `Success! Your card has been processed. Payment ID: ${data.id}`,
              true
            );
          })
          .catch((error) => {
            Animations.displayMessage(
              resultsTextDisplay,
              `Error: ${error}`,
              false
            );
          });
      } else {
        Animations.displayMessage(
          resultsTextDisplay,
          "Please check your input and try again.",
          false
        );
      }
    });
  }
});
