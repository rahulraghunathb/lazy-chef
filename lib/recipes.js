const RECIPES = [
  {
    id: '1',
    name: 'Butter Chicken',
    cuisine: 'Indian',
    cookTime: 30,
    difficulty: 'Medium',
    ingredients: ['chicken', 'butter', 'cream', 'tomato', 'onion', 'ginger', 'garlic'],
    instructions: 'Marinate chicken, cook in butter and tomato sauce, finish with cream',
    vegetarian: false,
  },
  {
    id: '2',
    name: 'Vegetable Stir Fry',
    cuisine: 'Asian',
    cookTime: 15,
    difficulty: 'Easy',
    ingredients: ['broccoli', 'bell pepper', 'carrot', 'soy sauce', 'garlic', 'ginger'],
    instructions: 'Heat oil, add vegetables, toss with sauce',
    vegetarian: true,
  },
  {
    id: '3',
    name: 'Pasta Carbonara',
    cuisine: 'Italian',
    cookTime: 20,
    difficulty: 'Medium',
    ingredients: ['pasta', 'eggs', 'bacon', 'parmesan', 'garlic', 'black pepper'],
    instructions: 'Cook pasta, fry bacon, mix with eggs and cheese',
    vegetarian: false,
  },
  {
    id: '4',
    name: 'Chickpea Curry',
    cuisine: 'Indian',
    cookTime: 25,
    difficulty: 'Easy',
    ingredients: ['chickpeas', 'coconut milk', 'tomato', 'onion', 'cumin', 'coriander'],
    instructions: 'Sauté onions, add spices, add chickpeas and coconut milk, simmer',
    vegetarian: true,
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    cuisine: 'Mediterranean',
    cookTime: 20,
    difficulty: 'Medium',
    ingredients: ['salmon', 'lemon', 'olive oil', 'garlic', 'herbs'],
    instructions: 'Season salmon, grill 8-10 mins per side, serve with lemon',
    vegetarian: false,
  },
];

export const getRandomRecipe = () => {
  return RECIPES[Math.floor(Math.random() * RECIPES.length)];
};

export const getRecipesByPreference = (preferences = {}) => {
  let filtered = RECIPES;

  if (preferences.vegetarian) {
    filtered = filtered.filter((r) => r.vegetarian);
  }

  if (preferences.cuisine) {
    filtered = filtered.filter((r) => r.cuisine.toLowerCase() === preferences.cuisine.toLowerCase());
  }

  if (preferences.maxCookTime) {
    filtered = filtered.filter((r) => r.cookTime <= preferences.maxCookTime);
  }

  if (preferences.difficulty) {
    filtered = filtered.filter((r) => r.difficulty.toLowerCase() === preferences.difficulty.toLowerCase());
  }

  return filtered.length > 0 ? filtered : RECIPES;
};

export const getRecipeById = (id) => {
  return RECIPES.find((r) => r.id === id);
};

export const getMissingIngredients = (recipeId, pantry = []) => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];

  return recipe.ingredients.filter(
    (ing) => !pantry.some((p) => p.toLowerCase().includes(ing.toLowerCase()))
  );
};
