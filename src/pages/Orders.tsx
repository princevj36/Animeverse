import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderStore } from '@/store/orderStore';
import { format } from 'date-fns';
import { Loader2, Package, CheckCircle, Clock, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const Orders = () => {
  const { orders, getOrder } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get the latest order from local storage if just placed
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a latest order ID from local storage
    const lastOrderId = localStorage.getItem('lastOrderId');
    if (lastOrderId) {
      setLatestOrderId(lastOrderId);
      // Clear it so it doesn't show again on refresh
      localStorage.removeItem('lastOrderId');
    }
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Sort orders by date (newest first)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main 
        className="pt-24 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
            <p className="text-muted-foreground">View and track your order history</p>
          </div>

          {sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">Your order history will appear here</p>
              <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <Card 
                  key={order.orderId} 
                  className={`overflow-hidden ${latestOrderId === order.orderId ? 'ring-2 ring-primary' : ''}`}
                >
                  <CardHeader className="bg-muted/50 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.orderId}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Placed on {format(new Date(order.orderDate), 'MMMM d, yyyy')}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || 'pending')}`}>
                          {getStatusIcon(order.status || 'pending')}
                          <span className="ml-1">{getStatusText(order.status || 'pending')}</span>
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Delivery Address</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{order.customerName}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                            <p>{order.address.country}</p>
                            <p className="mt-2">
                              <span className="font-medium">Email:</span> {order.email}
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span> {order.phone}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span>₹{order.orderSummary.subtotal.toFixed(2)}</span>
                            </div>
                            {order.orderSummary.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{order.orderSummary.discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">GST (18%)</span>
                              <span>₹{order.orderSummary.gst.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                              <span>Total</span>
                              <span>₹{order.orderSummary.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Order Items ({order.items.length})</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-2 bg-muted/30 rounded-lg">
                              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                <Package className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.quantity} × ₹{item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="font-medium">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 p-4 sm:px-6 sm:py-4 border-t flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Payment Method: {order.paymentMethod}
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={() => {
                          // In a real app, this would reorder the items
                          toast({
                            title: "Feature coming soon",
                            description: "Reorder functionality will be available soon.",
                          });
                        }}
                      >
                        Reorder
                      </Button>
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={() => navigate(`/order/${order.orderId}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Orders;
