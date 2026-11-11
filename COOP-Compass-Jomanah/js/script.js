// COOP Compass - form validation and interactive events
"use strict";

function showError(input, message) {
  input.classList.add("invalid");
  const errorElement = document.getElementById(input.id + "Error");
  if (errorElement) errorElement.textContent = message;
}

function clearError(input) {
  input.classList.remove("invalid");
  const errorElement = document.getElementById(input.id + "Error");
  if (errorElement) errorElement.textContent = "";
}

function isValidEmail(email) {
  // Basic format check for this front-end assignment (not server authentication).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMessage(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = "form-message " + type;
}

// Loop through required controls and check that no field is empty.
function validateRequiredFields(inputs) {
  let isValid = true;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!input.value.trim()) {
      showError(input, "This field is required.");
      isValid = false;
    } else {
      clearError(input);
    }
  }
  return isValid;
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const message = document.getElementById("loginMessage");
  const fields = [email, password];

  let valid = validateRequiredFields(fields);

  if (email.value.trim() && !isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    valid = false;
  }

  if (password.value && password.value.length < 8) {
    showError(password, "Password must be at least 8 characters.");
    valid = false;
  }

  if (valid) {
    setMessage(message, "The form is valid. Demo only: no real login service is connected.", "success");
  } else {
    setMessage(message, "Please correct the highlighted fields.", "error");
  }
}

function handleSignup(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("studentEmail");
  const studentId = document.getElementById("studentId");
  const major = document.getElementById("major");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const message = document.getElementById("signupMessage");
  const fields = [fullName, email, studentId, major, password, confirmPassword];

  let valid = validateRequiredFields(fields);

  if (fullName.value.trim() && fullName.value.trim().length < 3) {
    showError(fullName, "Please enter at least 3 characters.");
    valid = false;
  }
  if (email.value.trim() && !isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    valid = false;
  }
  if (studentId.value.trim() && !/^[0-9]{5,15}$/.test(studentId.value.trim())) {
    showError(studentId, "Student ID should contain 5 to 15 digits.");
    valid = false;
  }
  if (password.value && password.value.length < 8) {
    showError(password, "Password must be at least 8 characters.");
    valid = false;
  }
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match.");
    valid = false;
  }

  if (valid) {
    setMessage(message, "All fields are valid. Demo only: no account was saved or sent to a server.", "success");
    document.getElementById("signupForm").reset();
  } else {
    setMessage(message, "Please correct the highlighted fields.", "error");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Functions and Events: submit event listeners.
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (signupForm) signupForm.addEventListener("submit", handleSignup);

  // Clear a field's error as the user edits it (input event).
  const allInputs = document.querySelectorAll(".form-card input, .form-card select");
  allInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      clearError(input);
    });
    input.addEventListener("change", function () {
      clearError(input);
    });
  });

  const forgotLink = document.getElementById("forgotLink");
  if (forgotLink) {
    forgotLink.addEventListener("click", function (event) {
      event.preventDefault();
      const message = document.getElementById("loginMessage");
      setMessage(message, "For this class demo, password recovery is not connected to a server.", "error");
    });
  }
});
