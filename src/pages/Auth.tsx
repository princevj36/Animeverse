import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import loginVideo from '@/assets/login.mp4';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, isAuthenticated, initializeAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, initializeAuth]);

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
          toast.success('Account created successfully! Welcome!');
          navigate('/');
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

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
  {/* Background Video */}
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

    {/* Soft overlay for readability */}
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* Glow Effects */}
  <div className="absolute inset-0 pointer-events-none z-10">
    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px]" />
    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[100px]" />
  </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-20"
      >
        {/* Logo */}
        <Link to="/" className="block text-center mb-8">
          <span className="anime-title animate-text-glow">ANIMEVERSE</span>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 gradient-border">
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
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
                  className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
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
                  className="w-full pl-12 pr-12 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
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
              variant="neon"
              size="lg"
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  {isLogin ? 'Login' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <span>{isLogin ? "Don't have an account? " : 'Already have an account? '}</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
                setName('');
                setEmail('');
                setPassword('');
              }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
