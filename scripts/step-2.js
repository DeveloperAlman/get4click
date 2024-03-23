"use strict";
//===========================================
// Timer
function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function formatTime(minutes, seconds) {
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

function startTimer() {
  let remainingTime = localStorage.getItem("remainingTime");

  if (remainingTime !== null) {
    let totalSeconds = parseInt(remainingTime);

    // Update the timer every second
    let intervalId = setInterval(function () {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      // Update the timer display
      document.getElementById("timer").textContent = formatTime(
        minutes,
        seconds
      );

      if (totalSeconds === 0) {
        clearInterval(intervalId);
        localStorage.removeItem("remainingTime");
        document.getElementById("timer").textContent = "Timer expired.";
      } else {
        totalSeconds--;
      }

      localStorage.setItem("remainingTime", totalSeconds);
    }, 1000);
  } else {
    document.getElementById("timer").textContent = "Timer expired.";
  }
}

window.onload = startTimer;

// Like button (static, no local storage)
let buttonLike = document.querySelectorAll(".button--like");

buttonLike.forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    element.classList.toggle("button--like-clicked");

    let buttonLikeSvgPath = element.querySelector("svg path");

    if (buttonLikeSvgPath) {
      buttonLikeSvgPath.classList.toggle("button--like-clicked");
    }
  });
});

document.querySelectorAll(".coupon__link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const agreeCheckbox = document.getElementById("agree");
  const submitButton = document.getElementById("submitButton");
  const checkboxError = document.getElementById("checkboxError");
  const promoCodeBox = document.getElementById("promoCodeBox");
  const couponsNav = document.querySelector(
    ".coupons-nav.timer-header__wrapper"
  );
  const copyButton = document.querySelector(".distributed-promocode__copy");

  // Check if promo code box was previously shown
  const promoCodeShown = sessionStorage.getItem("promoCodeShown");
  if (promoCodeShown === "true") {
    form.style.display = "none"; // Hide the form
    promoCodeBox.style.display = "block"; // Show the promo code box
    couponsNav.style.display = "none"; // Hide the aside element
  }

  // Function to check if all required fields are filled
  function checkFormValidity() {
    return (
      nameInput.validity.valid &&
      emailInput.validity.valid &&
      agreeCheckbox.checked
    );
  }

  // Function to update button style based on form validity
  function updateButtonStyle() {
    if (checkFormValidity()) {
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "#0a1b20"; // Blue color
      checkboxError.style.display = "none";
    } else {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#B6B6B6"; // Grey color
      checkboxError.style.display = !agreeCheckbox.checked ? "block" : "none";
    }
  }

  // Function to show promo code box, hide form, and hide aside element
  function showPromoCodeBox() {
    form.style.display = "none"; // Hide the form
    promoCodeBox.style.display = "block"; // Show the promo code box
    couponsNav.style.display = "none"; // Hide the aside element
    sessionStorage.setItem("promoCodeShown", "true"); // Save the state to sessionStorage
  }

  // Update button style when input fields change
  form.addEventListener("input", updateButtonStyle);

  // Update button style when checkbox state changes
  agreeCheckbox.addEventListener("change", updateButtonStyle);

  // Update button style on page load
  updateButtonStyle();

  form.addEventListener("submit", function (event) {
    // Prevent form submission if form is not valid
    if (!checkFormValidity()) {
      event.preventDefault();
      return;
    }
    // Show promo code box if form is valid
    showPromoCodeBox();
  });

  // Function to copy the promo code value
  function copyPromoCode() {
    const promoCodeValue = document.querySelector(
      ".distributed-promocode__value"
    ).innerText;

    // Create a temporary textarea element to hold the promo code text
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = promoCodeValue;
    document.body.appendChild(tempTextarea);

    // Select and copy the text from the temporary textarea
    tempTextarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextarea);

    console.log("Promo code copied successfully:", promoCodeValue);
  }

  // Add click event listener to the copy button
  copyButton.addEventListener("click", copyPromoCode);
});
