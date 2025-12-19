export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  inStock: boolean;
  isRare?: boolean;
  anime: string;
}

export const categories = [
  { 
    id: 'anime-figures', 
    name: 'Action Figures', 
    japanese: 'アクションフィギュア',
    icon: '🎭',
    backgroundImage: 'https://images.unsplash.com/photo-1633613286848-e6f7bb7a8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    itemCount: '150+'
  },
  { 
    id: 'katana', 
    name: 'Weapons & Katanas', 
    japanese: '刀と武器',
    icon: '⚔️',
    backgroundImage: 'https://images.unsplash.com/photo-1608889825205-eeb911fe6040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    itemCount: '75+'
  },
  { 
    id: 'trading-cards', 
    name: 'Trading Cards', 
    japanese: 'トレーディングカード',
    icon: '🎴',
    backgroundImage: 'https://images.unsplash.com/photo-1551024601-bc78ca4c7cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    itemCount: '300+'
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    japanese: 'アクセサリー',
    icon: '✨',
    backgroundImage: 'https://images.unsplash.com/photo-1633613286848-e6f7bb7a8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    itemCount: '200+'
  },
];

const animeList = [
  'Dragon Ball Z', 'Naruto Shippuden', 'One Piece', 'Demon Slayer', 
  'Attack on Titan', 'My Hero Academia', 'Jujutsu Kaisen', 'Death Note',
  'Bleach', 'Tokyo Revengers', 'Chainsaw Man', 'Spy x Family',
  'Hunter x Hunter', 'Fullmetal Alchemist', 'Neon Genesis Evangelion'
];

// Individual keychain images - Replace these paths with your actual image URLs or local paths
// Images 92-97: One Piece keychains (Luffy, Franky, Nami, Usopp, Sanji, Enel)
// Images 98-103: More keychains (anime characters and katanas)
// Images 104-109: Miniature weapons/kunai keychains
// Images 110-115: Various keychains (abstract, Thor's Stormbreaker, Elder Wand, Luffy, Captain America, Batman)

const keychainImage92 = ['/images/keychains/92.jpg']; // Luffy with "Good luck" strap
const keychainImage93 = ['/images/keychains/93.jpg']; // Franky with ONE PIECE strap
const keychainImage94 = ['/images/keychains/94.jpg']; // Nami with ONE PIECE strap
const keychainImage95 = ['/images/keychains/95.jpg']; // Usopp with ONE PIECE strap
const keychainImage96 = ['/images/keychains/96.jpg']; // Sanji with ONE PIECE strap
const keychainImage97 = ['/images/keychains/97.jpg']; // Enel with "Good luck" strap
const keychainImage98 = ['/images/keychains/98.jpg']; // Anime character with "Good luck" strap
const keychainImage99 = ['/images/keychains/99.jpg']; // Anime character with "Good luck" strap
const keychainImage100 = ['/images/keychains/100.jpg']; // Katana with scabbard
const keychainImage101 = ['/images/keychains/101.jpg']; // Katana with scabbard
const keychainImage102 = ['/images/keychains/102.jpg']; // Katana with scabbard
const keychainImage103 = ['/images/keychains/103.jpg']; // Katana with scabbard
const keychainImage104 = ['/images/keychains/104.jpg']; // Miniature katana
const keychainImage105 = ['/images/keychains/105.jpg']; // Double-ended kunai
const keychainImage106 = ['/images/keychains/106.jpg']; // Double-ended weapon
const keychainImage107 = ['/images/keychains/107.jpg']; // Scythe/staff
const keychainImage108 = ['/images/keychains/108.jpg']; // Dagger/kunai with cutouts
const keychainImage109 = ['/images/keychains/109.jpg']; // Broadsword/cleaver (Naruto)
const keychainImage110 = ['/images/keychains/110.jpg']; // Abstract design keychain
const keychainImage111 = ['/images/keychains/111.jpg']; // Thor's Stormbreaker
const keychainImage112 = ['/images/keychains/112.jpg']; // Elder Wand
const keychainImage113 = ['/images/keychains/113.jpg']; // Luffy circular keychain
const keychainImage114 = ['/images/keychains/114.jpg']; // Captain America face-changing
const keychainImage115 = ['/images/keychains/115.jpg']; // Batman with MARVEL strap

