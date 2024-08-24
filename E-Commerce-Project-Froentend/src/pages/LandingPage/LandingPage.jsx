import React, { useContext } from "react";
import "./LandingPage.css";
import Hero from "../../components/Hero/Hero";
import { ProductsContext } from "../../context/products/ProductsContext";
import MostPopular from "../../components/MostPopular/MostPopular";
import ViewCollection from "../../components/ViewCollection/ViewCollection";
import FirstSection from "../../components/FirstSection/FirstSection";
import SecondSection from "../../components/SecondSection/SecondSection";
import NewCollection from "../../components/NewCollection/NewCollection";
import ThirdSection from "../../components/ThirdSection/ThirdSection";
import CompanyPolicy from "../../components/CompanyPolicy/CompanyPolicy";
import Explore from "../../components/Explore/Explore";
const LandingPage = () => {
  const { products, isLoading, error } = useContext(ProductsContext);
  return (
    <div>
      <Hero />
      <MostPopular products={products} />
      <ViewCollection />
      <FirstSection />
      <SecondSection />
      <NewCollection products={products} />
      <ThirdSection />
      <CompanyPolicy />
      <Explore />
    </div>
  );
};

export default LandingPage;
