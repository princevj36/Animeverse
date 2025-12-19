import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1920&h=1080&fit=crop',
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = 600; // Change image every 600px of scroll
      const newIndex = Math.floor(scrollPosition / sectionHeight) % backgroundImages.length;
      setCurrentBgIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products by search query
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().startsWith(query) ||
        p.name.toLowerCase().includes(query) ||
        p.anime.toLowerCase().startsWith(query) ||
        p.anime.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredProducts = selectedCategory
    ? selectedCategory === 'rare'
      ? searchFilteredProducts.filter((p) => p.isRare === true)
      : searchFilteredProducts.filter((p) => p.category === selectedCategory)
    : searchFilteredProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentBgIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
        {/* Overlay for readability */}
       <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Shop <span className="neon-text">All Products</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Browse our complete collection of anime merchandise
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name or anime..."
                  className="w-full pl-12 pr-4 py-3 bg-muted/80 backdrop-blur rounded-lg border border-border focus:border-primary focus:outline-none transition-colors font-body"
                />
              </div>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur ${
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/80 hover:bg-muted'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/80 hover:bg-muted'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedCategory('rare')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur ${
                    selectedCategory === 'rare'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted/80 hover:bg-muted'
                  }`}
                >
                  ⭐ Rare Items
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-muted/80 backdrop-blur rounded-lg border border-border focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Products Count */}
            <p className="text-muted-foreground mb-6">
              Showing {sortedProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {searchQuery
                    ? `No products found matching "${searchQuery}"`
                    : 'No products found in this category.'}
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Shop;
