import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import loginVideo from '@/assets/login.mp4';
import { useIsMobile } from '@/hooks/use-mobile';

const Auth = () => {
  // State for form inputs and UI
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  
  // Hooks
  const [searchParams] = useSearchParams();
  const { login, signup, isAuthenticated, initializeAuth } = useAuthStore();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Initialize auth and check for verification callback
  useEffect(() => {
    initializeAuth();
    
    // Check for email verification callback
    const type = searchParams.get('type');
    if (type === 'signup' && searchParams.get('email')) {
      setEmail(searchParams.get('email') || '');
      setShowVerification(true);
      setIsLogin(true); // Switch to login view
    } else if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, initializeAuth, searchParams]);

  // Handle successful signup
  const handleSuccessfulSignup = () => {
    setShowVerification(true);
    setIsLoading(false);
    // Clear form but keep email
    setName('');
    setPassword('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          toast.success('Welcome back!');
          navigate('/');
        } else {
          toast.error('Invalid email or password. Please check your credentials.');
        }
      } else {
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters long');
          setIsLoading(false);
          return;
        }
        const success = await signup(name, email, password);
        if (success) {
          handleSuccessfulSignup();
          toast.success('Account created successfully! Please check your email to verify your account.');
        } else {
          toast.error('Failed to create account. Email may already be in use.');
        }
      }
    } catch (error: any) {
      toast.error(error?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show verification message if needed
  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden bg-gradient-to-br from-background to-muted/50">
        <div className="w-full max-w-md p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a verification link to <span className="font-medium text-foreground">{email}</span>.
              Please check your inbox and click the link to verify your account.
            </p>
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setShowVerification(false)}
                className="text-primary hover:underline font-medium"
              >
                try again
              </button>.
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => setShowVerification(false)}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main login/signup form
  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden bg-gradient-to-br from-background to-muted/50">
      {/* Background Video - Only show on larger screens */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={loginVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'} relative z-20 mx-2`}
      >
        {/* Logo */}
        <Link to="/" className="block text-center mb-8">
          <span className="anime-title animate-text-glow">ANIMEVERSE</span>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 gradient-border bg-background/80 backdrop-blur-sm shadow-xl">
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setName('');
                setEmail('');
                setPassword('');
              }}
              className={`flex-1 py-3 font-display font-semibold rounded-lg transition-all uppercase tracking-wide ${
                isLogin
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setName('');
                setEmail('');
                setPassword('');
              }}
              className={`flex-1 py-3 font-display font-semibold rounded-lg transition-all uppercase tracking-wide ${
                !isLogin
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-2 sm:py-3 bg-muted rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors text-sm sm:text-base"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-2 sm:py-3 bg-muted rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-2 sm:py-3 bg-muted rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 sm:py-6 text-sm sm:text-base font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                // Scroll to top when switching between login/signup on mobile
                if (isMobile) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
