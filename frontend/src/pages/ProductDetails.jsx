import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import RelatedProduct from "../component/RelatedProduct";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image1);
      setSelectedSize(product.sizes?.[0] || "");
    }
  }, [productId, products]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <AiFillStar key={i} className="text-yellow-400 text-xl" />
        ) : (
          <AiOutlineStar key={i} className="text-yellow-400 text-xl" />
        )
      );
    }
    return stars;
  };

  if (!productData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Product Section */}
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start justify-center px-4 py-20 gap-10">
        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full lg:w-1/2">
          <div className="flex lg:flex-col flex-row gap-4">
            {[
              productData.image1,
              productData.image2,
              productData.image3,
              productData.image4,
            ]
              .filter(Boolean)
              .map((img, index) => (
                <div
                  key={index}
                  className="w-[60px] h-[60px] md:w-[100px] md:h-[110px] bg-slate-300 rounded-md overflow-hidden border border-gray-400 cursor-pointer"
                  onClick={() => setImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          <div className="w-[80%] md:w-[400px] h-[300px] md:h-[500px] border border-gray-500 rounded-md overflow-hidden">
            <img
              src={image}
              alt="product"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-[#a5faf7] mb-2">
            {productData.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            {renderStars(productData.rating || 4)}
            <span className="text-gray-400 text-sm">
              {productData.rating || 4.0} / 5
            </span>
          </div>

          <p className="text-gray-300 text-lg mb-4">
            {productData.description || "No description available."} <br />
            Stylish, breathable cotton shirt with a modern slim fit. Easy to
            wash, super comfortable, and designed for effortless style.
          </p>

          {/* Size Selection */}
          {productData.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">
                Select Size
              </label>
              <select
                className="bg-[#1e1e1e] border border-gray-600 rounded-md px-4 py-2 text-white"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {productData.sizes.map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price */}
          <p className="text-2xl font-semibold text-green-400 mb-6">
            {currency} {productData.price}
          </p>

          {/* Add to Cart */}
          <button
            className="cursor-pointer bg-[#a5faf7] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#8de0db] transition"
            onClick={() => {
              addToCart(productData._id, selectedSize);
              toast.success("🛒 Product added to cart!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
            }}
          >
            Add to Cart
          </button>

          <div className="w-[90%] mt-[20px] h-[1px] bg-slate-700"></div>
          <div className="w-[80%] text-[16px] text-white mt-4 space-y-1">
            <p>✅ 100% Authentic Original Product.</p>
            <p>🚚 Cash on Delivery Available.</p>
            <p>🔁 Easy Return and Exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Third Section - BELOW product details */}
      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 py-10 text-white">
        <div className="flex px-[20px] mt-[60px] lg:ml-[80px] ml-[0px] lg:mt-[0px]">
          <p className="border px-5 py-3 text-sm text-white">Description </p>
          <p className="border px-5 py-3 text-sm text-white">Reviews (124)</p>
        </div>
        <div className="w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] le:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]">
          <p className="w-[95%] h-[90%] text-center text-[17px] md:text-[20px] text-blue-100 leading-relaxed">
            Elevate your wardrobe with our exclusive collection of
            fashion-forward styles — where comfort meets confidence, and trends
            become timeless.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subcategory={productData.subcategory}
          currentProductId={productData._id}
        />
      </div>

      {/* Toast Container for showing success popups */}
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
