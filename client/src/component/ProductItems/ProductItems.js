import React from "react";

const ProductItems = () => {
  let products = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8];
  return (
    <div className="d-flex flex-wrap mt-2">
      {products.map((p) => (
        <div className="bg-dark m-1 p-2 text-white rounded">
          <p className="m-0">Product</p>
        </div>
      ))}
    </div>
  );
};

export default ProductItems;
