import { readData, addRecord, updateRecord } from '../../../lib/db';
import { getRandomRecipe, getRecipesByPreference, getMissingIngredients } from '../../../lib/recipes';
import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0/';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Webhook verification
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Invalid token');
  }

  if (req.method === 'POST') {
    const body = req.body;

    // Handle incoming messages
    if (body.entry && body.entry[0].changes) {
      const change = body.entry[0].changes[0];

      if (change.value.messages) {
        const message = change.value.messages[0];
        const from = message.from;
        const userMessage = message.text?.body?.toLowerCase() || '';

        try {
          let responseText = '';

          // Get or create user
          const users = readData('users');
          let user = users.find((u) => u.phoneNumber === from);

          if (!user) {
            user = addRecord('users', {
              phoneNumber: from,
              preferences: { vegetarian: false, cuisine: 'Any', maxCookTime: 60 },
              pantry: [],
            });
          }

          // Handle different commands
          if (userMessage.includes('recipe') || userMessage.includes('dinner')) {
            const recipe = getRandomRecipe();
            const missingIngredients = getMissingIngredients(recipe.id, user.pantry);

            responseText = `🍽️ *${recipe.name}* (${recipe.cuisine})\n\n`;
            responseText += `⏱️ Cook time: ${recipe.cookTime} mins\n`;
            responseText += `📊 Difficulty: ${recipe.difficulty}\n\n`;
            responseText += `🥘 Ingredients:\n${recipe.ingredients.join(', ')}\n\n`;

            if (missingIngredients.length > 0) {
              responseText += `❌ Missing:\n${missingIngredients.join(', ')}\n\n`;
              responseText += `Reply "order <ingredient>" to buy from Swiggy`;
            } else {
              responseText += `✅ You have all ingredients!`;
            }

            // Save interaction
            addRecord('recommendations', {
              userId: user.id,
              recipeId: recipe.id,
              timestamp: new Date().toISOString(),
            });
          } else if (userMessage.includes('order')) {
            responseText = 'Opening Swiggy to order missing ingredients...';
            // This would integrate with Swiggy API
          } else if (userMessage.includes('vegetarian')) {
            user.preferences.vegetarian = true;
            updateRecord('users', user.id, { preferences: user.preferences });
            responseText = '✅ Switched to vegetarian recipes!';
          } else if (userMessage.includes('help')) {
            responseText = `🤖 *Lazy Chef Bot*\n\nCommands:\n`;
            responseText += `• "recipe" - Get a random dinner idea\n`;
            responseText += `• "vegetarian" - Show only vegetarian recipes\n`;
            responseText += `• "order <item>" - Order missing ingredients\n`;
            responseText += `• "pantry" - View your ingredients\n`;
          } else {
            responseText = `I'm Lazy Chef! Say "recipe" to get dinner ideas, or "help" for more options.`;
          }

          // Send response via WhatsApp API
          await sendWhatsAppMessage(from, responseText);
          return res.status(200).json({ success: true });
        } catch (error) {
          console.error('Error processing message:', error);
          return res.status(500).json({ error: 'Failed to process message' });
        }
      }
    }

    return res.status(200).json({ received: true });
  }

  res.status(405).send('Method not allowed');
}

async function sendWhatsAppMessage(phoneNumber, message) {
  try {
    await axios.post(
      `${WHATSAPP_API_URL}${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}
