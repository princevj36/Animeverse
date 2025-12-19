import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import bgVideo from "@/assets/vi1.mp4";

// Import category background images
import figuresBg from "@/assets/categories/figures.jpg";
import weaponsBg from "@/assets/categories/weapons.jpg";
import cardsBg from "@/assets/categories/cards.jpg";
import accessoriesBg from "@/assets/categories/accessories.jpg";

const categoryBackgrounds = [
  figuresBg,
  weaponsBg,
  cardsBg,
  accessoriesBg
];

const CategorySection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* 🔹 Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      </div>

      {/* 🔹 CONTENT */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            ANIMEVERSE{" "}
            <span className="text-3xl md:text-4xl text-muted-foreground">
              アニメバース
            </span>
          </h1>

          <h2 className="font-display text-2xl md:text-3xl mb-6 text-muted-foreground">
            Browse by <span className="neon-text">Category</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our curated collection of anime merchandise across categories
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {categories.slice(0, 4).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <Link
                to={`/category/${category.id}`}
                className="block w-full h-full"
              >
                {/* 🔹 Image Background (Unsplash Safe) */}
                <div className="absolute inset-0">
                  <img
                    src={categoryBackgrounds[index]}
                    alt={category.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* 🔹 Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm bg-primary/90 px-2 py-1 rounded">
                        {category.itemCount} ITEMS
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-bold">
                      {category.name}
                    </h3>

                    <p className="text-lg text-primary-200">
                      {category.japanese}
                    </p>
                  </div>

                  <span className="inline-flex items-center text-white/90 group-hover:text-primary transition-colors">
                    SHOP NOW
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
