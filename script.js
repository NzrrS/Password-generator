window.addEventListener("DOMContentLoaded", generatePsw);
const password = document.getElementById("password");
const lengthNmbr = document.getElementById("passLength");
const rangeNmbr = document.getElementById("passRangeLength");
const preferences = document.querySelectorAll("[name='preference']");
const strengthBar = document.getElementById("strength-bar");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?/";
const simple = upperChars + lowerChars + numbers + "!@$+-?_";

preferences.forEach((pref) => {
  pref.addEventListener("input", generatePsw);
});

lengthNmbr.addEventListener("input", () => {
  let val = Number(lengthNmbr.value);
  if (val < rangeNmbr.min) val = rangeNmbr.min;
  if (val > rangeNmbr.max) val = rangeNmbr.max;
  rangeNmbr.value = val;
  lengthNmbr.value = val;
  generatePsw();
});

rangeNmbr.addEventListener("input", () => {
  lengthNmbr.value = rangeNmbr.value;
  generatePsw();
});
function generatePsw() {
  let result = "";
  let preference = "all";
  preferences.forEach((ele) => {
    if (ele.checked) {
      preference = ele.value;
    }
  });
  let Psslength = Number(lengthNmbr.value);

  let chars = "";

  if (preference === "all") {
    chars = upperChars + lowerChars + numbers + symbols;
  } else if (preference === "say") {
    chars = upperChars + lowerChars;
  } else {
    chars = simple;
  }
  for (let i = 0; i < Psslength; i++) {
    const strIndx = Math.floor(Math.random() * chars.length);
    result += chars[strIndx];
  }
  password.value = result;

  strengthCheck(result);
}

function strengthCheck(result) {
  let score = 0;
  if (result.match(/[a-z]/)) score++; // lowercase
  if (result.match(/[A-Z]/)) score++; // uppercase
  if (result.match(/[0-9]/)) score++; // numbers
  if (result.match(/[^A-Za-z0-9]/)) score++; // symbols

  if (result.length >= 10 && score === 4) {
    strengthBar.className = "strength-bar strong";
  } else if (result.length >= 8 && score >= 3) {
    strengthBar.className = "strength-bar medium";
  } else if (result.length >= 4 && score >= 1) {
    strengthBar.className = "strength-bar weak";
  } else {
    strengthBar.className = "strength-bar";
  }
}

document.querySelector(".copyBtn").addEventListener("click", () => {
  password.select();
  navigator.clipboard.writeText(password.value);
  alert("Copied : " + password.value);
});

document.querySelector(".genreateBtn").addEventListener("click", generatePsw);

password.addEventListener("input", () => {
  strengthCheck(password.value);
  lengthNmbr.value = password.value.length;
  rangeNmbr.value = password.value.length;
});