// Individual miniature images - Replace these paths with your actual image URLs or local paths
// Images 41-46: Naruto characters (Naruto, Gaara, Hinata, Sasuke, Jiraiya, Itachi)
// Images 47-52: More characters (Gaara, Itachi, Sakura, Doctor Strange, Hulk, Nobara)
// Images 84-85: One Piece characters (Luffy, Sabo)

const miniatureImage41 = ['/images/miniatures/41.jpg']; // Naruto Uzumaki
const miniatureImage42 = ['/images/miniatures/42.jpg']; // Gaara
const miniatureImage43 = ['/images/miniatures/43.jpg']; // Hinata Hyuga
const miniatureImage44 = ['/images/miniatures/44.jpg']; // Sasuke Uchiha
const miniatureImage45 = ['/images/miniatures/45.jpg']; // Jiraiya
const miniatureImage46 = ['/images/miniatures/46.jpg']; // Itachi Uchiha
const miniatureImage47 = ['/images/miniatures/47.jpg']; // Gaara (variant)
const miniatureImage48 = ['/images/miniatures/48.jpg']; // Itachi Akatsuki
const miniatureImage84 = ['/images/miniatures/84.jpg']; // Luffy
const miniatureImage85 = ['/images/miniatures/85.jpg']; // Sabo

// Individual Q-Posket images - Replace these paths with your actual image URLs or local paths
// Images 29-40: Q-Posket figures

const qPosketImage29 = ['/images/q-posket/29.jpg'];
const qPosketImage30 = ['/images/q-posket/30.jpg'];
const qPosketImage31 = ['/images/q-posket/31.jpg'];
const qPosketImage32 = ['/images/q-posket/32.jpg'];
const qPosketImage33 = ['/images/q-posket/33.jpg'];
const qPosketImage34 = ['/images/q-posket/34.jpg'];
const qPosketImage35 = ['/images/q-posket/35.jpg'];
const qPosketImage36 = ['/images/q-posket/36.jpg'];
const qPosketImage37 = ['/images/q-posket/37.jpg'];
const qPosketImage38 = ['/images/q-posket/38.jpg'];
const qPosketImage39 = ['/images/q-posket/39.jpg'];
const qPosketImage40 = ['/images/q-posket/40.jpg'];

// Individual Katana images - Replace these paths with your actual image URLs or local paths
// Images 1-5: Katana swords

const katanaImage1 = ['/images/katana/1.jpg'];
const katanaImage2 = ['/images/katana/2.jpg'];
const katanaImage3 = ['/images/katana/3.jpg'];
const katanaImage4 = ['/images/katana/4.jpg'];
const katanaImage5 = ['/images/katana/5.jpg'];

// Individual Bobble Head images - Replace these paths with your actual image URLs or local paths
// Images 21-40: Bobble Head figures (20 products)

const bobbleHeadImage21 = ['/images/bobble-head/21.jpg'];
const bobbleHeadImage22 = ['/images/bobble-head/22.jpg'];
const bobbleHeadImage23 = ['/images/bobble-head/23.jpg'];
const bobbleHeadImage24 = ['/images/bobble-head/24.jpg'];
const bobbleHeadImage25 = ['/images/bobble-head/25.jpg'];
const bobbleHeadImage26 = ['/images/bobble-head/26.jpg'];
const bobbleHeadImage27 = ['/images/bobble-head/27.jpg'];
const bobbleHeadImage28 = ['/images/bobble-head/28.jpg'];
const bobbleHeadImage29 = ['/images/bobble-head/29.jpg'];
const bobbleHeadImage30 = ['/images/bobble-head/30.jpg'];
const bobbleHeadImage31 = ['/images/bobble-head/31.jpg'];
const bobbleHeadImage32 = ['/images/bobble-head/32.jpg'];
const bobbleHeadImage33 = ['/images/bobble-head/33.jpg'];
const bobbleHeadImage34 = ['/images/bobble-head/34.jpg'];
const bobbleHeadImage35 = ['/images/bobble-head/35.jpg'];
const bobbleHeadImage36 = ['/images/bobble-head/36.jpg'];
const bobbleHeadImage37 = ['/images/bobble-head/37.jpg'];
const bobbleHeadImage38 = ['/images/bobble-head/38.jpg'];
const bobbleHeadImage39 = ['/images/bobble-head/39.jpg'];
const bobbleHeadImage40 = ['/images/bobble-head/40.jpg'];

