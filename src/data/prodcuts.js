export const products = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `product ${index + 1}`,
  price: (Math.random() * 100).toFixed(2),
  category: ["electronics", "clothing", "books"][index % 3],
  rating: (Math.random() * 2 + 3).toFixed(1),
}));
