import { User, Mail, Package, Heart, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const user = {
    id: 'guest',
    name: 'Guest User',
    email: 'guest@example.com',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Profile Header */}
            <div className="glass-card rounded-2xl p-8 text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-neon-purple rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Link
                to="/cart"
                className="glass-card rounded-xl p-6 flex items-center gap-4 hover:neon-border transition-all"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                  <h3 className="font-medium mt-2">My Orders</h3>
                  <p className="text-sm text-muted-foreground">Track your orders</p>
                </div>
              </Link>

              <Link
                to="/wishlist"
                className="glass-card rounded-xl p-6 flex items-center gap-4 hover:neon-border transition-all"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                  <h3 className="font-medium mt-2">Wishlist</h3>
                  <p className="text-sm text-muted-foreground">Your saved items</p>
                </div>
              </Link>

              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:neon-border transition-all cursor-pointer">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Settings className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage account</p>
                </div>
              </div>
                  <p className="text-sm text-muted-foreground">Sign out</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
