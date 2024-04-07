export class Animations {
  static bounceElement(element: HTMLElement): void {
    element.classList.add("bounce2");

    setTimeout(() => {
      element.classList.remove("bounce2");
    }, 6000);
  }

  static displayMessage(
    element: HTMLElement,
    message: string,
    isSuccess: boolean
  ): void {
    element.textContent = message;
    if (isSuccess) {
      element.classList.add("success-message");
      element.classList.remove("error-message");
    } else {
      element.classList.add("error-message");
      element.classList.remove("success-message");
    }
  }

  static scrollToTop(smooth: boolean = true): void {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }
}
