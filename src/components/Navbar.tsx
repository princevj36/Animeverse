import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, Search, X } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="anime-text text-xl md:text-2xl animate-text-glow">
              ANIMEVERSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="font-medium text-foreground/80 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/shop?category=rare" className="font-medium text-foreground/80 hover:text-secondary transition-colors">
              Rare Items
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link to="/wishlist" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center font-bold">
                  {wishlistItems}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                  {cartItems}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/shop?category=rare"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-medium hover:text-secondary transition-colors"
              >
                Rare Items
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 font-medium hover:text-primary transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 font-medium text-destructive hover:text-destructive/80 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="neon" className="w-full mt-2">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