// Individual Sets images - Replace these paths with your actual image URLs or local paths
// Images 116-129: Sets/Collections (14 products)

const setsImage116 = ['/images/sets/116.jpg'];
const setsImage117 = ['/images/sets/117.jpg'];
const setsImage118 = ['/images/sets/118.jpg'];
const setsImage119 = ['/images/sets/119.jpg'];
const setsImage120 = ['/images/sets/120.jpg'];
const setsImage121 = ['/images/sets/121.jpg'];
const setsImage122 = ['/images/sets/122.jpg'];
const setsImage123 = ['/images/sets/123.jpg'];
const setsImage124 = ['/images/sets/124.jpg'];
const setsImage125 = ['/images/sets/125.jpg'];
const setsImage126 = ['/images/sets/126.jpg'];
const setsImage127 = ['/images/sets/127.jpg'];
const setsImage128 = ['/images/sets/128.jpg'];
const setsImage129 = ['/images/sets/129.jpg'];

// Individual Anime Figures images - Replace these paths with your actual image URLs or local paths
// Images 130-140: Anime Figures (11 products)

const animeFiguresImage130 = ['/images/anime-figures/130.jpg'];
const animeFiguresImage131 = ['/images/anime-figures/131.jpg'];
const animeFiguresImage132 = ['/images/anime-figures/132.jpg'];
const animeFiguresImage133 = ['/images/anime-figures/133.jpg'];
const animeFiguresImage134 = ['/images/anime-figures/134.jpg'];
const animeFiguresImage135 = ['/images/anime-figures/135.jpg'];
const animeFiguresImage136 = ['/images/anime-figures/136.jpg'];
const animeFiguresImage137 = ['/images/anime-figures/137.jpg'];
const animeFiguresImage138 = ['/images/anime-figures/138.jpg'];
const animeFiguresImage139 = ['/images/anime-figures/139.jpg'];
const animeFiguresImage140 = ['/images/anime-figures/140.jpg'];

