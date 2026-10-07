import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Builds a small plant picture as an inline SVG, so no image files are needed.
const plantImage = (leaf, pot, variant) => {
  const shapes = [
    `<ellipse cx="60" cy="52" rx="14" ry="30" fill="${leaf}"/><ellipse cx="40" cy="62" rx="12" ry="24" fill="${leaf}" transform="rotate(-30 40 62)"/><ellipse cx="80" cy="62" rx="12" ry="24" fill="${leaf}" transform="rotate(30 80 62)"/>`,
    `<circle cx="60" cy="56" r="26" fill="${leaf}"/><circle cx="44" cy="66" r="16" fill="${leaf}"/><circle cx="76" cy="66" r="16" fill="${leaf}"/>`,
    `<path d="M60 90 C30 70 30 30 60 18 C90 30 90 70 60 90Z" fill="${leaf}"/><path d="M60 88 V30" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>`,
    `<rect x="52" y="30" width="16" height="60" rx="8" fill="${leaf}"/><rect x="34" y="48" width="14" height="36" rx="7" fill="${leaf}"/><rect x="72" y="42" width="14" height="42" rx="7" fill="${leaf}"/>`,
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#eef4ee"/>${
    shapes[variant % shapes.length]
  }<path d="M36 88 H84 L78 112 H42Z" fill="${pot}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and removes toxins.', cost: 15, image: plantImage('#3f7d4e', '#b8714a', 2) },
      { name: 'Spider Plant', description: 'Filters formaldehyde and xylene from the air.', cost: 12, image: plantImage('#6ba368', '#c9885d', 0) },
      { name: 'Peace Lily', description: 'Removes mold spores and improves air quality.', cost: 18, image: plantImage('#2f6b46', '#a8603c', 2) },
      { name: 'Boston Fern', description: 'Adds moisture to dry indoor air.', cost: 20, image: plantImage('#58a05a', '#b8714a', 1) },
      { name: 'Rubber Plant', description: 'Absorbs airborne chemicals and thrives in low light.', cost: 17, image: plantImage('#27583a', '#c9885d', 2) },
      { name: 'Aloe Vera', description: 'Cleans the air and soothes minor burns.', cost: 14, image: plantImage('#7ab87a', '#a8603c', 3) },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', description: 'Calming scent that helps you relax and sleep.', cost: 20, image: plantImage('#8c7bb8', '#b8714a', 3) },
      { name: 'Jasmine', description: 'Sweet floral scent that lifts your mood.', cost: 18, image: plantImage('#5fa070', '#c9885d', 1) },
      { name: 'Rosemary', description: 'Fresh herbal scent, great for cooking.', cost: 15, image: plantImage('#4a8a5c', '#a8603c', 3) },
      { name: 'Mint', description: 'Cooling fragrance that also repels insects.', cost: 12, image: plantImage('#69b87c', '#b8714a', 1) },
      { name: 'Lemon Balm', description: 'Lemony scent that eases stress and anxiety.', cost: 14, image: plantImage('#8cc06a', '#c9885d', 0) },
      { name: 'Hyacinth', description: 'Strong spring fragrance with colorful blooms.', cost: 22, image: plantImage('#6a8fc0', '#a8603c', 0) },
    ],
  },
  {
    category: 'Low-Light Succulents',
    plants: [
      { name: 'Jade Plant', description: 'Easy-care succulent said to bring good luck.', cost: 16, image: plantImage('#3f8a5a', '#b8714a', 1) },
      { name: 'Zebra Haworthia', description: 'Compact striped rosette that needs little water.', cost: 13, image: plantImage('#2f7050', '#c9885d', 2) },
      { name: 'Burro\'s Tail', description: 'Trailing stems that look great in hanging pots.', cost: 19, image: plantImage('#7cae7c', '#a8603c', 1) },
      { name: 'Echeveria', description: 'Rose-shaped succulent in soft blue-green.', cost: 15, image: plantImage('#6aa8a0', '#b8714a', 0) },
      { name: 'Ponytail Palm', description: 'Slow-growing and nearly impossible to overwater.', cost: 24, image: plantImage('#4f9a5a', '#c9885d', 3) },
      { name: 'Christmas Cactus', description: 'Blooms in winter and tolerates dim rooms.', cost: 21, image: plantImage('#3a7a4a', '#a8603c', 3) },
    ],
  },
];

// Navigation bar shared by the Plants page and the Cart page.
export function Navbar({ go }) {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <span className="brand">Paradise Nursery</span>
      <div className="nav-links">
        <button onClick={() => go('home')}>Home</button>
        <button onClick={() => go('plants')}>Plants</button>
        <button className="cart-link" onClick={() => go('cart')} aria-label="Cart">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6" />
          </svg>
          <span className="cart-count">{totalQuantity}</span>
        </button>
      </div>
    </nav>
  );
}

function ProductList({ go }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <Navbar go={go} />
      <main className="product-page">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <article className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="description">{plant.description}</p>
                  <p className="price">${plant.cost}</p>
                  <button
                    className="btn btn-primary"
                    disabled={isInCart(plant.name)}
                    onClick={() =>
                      dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }))
                    }
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
