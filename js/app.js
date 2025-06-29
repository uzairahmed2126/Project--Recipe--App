const text = document.getElementById("txt");
const btn = document.getElementById("btn");
const mainContainer = document.getElementById("details-section");
const msgContainer = document.getElementById("msg-container");

async function getData(query) {
   mainContainer.innerHTML = "";
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  data.meals.forEach((meal) => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("recipe");
    // Image
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = meal.strMealThumb;
    createDiv.append(img);
    // Title
    const name = document.createElement("h3");
    name.textContent = `Name : ${meal.strMeal}`;
    createDiv.append(name);
    // Area
    const area = document.createElement("h3");
    area.textContent = `Area : ${meal.strArea}`;
    createDiv.append(area);
    // Category
    const category = document.createElement("h3");
    category.textContent = `Category : ${meal.strCategory}`;
    createDiv.append(category);
    // Measure
    const measure = document.createElement("h3");
    measure.textContent = `Measure in grams : ${meal.strMeasure1}`;
    createDiv.append(measure);
    // Instructions (Hidden until hover)
    const instructions = document.createElement("p");
    instructions.textContent = meal.strInstructions;
    instructions.classList.add("more-info");
    createDiv.append(instructions);

    // Finally append to main container
    mainContainer.append(createDiv);
  });
}
function handleEvent(event) {
  event.preventDefault();
  const searchInput = text.value.trim();
  if (searchInput==="") {
    const createDiv = document.createElement("div");
    const btn = document.createElement('button');
    btn.type="submit";
    btn.textContent = "Go For Search!";
    btn.id = "popup-btn";
    createDiv.id = "popup";
    createDiv.textContent = "Search Something!!";
    createDiv.append(btn)
    document.body.append(createDiv);
    btn.addEventListener("click",()=>{
      createDiv.classList.add("toggle")  
    })
  } else {
    msgContainer.classList.add("toggle");
    mainContainer.style.marginTop = "0px";
    getData(searchInput);
    text.value = "";
  }
}

btn.addEventListener("click", handleEvent);
