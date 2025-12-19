import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import vi3 from '@/assets/vi3.mp4';


const FeaturedProducts = () => {
  // Get all unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  // Get one random product from each category
  const featuredProducts = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    const randomIndex = Math.floor(Math.random() * categoryProducts.length);
    return categoryProducts[randomIndex];
  }).filter(Boolean); // Remove any undefined entries

  return (
    <section className="py-20 relative">
      {/* Background Effect */}
      {/* Background Video */}
<div className="absolute inset-0 overflow-hidden z-0">
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="w-full h-full object-cover opacity-90"
  >
    <source src={vi3} type="video/mp4" />
  </video>

  {/* Soft overlay for readability */}
  <div className="absolute inset-0 bg-background/70" />

  {/* Glow effect */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
</div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 leading-tight">
              Featured <span className="neon-text-cyan">Products</span>
            </h2>
            <p className="text-muted-foreground font-body">
              Hand-picked items for true anime enthusiasts
            </p>
          </div>
          <a
            href="/shop"
            className="mt-4 md:mt-0 text-secondary hover:text-secondary/80 font-medium transition-colors"
          >
            View All Products →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProducts;
