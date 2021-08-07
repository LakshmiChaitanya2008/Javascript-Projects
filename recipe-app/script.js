import { APP_ID, APP_KEY } from "./config.js";

const input = document.querySelector("input");
const form = document.querySelector("form");
const recipesContainer = document.querySelector(".recipes");

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
