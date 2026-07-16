export default function ProductItem({ product }) {
  return (
    <div className="product-item">
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      
    </div>
  );
}