document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#recipes').scrollIntoView({ behavior: 'smooth' });
});

// Scroll functionality for the recipe carousel
const recipesContainer = document.querySelector('.recipes-container');

function scrollLeft() {
    recipesContainer.scrollBy({
        left: -recipesContainer.offsetWidth,
        behavior: 'smooth',
    });
}

function scrollRight() {
    recipesContainer.scrollBy({
        left: recipesContainer.offsetWidth,
        behavior: 'smooth',
    });
}

document.querySelector('.left-arrow').addEventListener('click', scrollLeft);
document.querySelector('.right-arrow').addEventListener('click', scrollRight);

// Existing recipes data
const recipes = {
    1: {
        name: "Bruschetta with Avocado and Egg",
        chef: "Chef A",
        difficulty: "Easy",
        prepTime: "15",
        description: "Light and stylish breakfast, perfect for a quick meal.",
        ingredients: ["4 slices of bread", "2 avocados", "2 eggs", "Salt", "Pepper"],
        instructions: ["Toast bread", "Mash avocados", "Spread and top with egg slices"],
        image: "https://via.placeholder.com/300",
    },
    2: {
        name: "Cheese Soufflé",
        chef: "Chef B",
        difficulty: "Medium",
        prepTime: "30",
        description: "A fluffy, cheesy delight.",
        ingredients: ["Butter", "Flour", "Cheese", "Milk", "Eggs"],
        instructions: ["Make roux", "Add cheese and yolks", "Fold whites and bake"],
        image: "https://via.placeholder.com/300",
    },
    3: {
        name: "Pancakes",
        chef: "Chef C",
        difficulty: "Easy",
        prepTime: "20",
        description: "Fluffy pancakes served with syrup.",
        ingredients: ["Flour", "Milk", "Egg", "Sugar", "Butter"],
        instructions: ["Mix dry and wet", "Pour on griddle", "Flip and serve"],
        image: "https://via.placeholder.com/300",
    },
};

// Generate recipe card dynamically
function createRecipeCard(recipeId, recipeData) {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
        <img src="${recipeData.image}" alt="${recipeData.name}" class="recipe-img">
        <div class="recipe-info">
            <h3>${recipeData.name}</h3>
            <p class="author">- ${recipeData.chef}</p>
            <div class="details">
                <span>${recipeData.difficulty}</span>
                <span>${recipeData.prepTime} mins</span>
            </div>
            <p class="description">${recipeData.description}</p>
            <div class="actions">
                <button class="view-btn" data-recipe-id="${recipeId}">View Meal</button>
                <button class="add-btn" onclick="addToMealPlan('${recipeData.name}')">Add to Meal Plan</button>
            </div>
        </div>
    `;

    // Attach event listeners
    recipeCard.querySelector('.view-btn').addEventListener('click', () => showCulinaryBox(recipeId));
    return recipeCard;
}

// Populate recipes dynamically
function updateRecipeSection() {
    recipesContainer.innerHTML = ''; // Clear current content
    Object.entries(recipes).forEach(([id, recipe]) => {
        const recipeCard = createRecipeCard(id, recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

// Display modal with recipe details
function showCulinaryBox(recipeId) {
    const recipe = recipes[recipeId];
    const culinaryBox = document.querySelector('.culinary-box-content');

    culinaryBox.innerHTML = `
        <button class="close-btn" onclick="closeCulinaryBox()">×</button>
        <img src="${recipe.image}" alt="${recipe.name}" class="culinary-img">
        <h2 class="recipe-name">${recipe.name}</h2>
        <p class="recipe-description">${recipe.description}</p>
        <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="instructions">
            <h3>Instructions</h3>
            <ol>${recipe.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
        </div>
    `;

    // Apply inline styles using JavaScript
    const recipeName = culinaryBox.querySelector('.recipe-name');
    const recipeDescription = culinaryBox.querySelector('.recipe-description');

    recipeName.style.textAlign = 'center';
    recipeName.style.fontFamily = "'Playfair Display', serif";
    recipeName.style.fontSize = '2em';
    recipeName.style.color = '#000814';
    recipeName.style.marginBottom = '15px';

    recipeDescription.style.textAlign = 'center';
    recipeDescription.style.fontFamily = "'Playfair Display', serif";
    recipeDescription.style.fontSize = '1.2em';
    recipeDescription.style.color = '#4a4a4a';
    recipeDescription.style.marginBottom = '20px';

    document.getElementById('culinary-box').style.display = 'flex';
}


// Close the recipe modal
function closeCulinaryBox() {
    document.getElementById('culinary-box').style.display = 'none';
}

// Add new recipe form submission
document.getElementById('recipe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const chefName = document.getElementById('chef-name').value;
    const recipeName = document.getElementById('recipe-name').value;
    const difficulty = document.getElementById('difficulty').value;
    const prepTime = document.getElementById('prep-time').value;
    const shortDescription = document.getElementById('short-description').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim());
    const instructions = document.getElementById('instructions').value.split('.').map(i => i.trim());
    const recipeImage = URL.createObjectURL(document.getElementById('recipe-image').files[0]);

    const newRecipeId = Date.now().toString();
    recipes[newRecipeId] = {
        name: recipeName,
        chef: chefName,
        difficulty: difficulty,
        prepTime: prepTime,
        description: shortDescription,
        ingredients: ingredients,
        instructions: instructions,
        image: recipeImage,
    };

    updateRecipeSection();
    showCustomAlert(`Recipe "${recipeName}" submitted successfully by Chef ${chefName}!`);
    this.reset();
});

// Initialize recipe section
updateRecipeSection();

// Function to add recipe to meal plan list
// Function to add a recipe to the meal plan
function addToMealPlan(recipeName) {
    const mealPlanList = document.getElementById('meal-plan-list');
    const existingItems = mealPlanList.getElementsByTagName('li');

    // Check if meal plan already has 5 meals
    if (existingItems.length >= 4) {
        showCustomAlert('You can only have 4 Meals in your Meal Plan!');
        return;
    }

    // Check if the recipe is already in the meal plan
    for (let i = 0; i < existingItems.length; i++) {
        if (existingItems[i].textContent === recipeName) {
            showCustomAlert(`${recipeName} is already in your meal plan!`);
            return;
        }
    }

    // Add the new recipe to the meal plan
    const newListItem = document.createElement('li');
    newListItem.textContent = recipeName;
    mealPlanList.appendChild(newListItem);
}

// Function to show custom alert
function showCustomAlert(message) {
    const alertElement = document.getElementById('custom-alert');
    alertElement.textContent = message;
    alertElement.style.display = 'block';
}

// Function to close the alert
function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

// Clear meal plan list and reset the counter
function clearMealPlan() {
    const mealPlanList = document.getElementById('meal-plan-list');
    mealPlanList.innerHTML = ''; // Clear all items
    // Optional: Hide the custom alert when clearing the list
    closeAlert();
}


// Custom alert functions
function showCustomAlert(message) {
    document.getElementById('alert-message').textContent = message;
    document.getElementById('custom-alert').style.display = 'flex';
}



// Initialize the recipe section
updateRecipeSection();
