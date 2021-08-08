const inputLen = document.querySelector("#inputLength");
const lowerCheck = document.querySelector("#lower");
const upperCheck = document.querySelector("#upper");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const password = document.querySelector(".psw");
const form = document.querySelector(".form");

let lower = "abcdefghijklmnopqrstuvwxyz";
let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let number = "0123456789";
let symbols = "!@#$%^&*()_+=";

const getLowerCase = function () {
  return lower[Math.trunc(Math.random() * lower.length)];
};

const getUpperCase = function () {
  return upper[Math.trunc(Math.random() * upper.length)];
};

const getNumbers = function () {
  return number[Math.trunc(Math.random() * number.length)];
};

const getSymbols = function () {
  return symbols[Math.trunc(Math.random() * symbols.length)];
};
const genratePassword = function () {
  let lenNum = Number(inputLen.value);
  let pass = "";
  for (let i = 1; i < lenNum; i++) {
    if (lowerCheck.checked) {
      pass += getLowerCase();
    }
    if (upperCheck.checked) {
      pass += getUpperCase();
    }
    if (symbolsCheck.checked) {
      pass += getSymbols();
    }
    if (numberCheck.checked) {
      pass += getNumbers();
    }
  }
  return pass.substring(0, lenNum + 1);
};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputLen.value === "") {
    alert("Enter a appropriate value!");
  }
  if (genratePassword() === "") {
    alert("Check any of the options!");
  } else {
    password.textContent = genratePassword();
  }
  inputLen.value = "";
});
