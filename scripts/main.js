"use strict";
//===========================================
// Timer
// Function to format the time in MM:SS
function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

// Function to format time as MM:SS
function formatTime(minutes, seconds) {
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

// Function to start the countdown timer
function startTimer() {
  // Retrieve remaining time from localStorage
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

      // Check if the timer has reached 0
      if (totalSeconds === 0) {
        clearInterval(intervalId); // Stop the timer
        localStorage.setItem("remainingTime", 10 * 60); // Reset timer to 10 minutes
        startTimer(); // Restart the timer
      } else {
        // Decrease the totalSeconds by 1 second
        totalSeconds--;
      }

      // Store remaining time in localStorage
      localStorage.setItem("remainingTime", totalSeconds);
    }, 1000);
  } else {
    // If there is no remaining time stored, start the timer from 10 minutes
    localStorage.setItem("remainingTime", 10 * 60);
    startTimer();
  }
}

// Start the timer when the page loads
window.onload = startTimer;

//===========================================
// Filter toggle classes
const filterCoupon = document.querySelector(".filter-coupon");
const category = document.querySelector(".category");
filterCoupon.addEventListener("click", function () {
  category.classList.toggle("category--clicked");
  category.classList.toggle("category--padding");
});

//===========================================
// Preloader
const preloader = document.querySelector("[data-preloader]");
const html = document.querySelector("html");

window.addEventListener("load", () => {
  preloader.classList.add("remove");
  html.classList.add("preloaded");
});

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
