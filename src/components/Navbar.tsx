// Navbar with auth

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, Search, X, Package, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Filter products based on search query
  const suggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo - Center on mobile, left on desktop */}
          <Link to="/" className="flex items-center gap-2 mx-auto md:mx-0">
            <span className="anime-text text-xl md:text-2xl animate-text-glow">
              ANIMEVERSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-1">
              Home
            </Link>
            <Link to="/shop" className="font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-1">
              Shop
            </Link>
            <Link to="/shop?category=rare" className="font-medium text-foreground/80 hover:text-secondary transition-colors px-2 py-1">
              Rare Items
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isMenuOpen) setIsMenuOpen(false);
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link 
              to="/wishlist" 
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            >
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center font-bold">
                  {wishlistItems > 9 ? '9+' : wishlistItems}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                  {cartItems > 9 ? '9+' : cartItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/profile" className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="neon" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pb-4"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search for anime merchandise..."
                  className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none transition-colors font-body"
                />

                {/* Search Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleSuggestionClick(product.id)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.anime}</p>
                        </div>
                        <span className="ml-auto font-display text-primary font-bold">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden w-full overflow-hidden bg-background/95 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-1 p-2 border-t border-border/50">
              <Link
                to="/"
                className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                to="/shop?category=rare"
                className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors active:bg-muted text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Rare Items
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="h-px bg-border/50 my-2"></div>
                  <Link
                    to="/wishlist"
                    className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                    {wishlistItems > 0 && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {wishlistItems}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile/orders"
                    className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="w-5 h-5" />
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      toast.success('Successfully logged out');
                    }}
                    className="font-medium py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors text-left flex items-center gap-3 text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-2 mt-2 border-t border-border/50">
                  <Link
                    to="/auth"
                    className="block w-full text-center font-medium py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login / Sign Up
                  </Link>
                  <p className="text-xs text-muted-foreground text-center px-2">
                    Sign in to access your wishlist, orders, and more.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
