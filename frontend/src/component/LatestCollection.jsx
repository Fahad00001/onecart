import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

const LatestCollection = () => {
  const { products } = useContext(shopDataContext); // ✅ Default to empty array
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProduct(products.slice(0, 8)); // ✅ Safe check
    }
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Step Into Style - New collection Dropping This Season!
        </p>
      </div>

      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center gap-[50px] flex-wrap">
        {latestProduct.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
