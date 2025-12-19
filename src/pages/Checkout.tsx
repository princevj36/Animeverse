import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Mail, Phone, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
// Background image can be added here if needed


const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const applyCoupon = () => {
    // Reset previous states
    setCouponError('');
    
    // Check if coupon code is empty
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // In a real app, you would validate the coupon with your backend
    // For demo purposes, we'll use a simple check
    const validCoupons = {
      'WELCOME10': 0.1,    // 10% off
      'FREESHIP': 0,       // Free shipping (handled differently in real app)
      'ANIME20': 0.2,      // 20% off
      'FIRSTORDER': 0.15   // 15% off for first order
    };
    
    const discountPercentage = validCoupons[couponCode.toUpperCase()];
    
    if (discountPercentage !== undefined) {
      const newDiscount = subtotal * discountPercentage;
      setDiscount(newDiscount);
      setAppliedCoupon(couponCode.toUpperCase());
      toast.success(`Coupon applied: ${couponCode.toUpperCase()}`);
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
      setAppliedCoupon('');
    }
  };
  
  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon('');
    setCouponCode('');
    setCouponError('');
  };
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Format card number with spaces after every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) || '';
      setFormData({ ...formData, [name]: formattedValue });
    } 
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
      setFormData({ ...formData, [name]: formattedValue });
    }
    // Limit CVV to 3-4 digits
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setFormData({ ...formData, [name]: formattedValue });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsProcessing(true);

    try {
      if (paymentMethod === 'razorpay') {
        await handleRazorpayPayment();
      } else if (paymentMethod === 'gpay') {
        // GPay would be handled through Razorpay's GPay integration
        await handleRazorpayPayment('gpay');
      } else if (paymentMethod === 'card') {
        // Process card payment (in a real app, you would use a payment processor)
        await new Promise(resolve => setTimeout(resolve, 2000));
        completeOrder();
      } else {
        // Other payment methods
        await new Promise(resolve => setTimeout(resolve, 1000));
        completeOrder();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };

  const completeOrder = () => {
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/order-success');
  };

  const createRazorpayOrder = async (amount: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentDetails: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handleRazorpayPayment = async (method = 'netbanking') => {
    try {
      // First create an order on the backend
      const orderData = await createRazorpayOrder(total);
      
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: 'AnimeVerse',
        description: 'Payment for your order',
        image: '/logo.png',
        handler: async function(response: any) {
          try {
            // Verify the payment on the backend
            await verifyPayment(response);
            completeOrder();
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
            setIsSubmitting(false);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          order_id: orderData.order.id,
        },
        theme: {
          color: '#7C3AED',
        },
        method: method === 'gpay' ? 'upi' : method,
        modal: {
          ondismiss: function() {
            // Handle modal dismissal
            setIsSubmitting(false);
            setIsProcessing(false);
          }
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function(response: any) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description || 'Please try again'}`);
        setIsSubmitting(false);
        setIsProcessing(false);
      });
      
    } catch (error) {
      console.error('Error in payment process:', error);
      toast.error('Error processing payment. Please try again.');
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/shop">
              <Button variant="neon">Go Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const gst = (subtotal - discount) * 0.18;
  const total = subtotal - discount + gst;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl font-bold mb-8"
          >
            <span className="neon-text">Checkout</span>
          </motion.h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Fields */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-display text-xl font-bold">Contact Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91"
                          className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <h2 className="font-display text-xl font-bold">Shipping Address</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">PIN Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-display text-xl font-bold">Payment Method</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Credit/Debit Card */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                            {paymentMethod === 'card' && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <div className="flex gap-2">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6" />
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6" />
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Expiry Date</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">CVV</label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* GPay */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'gpay' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('gpay')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'gpay' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                            {paymentMethod === 'gpay' && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">Google Pay</span>
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png" alt="GPay" className="h-6" />
                      </div>
                    </div>

                    {/* Razorpay UPI */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('razorpay')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                            {paymentMethod === 'razorpay' && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">UPI / Netbanking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://razorpay.com/build/browser/static/razorpay-logo.5a47d3f4.svg" alt="Razorpay" className="h-6" />
                        </div>
                      </div>
                      {paymentMethod === 'razorpay' && (
                        <p className="text-sm text-muted-foreground mt-2">You'll be redirected to Razorpay's secure payment page</p>
                      )}
                    </div>

                    {/* Other Payment Options */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                            {paymentMethod === 'cod' && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Pay when you receive</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-xl p-6 sticky top-24"
                >
                  <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-primary">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none text-sm"
                        disabled={!!appliedCoupon}
                      />
                      {appliedCoupon ? (
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-xs mt-1">{couponError}</p>
                    )}
                    {appliedCoupon && (
                      <p className="text-green-500 text-xs mt-1">Coupon {appliedCoupon} applied successfully!</p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-500">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{discount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-secondary">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>₹{gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display font-bold">Total</span>
                      <span className="font-display font-bold text-xl text-primary">
                        ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="neon"
                    size="lg"
                    className="w-full mt-6 h-12 text-base"
                    disabled={isSubmitting || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
