const APP_ID = "fe4a26f4";
const APP_KEY = "31eac63f01ad8e529453651f9fdd87d4";

const input = document.querySelector("input");
const form = document.querySelector("form");
const recipesContainer = document.querySelector(".recipes");

window.addEventListener("load", function () {
  const arr = ["egg", "pizza", "burger", "india", "US", "australia", "china"];
  const random = arr[Math.trunc(Math.random() * arr.length + 1)];
  getResults(random);
});

const renderSpinner = function () {
  recipesContainer.insertAdjacentHTML(
    `afterbegin`,
    `<div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
     </div>
`
  );
};

const renderRecipes = function (data) {
  const html = `
    <div class="card">
        <img src="${data.recipe.image}" alt="${data.recipe.label}" />
        <h3>${data.recipe.label}</h3>
        <a class="btn" href="${data.recipe.url}">Get Recipe </a>
    </div> 
   `;
  recipesContainer.insertAdjacentHTML("beforeend", html);
};

const getResults = async function (foodItem) {
  renderSpinner();
  const res =
    await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodItem}&app_id=${APP_ID}&app_key=${APP_KEY}
  `);

  const data = await res.json();

  const { hits: recipes } = data;

  console.log(recipes);
  recipesContainer.innerHTML = "";

  recipes.forEach((cur) => renderRecipes(cur));
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getResults(input.value);
});
