import axios from 'axios';

const SWIGGY_API_BASE = 'https://api.swiggy.com';

export const swiggyClient = axios.create({
  baseURL: SWIGGY_API_BASE,
  headers: {
    'Authorization': `Bearer ${process.env.SWIGGY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getInstamart = async (latitude, longitude) => {
  try {
    const response = await swiggyClient.get('/v1/instamart/merchants', {
      params: { lat: latitude, lng: longitude },
    });
    return response.data;
  } catch (error) {
    console.error('Instamart error:', error.message);
    return null;
  }
};

export const searchRestaurants = async (latitude, longitude, searchQuery) => {
  try {
    const response = await swiggyClient.get('/v1/restaurants', {
      params: {
        lat: latitude,
        lng: longitude,
        query: searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Restaurant search error:', error.message);
    return null;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await swiggyClient.get(`/v1/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Product details error:', error.message);
    return null;
  }
};

export const createOrder = async (restaurantId, items, userLocation) => {
  try {
    const response = await swiggyClient.post('/v1/orders', {
      restaurant_id: restaurantId,
      items,
      delivery_location: userLocation,
    });
    return response.data;
  } catch (error) {
    console.error('Order creation error:', error.message);
    return null;
  }
};
