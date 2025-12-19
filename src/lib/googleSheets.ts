const WEB_APP_URL = 'https://docs.google.com/spreadsheets/d/115g5sDmtJ4XDa0pulTbF5oEbP1v9RShwOIexA4Eywp8/edit?gid=0#gid=0'; // You'll get this after deploying the Google Apps Script

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: number;
  paymentStatus: string;
  orderDate: string;
}

export const saveOrderToGoogleSheets = async (orderData: OrderData) => {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData }),
    });

    if (!response.ok) {
      throw new Error('Failed to save order to Google Sheets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};
