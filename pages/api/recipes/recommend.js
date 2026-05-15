import { readData } from '../../../lib/db';
import { getRecipesByPreference } from '../../../lib/recipes';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, vegetarian, cuisine, maxCookTime } = req.query;

    let preferences = {};
    if (vegetarian === 'true') preferences.vegetarian = true;
    if (cuisine) preferences.cuisine = cuisine;
    if (maxCookTime) preferences.maxCookTime = parseInt(maxCookTime);

    const recipes = getRecipesByPreference(preferences);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: 'No recipes found' });
    }

    return res.status(200).json({
      recipes,
      count: recipes.length,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}
