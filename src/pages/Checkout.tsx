import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Mail, Phone, ArrowLeft, Loader2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  // State for form and UI
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [orderId, setOrderId] = useState('');
  const orderIdRef = useRef('');

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  // Calculate order totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = (subtotal - discount) * 0.18;
  const total = Math.max(0, subtotal - discount + gst);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    // Simple coupon logic
    const coupons: Record<string, number> = {
      'WELCOME10': 0.1,
      'FREESHIP': 0,
      'ANIME20': 0.2
    };

    const discountPercentage = coupons[couponCode.toUpperCase()];
    
    if (discountPercentage !== undefined) {
      const newDiscount = subtotal * discountPercentage;
      setDiscount(newDiscount);
      toast({
        title: "Coupon Applied!",
        description: `Discount of ${discountPercentage * 100}% has been applied.`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
    }
  };

  const completeOrder = async () => {
    try {
      setIsProcessing(true);
      
      // Create order data
      const orderData = {
        orderId: orderIdRef.current || orderId,
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        orderSummary: {
          subtotal,
          discount,
          gst,
          total
        },
        paymentStatus: 'completed',
        orderDate: new Date().toISOString(),
        paymentMethod: 'UPI'
      };

      // Send order data to Google Sheets
      // TODO: Replace with your actual Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpoSTn9AuTMiymYOz8BF-s3ml_jw_aKPbJpS86u0rHq14UQbck_p55N7O27ngzFZI/exec';
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setPaymentComplete(true);
      clearCart();
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully!",
      });

      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate('/order-success', { state: { orderId } });
      }, 2000);
      
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    orderIdRef.current = newOrderId;
    setOrderId(newOrderId);
    setShowQR(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
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
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Billing Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name *"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name *"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Textarea
                    name="address"
                    placeholder="Address *"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="city"
                      placeholder="City *"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <Input
                      name="state"
                      placeholder="State *"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <Input
                      name="zipCode"
                      placeholder="ZIP Code *"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={applyCoupon}
                        disabled={!couponCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Complete Your Payment</h3>
              <button 
                onClick={() => setShowQR(false)} 
                className="text-muted-foreground hover:text-foreground"
                disabled={isProcessing}
              >
                ✕
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
              <QRCodeSVG 
                key={orderId}
                value={`upi://pay?pa=9414378779-2@axl&pn=AnimeStore&am=${total}&tn=${orderId}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Scan the QR code to complete payment
            </p>
            
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowQR(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={completeOrder}
                disabled={isProcessing}
                className="bg-primary hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'I have paid'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
