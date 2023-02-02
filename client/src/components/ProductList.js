import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import Product from "./Product";

const ProductList = () => {
  // defining state
  const [qty] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  const productState = useSelector((state) => state.productState);
  const { products } = productState;

  // filtering products
  const filteredProduct = () => {
    if (searchText === "") {
      return products;
    } else {
      const searched = products?.filter((val) =>
        val.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return searched;
    }
  };

  const processedData = filteredProduct();

  return (
    <div>
      <SearchBox
        type="text"
        placeholder="Search Items ..."
        searchText={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {processedData?.length !== 0 ? (
        <div className="product-list">
          {processedData?.map((product) => (
            <Product
              key={product._id}
              product={product}
              qty={qty}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
            ></Product>
          ))}
        </div>
      ) : (
        <div className="row center mt-5 text-muted">
          <p>No items found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
