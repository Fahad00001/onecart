import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";
import Product from "./Product";
import ourPolicy from "../component/OurPolicy";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";
// import Nav from "../component/Nav";

const Home = () => {
  let heroData = [
    { text1: "30% OFF limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited time only!" },
    { text1: "Explore our Best Collections", text2: "Shop now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];
  let [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="top-[70px] overflow-x-hidden relative">
      <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Product />
      {/* <OurPolicy /> */}
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
};

export default Home;
