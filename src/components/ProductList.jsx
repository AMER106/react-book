import React from 'react'
import ProductItem from './ProductItem'
const ProductList = ({ products, query }) => {
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.map(product => (
         <ProductItem
      key={product.id}
      product={product}
   />
      ))}
    </div>
  )
}

export default ProductList
