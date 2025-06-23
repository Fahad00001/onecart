import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, setSearch, showSearch, setshowSearch } =
    useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productCopy = [...products];

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subcategory)
      );
    }

    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] overflow-x-hidden text-white pb-[100px]">
      <div className="flex flex-col md:flex-row">
        {/* Filter Sidebar */}
        <div className="w-full md:w-[30%] lg:w-[20%] border-r border-gray-500 px-4 py-5 md:min-h-screen sticky top-[70px] bg-[#0c2025] z-10">
          <div
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex justify-between items-center cursor-pointer md:hidden"
          >
            <p className="text-[22px] font-semibold text-[#aaf5fa]">Filters</p>
            {showFilter ? <FaChevronDown /> : <FaChevronRight />}
          </div>

          <div className={`${showFilter ? "block" : "hidden"} md:block`}>
            {/* Categories */}
            <div className="border border-gray-300 px-4 py-3 mt-6 rounded-md bg-slate-600">
              <p className="text-[18px] text-[#f8fafa] font-semibold mb-2">
                CATEGORIES
              </p>
              <div className="flex flex-col gap-3">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      className="w-4 h-4"
                      onChange={toggleCategory}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-Categories */}
            <div className="border border-gray-300 px-4 py-3 mt-6 rounded-md bg-slate-600">
              <p className="text-[18px] text-[#f8fafa] font-semibold mb-2">
                SUB-CATEGORIES
              </p>
              <div className="flex flex-col gap-3">
                {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <input
                      type="checkbox"
                      value={sub}
                      className="w-4 h-4"
                      onChange={toggleSubCategory}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="w-full md:w-[70%] lg:w-[80%] px-5 pt-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
            <Title text1={"All"} text2={"Collection"} />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-slate-600 w-full sm:w-[60%] md:w-[200px] h-[50px] px-3 rounded-lg border-2 border-transparent hover:border-[#46d1f7]"
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          <div className="lg:w-[80vw] md:w-[60vw] w-full min-h-[70vh] flex flex-wrap justify-center gap-[30px] mt-5">
            {filterProduct.length > 0 ? (
              filterProduct.map((item, index) => (
                <Card
                  key={index}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                />
              ))
            ) : (
              <p className="text-center w-full mt-10 text-lg text-slate-300">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
