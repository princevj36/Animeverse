import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package, Clock, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, orderDetails } = location.state || {};
  return (
    <div className="min-h-screen bg-background flex items-center justify-center anime-grid-bg relative px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-secondary" />
        </motion.div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Order <span className="neon-text-cyan">Confirmed!</span>
        </h1>

        <p className="text-muted-foreground mb-6">
          Thank you for your purchase! Your order has been placed successfully.
          You will receive a confirmation email shortly.
        </p>

        {orderId && (
          <div className="glass-card rounded-xl p-6 mb-8 text-left space-y-4">
            <div className="flex items-center gap-3 text-green-500 mb-4">
              <CheckCircle className="w-6 h-6" />
              <h3 className="text-lg font-medium">Order Confirmed</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {orderDetails?.orderDate ? 
                    format(new Date(orderDetails.orderDate), 'MMMM d, yyyy h:mm a') : 
                    format(new Date(), 'MMMM d, yyyy h:mm a')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">
                  ₹{orderDetails?.orderSummary?.total?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {orderDetails?.paymentMethod || 'Online Payment'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t">
              <p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="w-4 h-4" />
                Your order is being processed. We'll notify you once it's on its way.
              </p>
              <Button 
                asChild 
                variant="outline" 
                className="w-full mt-2"
              >
                <Link to="/orders">
                  View Order Details
                </Link>
              </Button>
            </div>
          </div>
        )}

        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-secondary">
            <Package className="w-6 h-6" />
            <span className="font-medium">Estimated Delivery: 3-5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop">
            <Button variant="neon" size="lg">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
