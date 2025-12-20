import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Package, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    // In a real app, you would fetch orders from your backend/API
    // For now, we'll use a mock implementation
    const fetchOrders = async () => {
      try {
        // TODO: Replace with actual API call to fetch user's orders
        // const response = await fetch(`/api/orders?userId=${user?.id}`);
        // const data = await response.json();
        // setOrders(data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setOrders([
            {
              orderId: 'ORD-123456',
              orderDate: new Date().toISOString(),
              status: 'processing',
              total: 2499,
              shippingAddress: '123 Anime Street, Otaku City, 400001, India',
              items: [
                {
                  id: '1',
                  name: 'Naruto Uzumaki Figure',
                  price: 1999,
                  quantity: 1,
                  image: '/placeholder.svg'
                },
                {
                  id: '2',
                  name: 'One Piece T-Shirt',
                  price: 500,
                  quantity: 1,
                  image: '/placeholder.svg'
                }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <Package className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-display text-3xl font-bold mb-4">Please log in</h1>
            <p className="text-muted-foreground mb-8">
              You need to be logged in to view your orders
            </p>
            <Link to="/auth">
              <Button variant="neon" size="lg">
                Login / Sign Up
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">My Orders</h1>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Loading your orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <Link to="/shop">
                <Button variant="neon">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="bg-muted/50 p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Order #{order.orderId}</span>
                        <span className="text-sm text-muted-foreground">
                          Placed on {formatDate(order.orderDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="font-bold">₹{order.total.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid gap-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="font-medium">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                      <div className="text-sm">
                        <div className="font-medium mb-1">Shipping Address</div>
                        <p className="text-muted-foreground">{order.shippingAddress}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
