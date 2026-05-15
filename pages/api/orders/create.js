import { addRecord, readData } from '../../../lib/db';
import { createOrder as swiggyCreateOrder } from '../../../lib/swiggy';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber, ingredients, location, orderType } = req.body;

    if (!phoneNumber || !ingredients || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user preferences
    const users = readData('users');
    const user = users.find((u) => u.phoneNumber === phoneNumber);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create order record
    const order = addRecord('orders', {
      userId: user.id,
      phoneNumber,
      ingredients,
      location,
      orderType: orderType || 'instamart', // 'instamart' or 'restaurant'
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // If Swiggy API is configured, create actual order
    if (process.env.SWIGGY_API_KEY) {
      try {
        const swiggyOrder = await swiggyCreateOrder(
          null,
          ingredients.map((ing) => ({ name: ing })),
          location
        );

        if (swiggyOrder) {
          order.swiggyOrderId = swiggyOrder.id;
        }
      } catch (error) {
        console.warn('Could not create Swiggy order:', error.message);
        // Continue with local order
      }
    }

    return res.status(201).json({
      success: true,
      order,
      message: 'Order created. Items will be delivered soon!',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}
