import React from "react";
import AboutUsHero from "../../components/AboutUsHero/AboutUsHero";
import AboutSection1 from "../../components/AboutSection1/AboutSection1";
import AboutSection2 from "../../components/AboutSection2/AboutSection2";
import AboutSection3 from "../../components/AboutSection3/AboutSection3";
import Explore from "../../components/Explore/Explore";

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <AboutSection1 />
      <AboutSection2 />
      <AboutSection3 />
      <Explore />
    </div>
  );
};

export default AboutUs;