// Keychain Products (24) - Each with individual image from the 24 shared images
const keychainProducts: Product[] = [
  { id: 'kc1', name: 'Luffy Good Luck Keychain', description: 'One Piece Luffy keychain with "Good luck Best Wishes For You" strap.', price: 1, originalPrice: 1, images: keychainImage92, category: 'keychain', rating: 4.8, inStock: true, anime: 'One Piece' },
  { id: 'kc2', name: 'Franky ONE PIECE Keychain', description: 'One Piece Franky keychain with ONE PIECE strap and Jolly Roger logo.', price: 249, originalPrice: 349, images: keychainImage93, category: 'keychain', rating: 4.7, inStock: true, anime: 'One Piece' },
  { id: 'kc3', name: 'Nami ONE PIECE Keychain', description: 'One Piece Nami keychain with ONE PIECE strap and Jolly Roger logo.', price: 349, originalPrice: 499, images: keychainImage94, category: 'keychain', rating: 4.9, inStock: true, isRare: true, anime: 'One Piece' },
  { id: 'kc4', name: 'Usopp ONE PIECE Keychain', description: 'One Piece Usopp keychain with ONE PIECE strap and Jolly Roger logo.', price: 279, images: keychainImage95, category: 'keychain', rating: 4.6, inStock: true, anime: 'One Piece' },
  { id: 'kc5', name: 'Sanji ONE PIECE Keychain', description: 'One Piece Sanji keychain with ONE PIECE strap and Jolly Roger logo.', price: 289, originalPrice: 399, images: keychainImage96, category: 'keychain', rating: 4.8, inStock: true, anime: 'One Piece' },
  { id: 'kc6', name: 'Enel Good Luck Keychain', description: 'One Piece Enel keychain with "Good luck Best Wishes For You" strap.', price: 269, images: keychainImage97, category: 'keychain', rating: 4.5, inStock: true, anime: 'One Piece' },
  { id: 'kc7', name: 'Anime Character Keychain', description: 'Stylized anime character keychain with "Good luck Best Wishes For You" strap.', price: 329, originalPrice: 449, images: keychainImage98, category: 'keychain', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'kc8', name: 'Anime Character Lab Coat Keychain', description: 'Anime character in lab coat keychain with "Good luck Best Wishes For You" strap.', price: 259, images: keychainImage99, category: 'keychain', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'kc9', name: 'Traditional Katana Keychain', description: 'Miniature katana with scabbard featuring Japanese characters.', price: 289, originalPrice: 399, images: keychainImage100, category: 'keychain', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'kc10', name: 'Decorative Katana Keychain', description: 'Black katana with scabbard featuring decorative patterns.', price: 279, images: keychainImage101, category: 'keychain', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'kc11', name: 'White Katana Keychain', description: 'Elegant white katana with scabbard and gold accents.', price: 349, originalPrice: 499, images: keychainImage102, category: 'keychain', rating: 4.8, inStock: true, isRare: true, anime: 'Various' },
  { id: 'kc12', name: 'Patterned Katana Keychain', description: 'Black katana with scabbard featuring grid pattern design.', price: 249, images: keychainImage103, category: 'keychain', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'kc13', name: 'Miniature Katana Keychain', description: 'Compact black katana keychain with red symbol accent.', price: 269, originalPrice: 349, images: keychainImage104, category: 'keychain', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'kc14', name: 'Double-Ended Kunai Keychain', description: 'Black double-ended kunai-style weapon keychain.', price: 289, images: keychainImage105, category: 'keychain', rating: 4.7, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'kc15', name: 'Angular Kunai Keychain', description: 'Black angular double-ended weapon with red symbols.', price: 299, originalPrice: 449, images: keychainImage106, category: 'keychain', rating: 4.5, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'kc16', name: 'Scythe Staff Keychain', description: 'Black scythe/staff keychain with curved blade design.', price: 279, images: keychainImage107, category: 'keychain', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'kc17', name: 'Dagger Kunai Keychain', description: 'Black dagger with diamond cutouts and red symbol.', price: 299, originalPrice: 399, images: keychainImage108, category: 'keychain', rating: 4.7, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'kc18', name: 'Naruto Broadsword Keychain', description: 'Black broadsword/cleaver keychain with Naruto branding.', price: 329, images: keychainImage109, category: 'keychain', rating: 4.9, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'kc19', name: 'Abstract Design Keychain', description: 'Minimalist abstract design keychain with Japanese characters.', price: 269, originalPrice: 349, images: keychainImage110, category: 'keychain', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'kc20', name: 'Thor Stormbreaker Keychain', description: 'Marvel Thor Stormbreaker axe replica keychain.', price: 289, images: keychainImage111, category: 'keychain', rating: 4.6, inStock: true, anime: 'Marvel' },
  { id: 'kc21', name: 'Elder Wand Keychain', description: 'Harry Potter Elder Wand replica keychain.', price: 259, originalPrice: 349, images: keychainImage112, category: 'keychain', rating: 4.7, inStock: true, anime: 'Harry Potter' },
  { id: 'kc22', name: 'Luffy Circular Keychain', description: 'One Piece Luffy circular charm keychain with red border.', price: 349, originalPrice: 499, images: keychainImage113, category: 'keychain', rating: 4.9, inStock: true, isRare: true, anime: 'One Piece' },
  { id: 'kc23', name: 'Captain America Keychain', description: 'Face-changing Captain America keychain with multiple expressions.', price: 279, images: keychainImage114, category: 'keychain', rating: 4.5, inStock: true, anime: 'Marvel' },
  { id: 'kc24', name: 'Batman MARVEL Keychain', description: 'Batman chibi figure keychain with MARVEL branded strap.', price: 299, originalPrice: 399, images: keychainImage115, category: 'keychain', rating: 4.8, inStock: true, anime: 'DC Comics' },
];

