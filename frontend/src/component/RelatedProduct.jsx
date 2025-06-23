import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

const RelatedProduct = ({ category, subcategory, currentProductId }) => {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter(
          (item) =>
            item.category === category &&
            item.subcategory === subcategory &&
            item._id !== currentProductId
        )
        .slice(0, 4);
      setRelated(filtered);
    }
  }, [products, category, subcategory, currentProductId]);

  return (
    <div className="my-[130px] md:my-[40px] md:px-[60px]">
      <div className="ml-[20px] lg:ml-[80px]">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      {related.length > 0 ? (
        <div className="w-full mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
          {related.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className="w-full mt-10 text-center text-gray-300 text-lg">
          No related products found for this category.
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
