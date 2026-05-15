import { readData } from '../../../lib/db';

export default function handler(req, res) {
  try {
    const tokens = readData('tokens');

    const status = {
      swiggy: !!tokens.find((t) => t.provider === 'swiggy'),
      whatsapp: !!tokens.find((t) => t.provider === 'whatsapp'),
    };

    return res.status(200).json(status);
  } catch (error) {
    console.error('Error fetching auth status:', error);
    return res.status(500).json({ error: 'Failed to fetch status' });
  }
}