// Miniature Products (10) - Each with individual image
const miniatureProducts: Product[] = [
  { id: 'mn1', name: 'Naruto Uzumaki Miniature', description: 'Chibi-style Naruto figure with Konoha headband and orange jumpsuit.', price: 599, originalPrice: 799, images: miniatureImage41, category: 'miniature', rating: 4.9, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn2', name: 'Gaara Miniature', description: 'Chibi Gaara figure with sand gourd and love kanji on forehead.', price: 549, images: miniatureImage42, category: 'miniature', rating: 4.7, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn3', name: 'Hinata Hyuga Miniature', description: 'Chibi Hinata figure with Byakugan eyes and lavender jacket.', price: 579, originalPrice: 749, images: miniatureImage43, category: 'miniature', rating: 4.8, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn4', name: 'Sasuke Uchiha Miniature', description: 'Chibi Sasuke figure with dark blue outfit and serious expression.', price: 629, images: miniatureImage44, category: 'miniature', rating: 4.6, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn5', name: 'Jiraiya Miniature', description: 'Chibi Jiraiya figure with white spiky hair and scroll on back.', price: 699, originalPrice: 899, images: miniatureImage45, category: 'miniature', rating: 4.9, inStock: true, isRare: true, anime: 'Naruto Shippuden' },
  { id: 'mn6', name: 'Itachi Uchiha Miniature', description: 'Chibi Itachi figure with Sharingan eyes and scratched headband.', price: 549, images: miniatureImage46, category: 'miniature', rating: 4.5, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn7', name: 'Gaara Variant Miniature', description: 'Chibi Gaara figure in prayer pose with sand gourd.', price: 749, originalPrice: 999, images: miniatureImage47, category: 'miniature', rating: 4.9, inStock: true, isRare: true, anime: 'Naruto Shippuden' },
  { id: 'mn8', name: 'Itachi Akatsuki Miniature', description: 'Chibi Itachi in Akatsuki cloak with red cloud patterns.', price: 899, images: miniatureImage48, category: 'miniature', rating: 4.8, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'mn9', name: 'Luffy Miniature', description: 'Chibi Luffy figure with red shirt and determined expression.', price: 599, originalPrice: 799, images: miniatureImage84, category: 'miniature', rating: 4.6, inStock: true, anime: 'One Piece' },
  { id: 'mn10', name: 'Sabo Miniature', description: 'Chibi Sabo figure with top hat, goggles, and staff weapon.', price: 529, images: miniatureImage85, category: 'miniature', rating: 4.7, inStock: true, anime: 'One Piece' },
];

// Q-Posket Products (12) - Images 29-40
const qPosketProducts: Product[] = [
  { id: 'qp1', name: 'Q-Posket Figure 29', description: 'Premium Q-Posket chibi figure with detailed design.', price: 899, originalPrice: 1199, images: qPosketImage29, category: 'q-posket', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'qp2', name: 'Q-Posket Figure 30', description: 'Kawaii Q-Posket figure with hand-painted details.', price: 849, images: qPosketImage30, category: 'q-posket', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'qp3', name: 'Q-Posket Figure 31', description: 'Adorable Q-Posket figure in chibi proportions.', price: 879, originalPrice: 1099, images: qPosketImage31, category: 'q-posket', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'qp4', name: 'Q-Posket Figure 32', description: 'Cute Q-Posket figure with detailed accessories.', price: 929, images: qPosketImage32, category: 'q-posket', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'qp5', name: 'Q-Posket Figure 33', description: 'Chibi Q-Posket figure with unique pose.', price: 849, originalPrice: 1049, images: qPosketImage33, category: 'q-posket', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'qp6', name: 'Q-Posket Figure 34', description: 'Q-Posket figure with expressive features.', price: 799, images: qPosketImage34, category: 'q-posket', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'qp7', name: 'Q-Posket Figure 35', description: 'Detailed Q-Posket figure with accessories.', price: 869, originalPrice: 1099, images: qPosketImage35, category: 'q-posket', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'qp8', name: 'Q-Posket Figure 36', description: 'Premium Q-Posket chibi figure.', price: 829, images: qPosketImage36, category: 'q-posket', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'qp9', name: 'Q-Posket Figure 37', description: 'Kawaii Q-Posket figure with unique design.', price: 799, originalPrice: 999, images: qPosketImage37, category: 'q-posket', rating: 4.5, inStock: true, anime: 'Various' },
  { id: 'qp10', name: 'Q-Posket Figure 38', description: 'Adorable Q-Posket figure with detailed paint.', price: 849, images: qPosketImage38, category: 'q-posket', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'qp11', name: 'Q-Posket Figure 39', description: 'Premium Q-Posket figure with special features.', price: 929, originalPrice: 1199, images: qPosketImage39, category: 'q-posket', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'qp12', name: 'Q-Posket Figure 40', description: 'Chibi Q-Posket figure with expressive pose.', price: 899, images: qPosketImage40, category: 'q-posket', rating: 4.8, inStock: true, anime: 'Various' },
];

// Katana Products (5) - Images 1-5
const katanaProducts: Product[] = [
  { id: 'kt1', name: 'Tanjiro Nichirin Blade Katana', description: 'Full-size black Nichirin blade replica with water wheel design. 104cm with wooden display stand.', price: 4999, originalPrice: 6999, images: katanaImage1, category: 'katana', rating: 5.0, inStock: true, isRare: true, anime: 'Demon Slayer' },
  { id: 'kt2', name: 'Zoro Enma Katana', description: 'Premium Enma sword replica with purple hilt wrapping. 105cm full metal blade.', price: 5499, originalPrice: 7499, images: katanaImage2, category: 'katana', rating: 4.9, inStock: true, isRare: true, anime: 'One Piece' },
  { id: 'kt3', name: 'Ichigo Zangetsu Katana', description: 'Massive Zangetsu cleaver sword replica. 135cm with chain attached.', price: 5999, originalPrice: 7999, images: katanaImage3, category: 'katana', rating: 4.9, inStock: true, isRare: true, anime: 'Bleach' },
  { id: 'kt4', name: 'Sasuke Kusanagi Katana', description: 'Chidori-infused Kusanagi blade with lightning design. 100cm with sheath.', price: 4499, originalPrice: 5999, images: katanaImage4, category: 'katana', rating: 4.8, inStock: true, anime: 'Naruto Shippuden' },
  { id: 'kt5', name: 'Mugen Champloo Katana', description: 'Unique serrated blade design from Samurai Champloo. 98cm with red cord.', price: 4299, images: katanaImage5, category: 'katana', rating: 4.7, inStock: true, anime: 'Samurai Champloo' },
];

// Bobble Head Products (20) - Images 21-40
const bobbleHeadProducts: Product[] = [
  { id: 'bh1', name: 'Bobble Head Figure 21', description: 'Premium bobble head figure with spring-mounted head and detailed base.', price: 449, originalPrice: 599, images: bobbleHeadImage21, category: 'bobble-head', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'bh2', name: 'Bobble Head Figure 22', description: 'Kawaii bobble head with expressive features and unique design.', price: 429, images: bobbleHeadImage22, category: 'bobble-head', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'bh3', name: 'Bobble Head Figure 23', description: 'Chibi-style bobble head with moving parts and detailed paint.', price: 449, originalPrice: 579, images: bobbleHeadImage23, category: 'bobble-head', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'bh4', name: 'Bobble Head Figure 24', description: 'Premium bobble head figure with character-specific accessories.', price: 459, images: bobbleHeadImage24, category: 'bobble-head', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'bh5', name: 'Bobble Head Figure 25', description: 'Detailed bobble head with unique pose and expression.', price: 479, originalPrice: 629, images: bobbleHeadImage25, category: 'bobble-head', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'bh6', name: 'Bobble Head Figure 26', description: 'Kawaii bobble head with hand-painted details and base.', price: 469, images: bobbleHeadImage26, category: 'bobble-head', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'bh7', name: 'Bobble Head Figure 27', description: 'Premium bobble head figure with special features.', price: 499, originalPrice: 649, images: bobbleHeadImage27, category: 'bobble-head', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'bh8', name: 'Bobble Head Figure 28', description: 'Chibi bobble head with expressive face and accessories.', price: 439, images: bobbleHeadImage28, category: 'bobble-head', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'bh9', name: 'Bobble Head Figure 29', description: 'Detailed bobble head figure with unique design elements.', price: 449, originalPrice: 569, images: bobbleHeadImage29, category: 'bobble-head', rating: 4.5, inStock: true, anime: 'Various' },
  { id: 'bh10', name: 'Bobble Head Figure 30', description: 'Premium bobble head with spring-mounted head and base.', price: 429, images: bobbleHeadImage30, category: 'bobble-head', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'bh11', name: 'Bobble Head Figure 31', description: 'Kawaii bobble head with detailed paint and accessories.', price: 489, originalPrice: 649, images: bobbleHeadImage31, category: 'bobble-head', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'bh12', name: 'Bobble Head Figure 32', description: 'Chibi-style bobble head with expressive features.', price: 479, images: bobbleHeadImage32, category: 'bobble-head', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'bh13', name: 'Bobble Head Figure 33', description: 'Premium bobble head figure with unique pose.', price: 449, originalPrice: 579, images: bobbleHeadImage33, category: 'bobble-head', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'bh14', name: 'Bobble Head Figure 34', description: 'Detailed bobble head with character-specific design.', price: 459, images: bobbleHeadImage34, category: 'bobble-head', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'bh15', name: 'Bobble Head Figure 35', description: 'Kawaii bobble head with hand-painted details.', price: 439, originalPrice: 549, images: bobbleHeadImage35, category: 'bobble-head', rating: 4.4, inStock: true, anime: 'Various' },
  { id: 'bh16', name: 'Bobble Head Figure 36', description: 'Premium bobble head with spring-mounted head and base.', price: 449, images: bobbleHeadImage36, category: 'bobble-head', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'bh17', name: 'Bobble Head Figure 37', description: 'Chibi bobble head with unique expression and accessories.', price: 469, originalPrice: 599, images: bobbleHeadImage37, category: 'bobble-head', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'bh18', name: 'Bobble Head Figure 38', description: 'Detailed bobble head figure with special features.', price: 399, images: bobbleHeadImage38, category: 'bobble-head', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'bh19', name: 'Bobble Head Figure 39', description: 'Premium bobble head with expressive face and design.', price: 459, originalPrice: 589, images: bobbleHeadImage39, category: 'bobble-head', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'bh20', name: 'Bobble Head Figure 40', description: 'Kawaii bobble head with detailed paint and base.', price: 449, images: bobbleHeadImage40, category: 'bobble-head', rating: 4.5, inStock: true, anime: 'Various' },
];

// Sets Products (14) - Images 116-129
const setsProducts: Product[] = [
  { id: 'st1', name: 'Collection Set 116', description: 'Premium anime collection set with multiple figures and accessories.', price: 2999, originalPrice: 3999, images: setsImage116, category: 'sets', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'st2', name: 'Collection Set 117', description: 'Complete character set with detailed figures and display base.', price: 2499, images: setsImage117, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'st3', name: 'Collection Set 118', description: 'Premium multi-figure collection set with exclusive accessories.', price: 4499, originalPrice: 5999, images: setsImage118, category: 'sets', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'st4', name: 'Collection Set 119', description: 'Complete character collection set with hand-painted details.', price: 5999, originalPrice: 7999, images: setsImage119, category: 'sets', rating: 5.0, inStock: true, isRare: true, anime: 'Various' },
  { id: 'st5', name: 'Collection Set 120', description: 'Multi-figure set with unique poses and expressions.', price: 2299, images: setsImage120, category: 'sets', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'st6', name: 'Collection Set 121', description: 'Premium collection set with bonus figures and accessories.', price: 2799, originalPrice: 3499, images: setsImage121, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'st7', name: 'Collection Set 122', description: 'Complete character set with detailed paint and design.', price: 2699, images: setsImage122, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'st8', name: 'Collection Set 123', description: 'Exclusive collection set with themed display base.', price: 3499, originalPrice: 4499, images: setsImage123, category: 'sets', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'st9', name: 'Collection Set 124', description: 'Premium multi-character collection set.', price: 5499, images: setsImage124, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'st10', name: 'Collection Set 125', description: 'Complete set with multiple figures and accessories.', price: 2199, originalPrice: 2899, images: setsImage125, category: 'sets', rating: 4.6, inStock: true, anime: 'Various' },
  { id: 'st11', name: 'Collection Set 126', description: 'Premium collection set with detailed figures.', price: 2499, images: setsImage126, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'st12', name: 'Collection Set 127', description: 'Complete character set with exclusive accessories.', price: 2299, originalPrice: 2999, images: setsImage127, category: 'sets', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'st13', name: 'Collection Set 128', description: 'Premium multi-figure collection set.', price: 2799, images: setsImage128, category: 'sets', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'st14', name: 'Collection Set 129', description: 'Complete collection set with hand-painted details.', price: 2999, originalPrice: 3999, images: setsImage129, category: 'sets', rating: 4.8, inStock: true, anime: 'Various' },
];

// Anime Figures Products (11) - Images 130-140
const animeFiguresProducts: Product[] = [
  { id: 'af1', name: 'Anime Figure 130', description: 'Premium anime figure with detailed sculpting and hand-painted finish.', price: 7999, originalPrice: 9999, images: animeFiguresImage130, category: 'anime-figures', rating: 5.0, inStock: true, isRare: true, anime: 'Various' },
  { id: 'af2', name: 'Anime Figure 131', description: 'Limited edition figure with special effects and detailed base.', price: 6999, images: animeFiguresImage131, category: 'anime-figures', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'af3', name: 'Anime Figure 132', description: 'Massive premium statue with dynamic pose and accessories.', price: 12999, originalPrice: 15999, images: animeFiguresImage132, category: 'anime-figures', rating: 5.0, inStock: true, isRare: true, anime: 'Various' },
  { id: 'af4', name: 'Anime Figure 133', description: 'Premium figure with detailed sculpting and unique design.', price: 8999, images: animeFiguresImage133, category: 'anime-figures', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'af5', name: 'Anime Figure 134', description: 'Colossal figure with diorama base and special effects.', price: 14999, originalPrice: 18999, images: animeFiguresImage134, category: 'anime-figures', rating: 5.0, inStock: true, isRare: true, anime: 'Various' },
  { id: 'af6', name: 'Anime Figure 135', description: 'Premium figure with detailed paint and accessories.', price: 6499, images: animeFiguresImage135, category: 'anime-figures', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'af7', name: 'Anime Figure 136', description: 'Limited edition figure with diorama base and effects.', price: 9999, originalPrice: 12999, images: animeFiguresImage136, category: 'anime-figures', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
  { id: 'af8', name: 'Anime Figure 137', description: 'Premium figure with detailed sculpting and pose.', price: 5999, images: animeFiguresImage137, category: 'anime-figures', rating: 4.7, inStock: true, anime: 'Various' },
  { id: 'af9', name: 'Anime Figure 138', description: 'Premium figure with transformation effects and accessories.', price: 7499, originalPrice: 9499, images: animeFiguresImage138, category: 'anime-figures', rating: 4.9, inStock: true, anime: 'Various' },
  { id: 'af10', name: 'Anime Figure 139', description: 'Premium statue with detailed paint and unique design.', price: 8499, images: animeFiguresImage139, category: 'anime-figures', rating: 4.8, inStock: true, anime: 'Various' },
  { id: 'af11', name: 'Anime Figure 140', description: 'Limited edition figure with special pose and effects.', price: 7999, originalPrice: 9999, images: animeFiguresImage140, category: 'anime-figures', rating: 4.9, inStock: true, isRare: true, anime: 'Various' },
];

// Combine all products
export const products: Product[] = [
  ...keychainProducts,
  ...miniatureProducts,
  ...qPosketProducts,
  ...katanaProducts,
  ...bobbleHeadProducts,
  ...setsProducts,
  ...animeFiguresProducts,
];
