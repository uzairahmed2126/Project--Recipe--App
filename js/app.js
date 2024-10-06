const text = document.getElementById("txt");
const btn = document.getElementById("btn");
const mainContainer = document.getElementById("details-section");
const msgContainer = document.getElementById("msg-container");

async function getData(query) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=
${query}`
  );
  const data = await response.json();
  data.meals.forEach((meal) => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("recipe");
    createDiv.innerHTML = `<img class='img' src="${meal.strMealThumb}">
    <h3>Name : ${meal.strMeal}</h3>
    <h3>Area : ${meal.strArea}</h3>
    <h3>Category : ${meal.strCategory}</h3>
    <h3>Measure in grams : ${meal.strMeasure1}</h3>
    <h3 id='instruction'>${meal.strInstructions}</h3>`;
    mainContainer.append(createDiv);
  });
  console.log(data.meals);
}
function handleEvent(event) {
  event.preventDefault();
  const searchInput = text.value.trim();
  if (searchInput === "") {
    const createDiv = document.createElement("div");
    createDiv.id = "popup";
    createDiv.innerHTML = "Search Something!!";
    document.body.append(createDiv);
  } else {
    msgContainer.classList.add("toggle");
    mainContainer.style.marginTop = "0px";
    getData(searchInput);
  }
}

btn.addEventListener("click", handleEvent);
