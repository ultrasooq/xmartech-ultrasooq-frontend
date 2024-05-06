import React from "react";
import ProductCard from "./ProductCard";

type ProductsSectionProps = {
  list: [];
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ list }) => {
  return (
    <div>
      <h2 className="left-8 mb-7 text-2xl font-semibold text-color-dark">
        Products
      </h2>

      {!list.length ? (
        <p className="p-4 text-center text-base font-medium text-color-dark">
          No Products Found
        </p>
      ) : null}

      <div className="grid grid-cols-5 gap-3">
        {list.map((item: any) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
