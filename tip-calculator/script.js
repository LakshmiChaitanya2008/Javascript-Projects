// (billAmount * tip) / numPeople
const billAmount = document.querySelector(".amount");
const tip = document.querySelector(".tip");
const numPeople = document.querySelector(".numPeople");
const btnCalc = document.querySelector(".btnCalc");
const finalTip = document.querySelector(".finalTip");
const finalAmount = document.querySelector(".finalAmount");

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let ftip = (+billAmount.value / 100) * +tip.value;
  let ftotal = +ftip + +billAmount.value;
  if (numPeople.value === "1") {
    finalTip.textContent = `Final Tip: ${ftip / +numPeople.value}$
    `;
    finalAmount.textContent = `Final Amount: ${ftotal / +numPeople.value}$
    `;
  } else {
    finalTip.textContent = `Final Tip: ${ftip / +numPeople.value}$
    each`;
    finalAmount.textContent = `Final Amount: ${
      ftotal / +numPeople.value
    }$ each`;
  }
});
